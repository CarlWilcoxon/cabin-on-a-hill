const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { useReducer } = require('react');

/**
 * POST route template
 */
router.post('/:search', rejectUnauthenticated, async (req, res) => {

  // Create one connection to handle transactions
  const connection = await pool.connect();

  try {
    // Start transaction
    await connection.query('BEGIN');

    // Figure out if the word is in the synonym list
    const synQuery =
      `SELECT * FROM synonym_list
        JOIN "command" ON "command"."id" = "synonym_list"."command_id"
        WHERE synonym_list.synonym = $1;`
    const synValues = [ req.params.search ];

    // Save the result so we can get the returned value
    const result = await connection.query( synQuery, synValues );

    // Load the user's inventory
    const invQuery =
      `SELECT * FROM "items_carried"
        WHERE user_id = $1;`
    const invValues = [ req.user.id ];

    // Save the result so we can get the returned value
    const tempInv = await connection.query( invQuery, invValues );
    const inventory = tempInv.rows.map(row => row.item_id);

    // Load the user's current location
    const locationQuery =
      `SELECT * FROM "location"
        JOIN "user_location" ON user_location.location_id = location.id
        WHERE user_id= $1`;
    // save the result so we can use it later
    const currentLocation = (await connection.query(locationQuery, [req.user.id]));

    console.log('current location:', currentLocation.rows[0]);
    console.log('current inventory:', inventory);
    console.log('commands to try:', result.rows);
    // check each entry from the synonym list that was returned
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i] = {
        ...result.rows[i],
        successful: false,  //add a variable to see if a command is used correctly
      };
      // const {required_location_id} = result.rows[i];

      switch (result.rows[i].server_keyword) {

      //  grab handler
        case 'GRAB':
          // make sure the user is in the correct location or there is no location restriction
          // same check for items, but if the required item_id is negative, it makes sure that the
          // user does NOT carry the item
          if ((currentLocation.rows[0].location_id === result.rows[i].required_location_id
            || result.rows[i].required_location_id === null) &&
            (inventory.includes(result.rows[i].required_item_id)
            || result.rows[i].required_item_id === null
            || (result.rows[i].required_item_id < 0
              && !(inventory.includes(-1 * result.rows[i].required_item_id)) ))) {
            // if they are then add the correct item to the items_carried table
            const grabQuery = `INSERT INTO "items_carried" ("user_id", "item_id")
                              VALUES ( $1 , $2 );`
            const grabValues = [ req.user.id, result.rows[i].grab_item_id ];
            await connection.query( grabQuery, grabValues );

            // move the user to the destination
            const moveQuery =
              `UPDATE "user_location"
                SET "location_id" = $1
                WHERE "user_id" = $2;`
            const moveValue = [ result.rows[i].destination_id , req.user.id ];
            await connection.query( moveQuery, moveValue );

            // Update the variables to indicate what was done and tell the client
            // how to handle the response.
            result.rows[i] = {
              ...result.rows[i],
            successful : true,
            }
          }
            break;
      //  move handler
        case 'MOVE':
          console.log('logic test:', ( //this broken
            (inventory.includes(result.rows[i].required_item_id)
            // || (result.rows[i].required_item_id < 0
            //   && !(inventory.includes(-1 * result.rows[i].required_item_id)) )
            )));
          // make sure the user is in the correct location and has any needed items
          if ((currentLocation.rows[0].location_id === result.rows[i].required_location_id
            || result.rows[i].required_location_id === null) &&
            (inventory.includes(result.rows[i].required_item_id)
            || result.rows[i].required_item_id === null
            || (result.rows[i].required_item_id < 0
              && !(inventory.includes(-1 * result.rows[i].required_item_id)) ))) {

            // move the user to the destination
            const moveQuery =
              `UPDATE "user_location"
                SET "location_id" = $1
                WHERE "user_id" = $2;`
            const moveValue = [ result.rows[i].destination_id , req.user.id ];
            await connection.query( moveQuery, moveValue );

            result.rows[i] = {
              ...result.rows[i],
            successful : true,
            }
          }
          break;
      //  die handler
        case 'DIE':
          // make sure the user is in the correct location and has any needed items
          if ((currentLocation.rows[0].location_id === result.rows[i].required_location_id
            || result.rows[i].required_location_id === null) &&
            (inventory.includes(result.rows[i].required_item_id)
              || result.rows[i].required_item_id === null)) {

            // delete items the user acquired
            const deathQuery = `DELETE FROM "items_carried"
                                WHERE user_id = $1;`

            await connection.query( deathQuery, [req.user.id] );

            // move the user back to the starting location
            const moveQuery = `UPDATE "user_location"
                                SET "location_id" = 1
                                WHERE "user_id" = $1;`
            await connection.query( moveQuery, [req.user.id] );

            // Update the variables to indicate what was done and tell the client
            // how to handle the response.
            result.rows[i] = {
              ...result.rows[i],
              successful : true,
            }
          }
          break;
        case 'JOKE':
        // make sure the user is in the correct location and has any needed items
          if ((currentLocation.rows[0].location_id === result.rows[i].required_location_id
             || result.rows[i].required_location_id === null) &&
             (inventory.includes(result.rows[i].required_item_id)
             || result.rows[i].required_item_id === null)) {
            // mark that the action was successful
              result.rows[i] = {
              ...result.rows[i],
            successful : true,
            }
          } // end if
          break;
      }

    }

    // End transaction with COMMIT
    await connection.query('COMMIT;');
    res.send(result.rows);

  } catch (err) {
    console.log('Error on command - Rolling back transactions', err);
    //Transaction failed, so undo it with ROLLBACK
    await connection.query('ROLLBACK');
    res.sendStatus(500);

  } finally {
    //IMPORTANT release the connection no matter how the transaction goes
    connection.release();
  }
});

module.exports = router;

// Example transaction used to make the rest of the router
// -------------------------------------------------------
// // Setup route for new account with balance
// router.post('/', async (req, res) => {
//   const name = req.body.name;
//   const amount = req.body.amount;
//   console.log(`Creating new account '${name}' with initial balance ${amount}`);

//   const connection = await pool.connect()
//   try {
//     await connection.query('BEGIN');
//     const sqlAddAccount = `INSERT INTO account (name) VALUES ($1) RETURNING id`;
//     // Save the result so we can get the returned value
//     const result = await connection.query( sqlAddAccount, [name]);
//     // Get the id from the result - will have 1 row with the id
//     const accountId = result.rows[0].id;
//     const sqlInitialDeposit = `INSERT INTO register (acct_id, amount) VALUES ($1, $2);`
//     await connection.query( sqlInitialDeposit, [accountId, amount]);
//     await connection.query('COMMIT');
//     res.sendStatus(200);
//   } catch ( error ) {
//     await connection.query('ROLLBACK');
//     console.log(`Transaction Error - Rolling back new account`, error);
//     res.sendStatus(500);
//   } finally {
//     connection.release()
//   }
// });
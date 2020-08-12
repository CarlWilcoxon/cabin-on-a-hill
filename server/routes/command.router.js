const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { useReducer } = require('react');

/**
 * GET route template
//  */
// router.get('/', rejectUnauthenticated, (req, res) => {

// });

/**
 * POST route template
 */
router.post('/:search', rejectUnauthenticated, async (req, res) => {

  // Create one connection to handle transactions
  const connection = await pool.connect();

  try {
    // Start transaction
    await connection.query('BEGIN');

    //Do transaction things
    const synQuery = `SELECT * FROM synonym_list
                            JOIN "command" ON "command"."id" = "synonym_list"."command_id"
                            WHERE synonym_list.synonym = $1;`
    const synValues = [ req.params.search ];

    // Save the result so we can get the returned value
    const result = await connection.query( synQuery, synValues );

    console.log(result.rows);
    // check each matching entry
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i] = {
        ...result.rows[i],
        successful: false, //add a variable to see if a command is used correctly
      };
      switch (result.rows[i].server_keyword) {

      //  grab
        case 'GRAB':
          //make sure the user is in the correct location
          if (req.user.current_location_id === result.rows.required_location_id) {
            //if they are then add the correct item to the items_carried table
            const grabQuery = `INSERT INTO "items_carried" ("user_id", "item_id")
                              VALUES ( $1 , $2 );`;
            const grabValues = [ req.user.id, result.rows.server_target_id ];
            await connection.query( grabQuery, grabValues );
            result.rows[i].successful = true;
          }
          break;

        //  move
        case 'MOVE':
          //make sure the user is in the correct location
          if (req.user.current_location_id === result.rows.required_location_id) {
            //if they are then look for the path that matches the command_id
            const pathQuery = `SELECT * FROM "path"
                              WHERE "command_id" = $1;`
            const pathValue = [ result.rows.id ];
            const path = await connection.query( pathQuery , pathValue );

            // move the user along the path
            const moveQuery = `UPDATE user
                              SET current_location_id = $1
                              WHERE id = $2;`
            const moveValue = [ path.rows[0].to_id , req.user.id ];
            await connection.query( moveQuery, moveValue);

            // update the client-side location
            const newRoomQuery = `SELECT * location
                            WHERE id = $1;`
            const newRoomValue = [ path.rows[0].to_id ]
            const newRoom = await connection.query( newRoomQuery, newRoomValue )

                //TODO
                //SEND THE NEWROOM BACK TO THE CLIENT
            result.rows[i].successful = true;

          }
      //  die TODO
      }
    }

    // End transaction with COMMIT
    await connection.query('COMMIT;');
    res.send(result.rows);

  } catch (err) {
    console.log('Error on command', err);
    //Transaction failed, so undo it with ROLLBACK
    await connection.query('ROLLBACK');
    res.sendStatus(500);

  } finally {
    //IMPORTANT release the connection no matter how the transaction goes
    connection.release();
  }
});

module.exports = router;

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
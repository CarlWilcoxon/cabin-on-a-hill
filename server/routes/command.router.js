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
    const checkSynonyms = `SELECT * FROM synonym_list
                            JOIN "command" ON "command"."id" = "synonym_list"."command_id"
                            WHERE synonym_list.synonym = 'LOOK';`
    // Save the result so we can get the returned value
    const result = await connection.query( checkSynonyms );

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
          }
        break;

        //  move
        case 'MOVE':
          //make sure the user is in the correct location
          if (req.user.current_location_id === result.rows.required_location_id) {
            //if they are then
            const pathQuery = `SELECT * FROM "path"`
            const
          }
//  die
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
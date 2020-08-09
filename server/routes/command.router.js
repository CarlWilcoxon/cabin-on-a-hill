const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {

  console.log('req.body', req.body);

  // Create one connection to handle transactions
  const connection = await pool.connect();

  try {
    // Start transaction
    await connection.query('BEGIN:');

    //Do transaction things
    const checkSynonyms = `SELECT * FROM synonym_list
                            JOIN "command" ON "command"."id" = "synonym_list"."command_id"
                            WHERE synonym_list.synonym = 'LOOK';`
    // Save the result so we can get the returned value
    const result = await connection.query( checkSynonyms );

    // End transaction with COMMIT
    await connection.query('COMMIT;');
    res.send(result);

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
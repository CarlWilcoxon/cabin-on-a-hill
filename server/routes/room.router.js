const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "location"
                      JOIN "user_location" ON user_location.location_id = location.id
                      WHERE user_id= $1`;
  pool.query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch(() => res.sendStatus(500));
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = 'INSERT INTO "user_location" (user_id) VALUES ($1)';
  pool.query(queryText, [req.user.id])
      .then((result) => res.send(result.rows))
      .catch(() => res.sendStatus(500));
});

module.exports = router;
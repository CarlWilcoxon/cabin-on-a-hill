const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/LOOK', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  const queryText = `SELECT description FROM location
                      WHERE id= $1`;
  pool.query(queryText, [req.user.current_location_id])
    .then((result) => res.send(result))
    .catch(() => res.sendStatus(500));
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;
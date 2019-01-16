const express = require('express');
const db = require('../config/dbConfig');
const { ensureValidStudent } = require('../common/middleware');

const router = express.Router();

router.post('/', ensureValidStudent, (req, res) => {
  db('students')
    .insert(req.body)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: 'student added to db' });
      } else {
        res.status(500).json({ error: `there was an error inserting the student into the db: ${err}` });
      }
    });
});

router.get('/', (req, res) => {
  db('students')
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error retrieving from the db: ${err}` });
    });
});


module.exports = router;

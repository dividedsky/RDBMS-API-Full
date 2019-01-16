const express = require('express');
const db = require('../config/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db('cohorts')
    .then((list) => {
      if (list.length) {
        res.status(200).json({ list });
      } else {
        res.status(400).json({ message: 'there are no cohorts or there was an error retrieving them' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error retrieving the cohorts: ${err}` });
    });
});

router.get('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then((cohort) => {
      if (cohort.length) {
        res.status(200).json(cohort);
      } else {
        res.status(400).json({ error: 'there is no cohort with that id number' });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: `there was an error retrieving the cohort: ${err}` });
    });
});

module.exports = router;

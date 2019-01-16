const express = require('express');
const db = require('../config/dbConfig');

const router = express.Router();

/** ** POST ROUTE *** */
router.post('/', (req, res) => {
  console.log(req.body.length);

  if (!req.body.name || Object.keys(req.body).length !== 1) {
    res.status(400).json({ error: 'the POST should only contain an object with a name' });
  } else {
    db('cohorts')
      .insert(req.body)
      .then((count) => {
        if (!count) {
          res.status(500).json({ error: 'there was an error adding the cohort' });
        } else {
          res.status(201).json({ message: 'the cohort was created' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: `there was an error adding the cohort: ${err}` });
      });
  }
});

/** ** GET ROUTES *** */
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

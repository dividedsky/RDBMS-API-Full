const express = require('express');
const db = require('../config/dbConfig');
const { ensureValidCohort } = require('../common/middleware');

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

router.get('/:id', ensureValidCohort, (req, res) => {
  // correct id has been checked by middleware
  db('cohorts')
    .where({ id: req.params.id })
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: `there was an error retrieving the cohort: ${err}` });
    });
});

router.get('/:id/students', ensureValidCohort, (req, res) => {
  db('students')
    .where({ cohort_id: req.params.id })
    .then((list) => {
      res.status(200).json(list);
    });
});

router.put('/:id', ensureValidCohort, (req, res) => {
  if (!req.body.name || Object.keys(req.body).length !== 1) {
    res.status(400).json({ error: 'the POST should only contain an object with a name' });
  } else {
    const changes = req.body;
    db('cohorts').update(changes)
      .then((count) => {
        if (!count) {
          res.status(500).json({ error: 'there was an error updating the db' });
        } else {
          res.status(200).json({ message: 'the cohort was updated' });
        }
      });
  }
});

router.delete('/:id', ensureValidCohort, (req, res) => {
  db('cohorts').where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({ message: 'the cohort has been deleted' });
      } else {
        res.status(500).json({ error: 'there was an error deleting the cohort' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error deleting the cohort: ${err}` });
    });
});
module.exports = router;

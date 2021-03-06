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
        res.status(500).json({ error: 'there was an error inserting the student into the db' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error inserting the student into the db: ${err}` });
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

router.get('/:id', ensureValidStudent, (req, res) => {
  db('students')
    .join('cohorts', 'students.cohort_id', 'cohorts.id')
    .where({ 'students.id': req.params.id })
    .select('students.id', 'students.name', 'cohorts.name as cohort')
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error getting the student: ${err}` });
    });
});

router.put('/:id', ensureValidStudent, (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .update(req.body)
    .then((count) => {
      if (!count) {
        res.status(500).json({ error: 'There was an error updating the student' });
      } else {
        res.status(200).json({ message: `${count} students were updated` });
      }
    });
});

router.delete('/:id', ensureValidStudent, (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (!count) {
        res.status(500).json({ error: 'there was an error deleting the student' });
      } else {
        res.status(200).json({ message: `${count} student was deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error while deleting the student: ${err}` });
    });
});


module.exports = router;

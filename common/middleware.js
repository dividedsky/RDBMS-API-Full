const db = require('../config/dbConfig');

// i wonder if this is bad to do because it's making two calls on the db?
// can i return the cohort from the middleware somehow? hmmm....

exports.ensureValidCohort = (req, res, next) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then((cohort) => {
      if (cohort.length) {
        next();
      } else {
        res.status(400).json({ error: 'there is no cohort with that id number' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error accessing the db: ${err}` });
    });
};

exports.ensureValidStudent = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'a student must have a name' });
  } else {
    db('students')
      .where({ id: req.params.id })
      .then((student) => {
        if (student.length) {
          next();
        } else {
          res.status(400).json({ error: 'there is no student with that id' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: `there was an error retrieving the student: ${err}` });
      });
  }
};

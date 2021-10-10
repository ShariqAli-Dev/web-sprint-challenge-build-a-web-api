// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch((err) => res.status(500).json({ message: 'Server Error' }));
});

module.exports = router;

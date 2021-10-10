// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch((err) => res.status(500).json({ message: 'Server Error' }));
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(201).json(req.project);
});

router.post('/', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({ message: 'Request is missing name or description' });
    return;
  }

  Projects.insert(req.body)
    .then((addedProject) => {
      res.status(201).json(addedProject);
    })
    .catch((err) =>
      res.status(500).json({ message: 'Error adding user to database' })
    );
});

module.exports = router;

// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {
  validateProjectId,
  validateProjectBody,
} = require('./projects-middleware');

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

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((projectActions) => {
      if (projectActions) {
        res.status(201).json(projectActions);
      } else {
        res.status(404).json([]);
      }
    })
    .catch((err) =>
      res.status(500).json('Error grabbing actions from databse')
    );
});

router.post('/', validateProjectBody, (req, res) => {
  Projects.insert(req.body)
    .then((addedProject) => {
      res.status(201).json(addedProject);
    })
    .catch((err) =>
      res.status(500).json({ message: 'Error adding user to database' })
    );
});

router.put('/:id', validateProjectId, (req, res) => {
  const { name, description, completed } = req.body;

  if (!name || !description || !completed) {
    res
      .status(400)
      .json({ message: 'Request is missing name, description, or completed' });
    return;
  }

  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(201).json(updatedProject);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Error updating project in the database' })
    );
});

router.delete('/:id', validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((deletedBody) => res.status(201))
    .catch((err) => {
      res.status(500).json({ message: 'Error removing project from database' });
    });
});

module.exports = router;

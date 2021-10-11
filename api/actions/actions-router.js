const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const { validateActionId } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => {
      if (actions.length === 0) {
        res.status(201).json([]);
      } else {
        res.status(201).json(actions);
      }
    })
    .catch((err) =>
      res.status(500).json('Error grabbing actions from databse')
    );
});

router.get('/:id', validateActionId, (req, res) => {
  res.status(201).json(req.action);
});

router.post('/', (req, res) => {
  const { notes, description, project_id } = req.body;

  if (!notes || !description || !project_id) {
    res.status(400).json({
      message: 'The request body is missing notes, description, or project_id',
    });
    return;
  }

  Projects.get(project_id)
    .then((project) => {
      if (!project) {
        res.status(404).json('Project id does not exist within the database');
      } else {
        return;
      }
    })
    .catch((err) =>
      res.status(500).json({ message: 'Error grabbing project from database' })
    );

  Actions.insert(req.body)
    .then((newAction) => res.status(201).json(newAction))
    .catch((err) =>
      res.status(500).json('Error adding new action into databse')
    );
});

router.put('/:id', validateActionId, (req, res) => {
  const { notes, description, completed, project_id } = req.body;

  if (!notes || !description || !completed || !project_id) {
    res.status(400).json({
      message:
        'The request body is missing notes, description, completed, or project_id',
    });
    return;
  }

  Actions.update(req.params.id, req.body).then((updatedAction) => {
    if (updatedAction) {
      res.status(201).json(updatedAction);
    } else {
      res.status(404);
    }
  });
});

router.delete('/id', validateActionId, (req, res) => {
  Actions.remove(req.params.id);
});

module.exports = router;

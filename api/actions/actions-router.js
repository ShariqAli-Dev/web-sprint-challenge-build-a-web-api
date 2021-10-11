const express = require('express');
const Actions = require('./actions-model');
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

module.exports = router;

const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
  try {
    const projectMaybe = await Projects.get(req.params.id);

    if (projectMaybe) {
      req.project = projectMaybe;
      next();
    } else {
      next(
        res
          .status(404)
          .json({ message: `Project with id ${req.params.id} not found` })
      );
    }
  } catch (err) {
    next(res.status(500).json(err.message));
  }
}

module.exports = { validateProjectId };

const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
  try {
    const projectMaybe = await Projects.get(req.params.id);

    if (projectMaybe) {
      req.project = projectMaybe;
      next();
    } else {
      next({
        status: 404,
        message: `Project with id ${req.params.id} not found`,
      });
    }
  } catch (err) {
    next({ status: 500, message: err });
  }
}

const validateProjectBody = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    next({ status: 400, message: 'Request is missing name or description' });
  } else {
    next();
  }
};

module.exports = { validateProjectId, validateProjectBody };

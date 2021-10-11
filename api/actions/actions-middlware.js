const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
  try {
    const maybeAction = await Actions.get(req.params.id);

    if (maybeAction) {
      req.action = maybeAction;
      next();
    } else {
      next({
        status: 404,
        message: `Action with id ${req.params.id} not found`,
      });
    }
  } catch (err) {
    next({ status: 500, message: err });
  }
}

module.exports = { validateActionId };

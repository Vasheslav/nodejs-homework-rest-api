const HttpError = require("../helpers/HttpError");

const validateData = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = {
  validateData,
};

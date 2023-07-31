const HttpError = require("../helpers/HttpError");

const isEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  next();
};

const isEmptyBodyFavorite = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  next();
};

module.exports = {
  isEmptyBody,
  isEmptyBodyFavorite,
};

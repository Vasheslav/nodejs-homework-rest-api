const Joi = require("joi");
const HttpError = require("./HttpError");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
});

const validateData = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};

module.exports = {
  validateData,
};

const Joi = require("joi");

const { emailRegexp } = require("../constants/user-constants");

const userAddSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required field email`,
  }),
});

module.exports = {
  userAddSchema,
  userLoginSchema,
  userEmailSchema,
};

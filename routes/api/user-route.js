const express = require("express");

const authRouter = express.Router();

const {
  register,
  login,
  current,
  logout,
} = require("../../controllers/userController");

const { userAddSchema, userLoginSchema } = require("../../shemas/user-shema");

const { validateData } = require("../../decorators/contactValidations");

const { authenticate } = require("../../middlewares/authenticate");

authRouter.post("/register", validateData(userAddSchema), register);
authRouter.post("/login", validateData(userLoginSchema), login);
authRouter.get("/current", authenticate, current);
authRouter.post("/logout", authenticate, logout);

module.exports = {
  authRouter,
};

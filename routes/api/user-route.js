const express = require("express");

const authRouter = express.Router();

const {
  register,
  verify,
  resendVerifyEmail,
  login,
  current,
  logout,
  updateAvatar,
} = require("../../controllers/userController");

const {
  userAddSchema,
  userLoginSchema,
  userEmailSchema,
} = require("../../shemas/user-shema");

const { validateData } = require("../../decorators/contactValidations");

const { authenticate } = require("../../middlewares/authenticate");

const { upload } = require("../../middlewares/apload");
// const { verify } = require("jsonwebtoken");

authRouter.post("/register", validateData(userAddSchema), register);
authRouter.get("/verify/:verificationToken", verify);
authRouter.post("verify", validateData(userEmailSchema), resendVerifyEmail);
authRouter.post("/login", validateData(userLoginSchema), login);
authRouter.get("/current", authenticate, current);
authRouter.post("/logout", authenticate, logout);
authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  updateAvatar,
);

module.exports = {
  authRouter,
};

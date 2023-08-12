const bcrypt = require("bcryptjs");
const { User } = require("../models/users");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/ctrlWrapper");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { unlink } = require("node:fs");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, {
    protocol: "http",
    s: "250",
    d: "retro",
  });

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: req.body.email,
      password: req.body.password,
    },
  });
};

const current = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json("");
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) throw HttpError(400);
  const { path: oldPath, filename } = req.file;

  await Jimp.read(oldPath).then((image) => {
    return image.contain(250, 250).write(oldPath);
  });

  const newPath = path.join("public", "avatars", filename);
  await fs.rename(oldPath, newPath);

  unlink(path.join("public", req.user.avatarURL), (err) => {
    if (err) console.log(err.message);
  });

  const avatarURL = path.join("avatars", filename);

  await User.findOneAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    },
  );
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};

const express = require("express");
const validate = require("express-validation");
const Joi = require("joi");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("./db");

// ##########################  User Ctrl ##########################

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  try {
    // console.log(req.query.myFilter);
    const users = await getUsers();
    res
      .status(200)
      .set("headerkey1", "headerVal1")
      .json(users);
  } catch (e) {
    res
      .status(500)
      .set("headerkey1", "headerVal1")
      .json(e);
  }
};

userCtrl.getUser = async (req, res) => {
  try {
    const user = await getUser(parseInt(req.params.id));
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};
userCtrl.createUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};
userCtrl.updateUser = async (req, res) => {
  try {
    const user = await updateUser(parseInt(req.params.id), req.body);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};
userCtrl.deleteUser = async (req, res) => {
  try {
    const user = await deleteUser(parseInt(req.params.id));
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

// ##########################  User Validator ##########################

const userValidator = {};

userValidator.createUser = {
  body: {
    name: Joi.string().required(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
  }
};

// ##########################  Routes ##########################

const userRouter = express.Router();

userRouter
  .route("/")
  .get(userCtrl.getUsers)
  .post(validate(userValidator.createUser), userCtrl.createUser);

userRouter
  .route("/:id")
  .get(userCtrl.getUser)
  .put(validate(userValidator.createUser), userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

/** if routes has ':id' param set,  pre-populate the user info from db */
// userRouter.param('id', userCtrl.prePopulateUser);

module.exports = {
  userRouter
};

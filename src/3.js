const express = require("express");
const bodyParser = require("body-parser");
const validate = require("express-validation");
const Joi = require("joi");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("./db");

/**
 Express: Request Body Validation (using joi & express-validation)
*/

// ########################## Express Config ##########################

const app = express();

// parse body params and attach them to req.body (without these req.body wont be available)
app.use(bodyParser.json()); // to parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // to parse JSON request body

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

const apiRouter = express.Router();
apiRouter.use("/users", userRouter);
apiRouter.use("/employees", userRouter);

// route: all /api/*
app.use("/api", apiRouter);

// ################## Express: Start Server ########################

app.listen(2020, () => {
  console.log("Express server is started, running at http://localhost:2020");
});

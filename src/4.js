const express = require("express");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
const helmet = require("helmet");
const cors = require("cors");
const { userRouter } = require("./user");

/**
 Express: Security
 */

// ########################## Express Config ##########################

const app = express();

// parse body params and attach them to 'req.body' (without these req.body wont be available)
app.use(bodyParser.json()); // to parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // to parse JSON request body

// attach Authorization bearerToken 'req.token' (without these req.token wont be available)
app.use(bearerToken());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// ########################## Express (Custom Middlewares) ########################

// set 'fullUrl' in all the request // just for learning purpose
app.use((req, res, next) => {
  req.fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  next();
});

const isAuthenticated = (req, res, next) => {
  console.log(req.headers["authorization"]); // Bearer 123
  console.log(req.token); // 123
  console.log(req.fullUrl);

  // TODO: check token validity and pass
  const authenticated = req.headers["authorization"];

  if (authenticated) {
    // auth success:
    next();
  } else {
    // auth error:
    res.status(400).send("Not Authenticated");
  }
};

app.use(isAuthenticated);

// ########################## Express Routes ########################

const apiRouter = express.Router();
apiRouter.use("/users", userRouter);
apiRouter.use("/employees", userRouter);

// route: all /api/*
app.use("/api", apiRouter);

// ################## Express: Start Server ########################

app.listen(2020, () => {
  console.log("Express server is started, running at http://localhost:2020");
});

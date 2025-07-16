const express = require("express");
const { authRouter } = require("./auth/routes");
const { usersRouter } = require("./users/routes");
const donorRoutes = require("./donor/routes"); // import donor routes
const requestRoutes = require("./request/routes");
const { userAuthenticationMiddleware } = require("./middleware");

const apiRouter = express.Router();

// public routes
apiRouter.use("/auth", authRouter);

// auth middleware
apiRouter.use(userAuthenticationMiddleware); // all routes below this are protected

// protected routes
apiRouter.use("/users", usersRouter);
apiRouter.use("/donors", donorRoutes); // new donor routes


apiRouter.use("/requests", requestRoutes); // /api/v1/requests/create


module.exports = { apiRouter };

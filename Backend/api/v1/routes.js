const express = require("express");
const { authRouter } = require("./auth/routes");
const { usersRouter } = require("./users/routes");
const donorRoutes = require("./donor/routes"); // import donor routes
const requestRoutes = require("./request/routes");
const { userAuthenticationMiddleware } = require("./middleware");
const allBlogRouter = require("./displayDoners/routes");

const apiRouter = express.Router();

// public routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/all-donor", allBlogRouter);

// auth middleware
apiRouter.use(userAuthenticationMiddleware); 

// protected routes
apiRouter.use("/users", usersRouter);
apiRouter.use("/donors", donorRoutes); 
apiRouter.use("/requests", requestRoutes); 

module.exports = { apiRouter };

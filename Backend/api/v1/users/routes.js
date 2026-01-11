const express = require("express");
const {
  sendUserBasicInfoController,
  updateUserController,
} = require("./controllers");

const usersRouter = express.Router();

usersRouter.get("/", sendUserBasicInfoController);
usersRouter.patch("/", updateUserController);

module.exports = { usersRouter };

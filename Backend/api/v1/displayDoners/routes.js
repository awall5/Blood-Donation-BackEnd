const express = require("express");
const allBlogRouter = express.Router();
const { getAllDonors } = require("../displayDoners/controllers");

allBlogRouter.get("/", getAllDonors);

module.exports = allBlogRouter;

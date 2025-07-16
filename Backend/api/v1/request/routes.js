const express = require("express");
const router = express.Router();
const { createRequestController } = require("./requestController");

router.post("/create", createRequestController);

module.exports = router;

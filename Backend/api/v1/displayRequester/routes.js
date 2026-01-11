const express = require("express");
const { getAllRequesters } = require("../displayRequester/controllers");
const router = express.Router();

router.get("/", getAllRequesters);

module.exports = router;

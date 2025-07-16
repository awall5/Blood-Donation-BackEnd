const express = require("express");
const router = express.Router();
const { registerDonorController, searchDonorsController } = require("../donor/donorController");

router.post("/register", registerDonorController);
router.get("/search", searchDonorsController);

module.exports = router;

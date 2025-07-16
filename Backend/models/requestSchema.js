const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  city: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contactInfo: { type: String, required: true },
  message: { type: String },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  createdAt: { type: Date, default: Date.now }
});

const RequestModel = mongoose.model("Request", requestSchema);
module.exports = { RequestModel };

const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  contactNumber: { type: String, required: true },
  lastDonationDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const donor = mongoose.model("donor", donorSchema);

module.exports = donor;

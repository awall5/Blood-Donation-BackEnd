const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// auto-delete OTPs after 5 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 60 });

// mongoose middleware
otpSchema.pre("save", async function (next) {
  if (this.isModified("otp")) {
    this.otp = await bcrypt.hash(this.otp.toString(), 12);
  }
  next();
});

// ---------- to run validators (every-time)
otpSchema.pre("findByIdAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
otpSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
otpSchema.pre("updateOne", function (next) {
  this.options.runValidators = true;
  next();
});
otpSchema.pre("updateMany", function (next) {
  this.options.runValidators = true;
  next();
});
// ---------- -------------------------------

const OtpModel = model("otp", otpSchema);

module.exports = { OtpModel };

const Donor = require("../../../models/donorSchema");

const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ lastDonationDate: -1 });
    res.status(200).json({ success: true, donors });
  } catch (error) {
    console.error("Error fetching donors:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getAllDonors };

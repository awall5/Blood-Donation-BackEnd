const {RequestModel} = require("../../../models/requestSchema");
const {UserModel} = require("../../../models/userSchema");

const getAllRequesters = async (req, res) => {
  try {
    const requests = await RequestModel.find()
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, requesters: requests });
  } catch (error) {
    console.error("Error fetching requesters:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getAllRequesters };

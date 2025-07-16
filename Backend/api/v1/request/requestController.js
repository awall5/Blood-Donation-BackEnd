const { RequestModel } = require("../../../models/requestSchema");

const createRequestController = async (req, res) => {
  console.log("--> inside createRequestController");
  try {
    const { city, bloodGroup, contactInfo, message } = req.body;

    if (!city || !bloodGroup || !contactInfo) {
      return res.status(400).json({
        isSuccess: false,
        message: "City, blood group, and contact info are required",
        data: {}
      });
    }

    const userId = req.user?._id;

    const request = new RequestModel({
      city,
      bloodGroup,
      contactInfo,
      message,
      requestedBy: userId
    });

    await request.save();

    res.status(201).json({
      isSuccess: true,
      message: "Blood request created successfully",
      data: request
    });
  } catch (err) {
    console.error("Error in createRequestController:", err);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      data: {}
    });
  }
};

module.exports = { createRequestController };

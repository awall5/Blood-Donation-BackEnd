const Donor = require("../../../models/donorSchema");

const registerDonorController = async (req, res) => {
  console.log("--> inside registerDonorController");
  try {
    // add userId from auth (since you have userAuthenticationMiddleware)
    const userId = req.user?._id;

    const donor = new Donor({
      ...req.body,
      user: userId   // optional: link donor to logged-in user
    });

    await donor.save();

    res.status(201).json({
      isSuccess: true,
      message: "Donor registered successfully!",
      data: donor,
    });
  } catch (err) {
    console.error("Error in registerDonorController:", err);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      data: {},
    });
  }
};

const searchDonorsController = async (req, res) => {
  console.log("--> inside searchDonorsController");
  try {
    const { city, bloodGroup } = req.query;

    if (!city || !bloodGroup) {
      return res.status(400).json({
        isSuccess: false,
        message: "City and blood group are required",
        data: {},
      });
    }

    const donors = await Donor.find({
      city: { $regex: new RegExp(city, "i") },
      bloodGroup
    }).lean();

    res.status(200).json({
      isSuccess: true,
      message: "Donors fetched successfully",
      data: donors,
    });
  } catch (err) {
    console.error("Error in searchDonorsController:", err);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      data: {},
    });
  }
};

module.exports = {
  registerDonorController,
  searchDonorsController
};

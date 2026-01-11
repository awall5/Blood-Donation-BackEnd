const { handleGenericAPIError } = require("../../../utils/controllerHelpers");
const { UserModel } = require("../../../models/userSchema");

const sendUserBasicInfoController = (req, res) => {
  const userInfo = req.user;

  res.status(200).json({
    isSuccess: true,
    message: "User is valid!",
    data: {
      user: userInfo,
    },
  });
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ isSuccess: false, message: "Unauthorized" });
    }

    const allowed = ["name", "gender", "profileImage"];
    const updates = {};
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "No valid fields to update" });
    }

    const updated = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).lean();

    res
      .status(200)
      .json({
        isSuccess: true,
        message: "Profile updated",
        data: { user: updated },
      });
  } catch (err) {
    handleGenericAPIError("updateUserController", req, res, err);
  }
};

module.exports = { sendUserBasicInfoController, updateUserController };

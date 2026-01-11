const jwt = require("jsonwebtoken");

const attachJWTToken = (res, data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);

  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: isProd, // only sent over https connections in production
    sameSite: isProd ? "None" : "Lax",
    httpOnly: true, // frontend will not be able to read this cookie
  };

  res.cookie("authorization", token, cookieOptions);
};

const removeJWTToken = (res) => {
  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = {
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    httpOnly: true,
  };

  // prefer clearCookie for express
  if (typeof res.clearCookie === "function") {
    res.clearCookie("authorization", cookieOptions);
    return;
  }

  // fallback
  res.cookie("authorization", "", { maxAge: 0, ...cookieOptions });
};

module.exports = { attachJWTToken, removeJWTToken };

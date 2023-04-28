const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { id } = jwt.verify(token, "asdfghjkl");
    const user = await userModel.findById(id).exec();
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "can not access the resource" });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "session timeout! login again" });
    } else {
      res.status(401).json(error);
    }
  }
};
exports.sendToken = (user, req, res, statuscode) => {
  const token = user.gettoken();
  user.password = undefined;
  res.json({ message: "user logged in", user, token });
};

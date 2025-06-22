const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("./asyncHandler");
const AppFail = require("./appFail");

function verifyToken() {
  return asyncHandler(async function (req, res, next) {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) {
      return res.status(403).json(new AppFail("forbidden"));
    }
    let decode;

    try {
      decode = jwt.verify(token, "0be6be2cfd30376e9253a6a2aec41c32");
    } catch (error) {
      return res.status(403).json(new AppFail("forbidden"));
    }
    const user = await User.findById(decode.user);
    // if(!roles.includes(user.role)){
    //   return res.status(403).json(new AppFail("forbidden"))
    // }
    req.user = user;
    next();
  });
}

module.exports = verifyToken;

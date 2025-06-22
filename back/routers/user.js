const asyncHandler = require("../utils/asyncHandler");
const userControllers = require("../controllers/user");
const userRouter = require("express").Router();

userRouter.post("/register", asyncHandler(userControllers.register));
userRouter.post("/login", asyncHandler(userControllers.login));
userRouter.get("/", asyncHandler(userControllers.getAllDoctors));
userRouter.get("/:id", asyncHandler(userControllers.getDoctorById));

module.exports = userRouter;

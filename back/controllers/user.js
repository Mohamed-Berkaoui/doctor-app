const bcrypt = require("bcrypt");
const User = require("../models/user");
const AppFail = require("../utils/appFail");
const AppSuccess = require("../utils/appSuccess");
const generateToken = require("../utils/generateToken");
const MailService = require("../services/notifications");

async function register(req, res, next) {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(409).json(new AppFail("User already exists", 409));
  }

  const {
    name,
    email,
    password,
    description = "No description provided",
    phone,
    specialty = "general",
    workingHours = { start: "09:00", end: "17:00" },
    workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    description,
    specialty,
    workingHours,
    workingDays,
  };
  if (phone !== undefined) newUser.phone = phone;

  const user = await User.create(newUser);
  MailService.sendWelcomeEmail(user.email, user.name);
  res.status(201).json(new AppSuccess(user));
}

async function login(req, res, next) {
  const existUser = await User.findOne({ email: req.body.email });
  if (!existUser) {
    return res.status(401).json(new AppFail("Invalid email or password"));
  }
  const isValidPassword = bcrypt.compareSync(
    req.body.password,
    existUser.password
  );
  if (!isValidPassword) {
    return res.status(401).json(new AppFail("Invalid email or password"));
  }
  const token = generateToken(existUser._id);
  res.status(200).json(new AppSuccess({token, user: existUser}));
}


async function getAllDoctors(req, res, next) {
  const users = await User.find();
  res.status(200).json(new AppSuccess(users));
}

async function getDoctorById(req, res, next) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json(new AppFail("User not found", 404));
  }
  res.status(200).json(new AppSuccess(user));
}
module.exports = { login, register , getAllDoctors, getDoctorById };

// const { json } = require("express");
const User = require("../models/uers");
const Staff = require("../models/staff");
const TimeSlot = require("../models/timeSlot");
const CryptoJS = require("crypto-js");

const getLogin = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });

    const staff = await Staff.findOne({ user: req.body.user });

    if (!user && !staff) {
      return res.status(401).json("Wrong Credentials!");
    }
    let hashPassword;

    if (user) {
      hashPassword = user.password;
    } else if (staff) {
      hashPassword = staff.password;
    }
    if (hashPassword == null) {
      return res.status(401).json("Wrong Credentials");
    }
    console.log(hashPassword);
    const bytes = CryptoJS.AES.decrypt(hashPassword, process.env.PASS_SEC);
    const pass = bytes.toString(CryptoJS.enc.Utf8);

    if (pass !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }

    res.status(200).json(user || staff);
    //res.status(200).json({ ...user._doc }); //to disply data without key
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//HOST REGISTRATION
const userSignUp = async (req, res) => {
  const newUser = new User({
    user: req.body.user,
    org: req.body.org,
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    role: req.body.role,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//Add Staff
const addStaff = async (req, res) => {
  const id = req.params.id;
  const newStaff = new Staff({
    user: req.body.user,
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    deg: req.body.deg,
    regBy: id,
    role: req.body.role,
  });
  try {
    const savedStaff = await newStaff.save();
    res.status(201).json({ user: savedStaff });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllUsers = (req, res) => {
  res.send("All Users Table!!!");
};

//Displaying Staff List
const staffList = async (req, res) => {
  // const query = {adminId: hostId}
  try {
    const id = req.params.id;
    // console.log(id);
    const staffList = await Staff.find({ regBy: id, role: "User" });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ msg: error });
    // console.log(error);
  }
};

//Display by registerd user
const loadByReg = async (req, res) => {
  try {
    const id = req.params.id;
    const list = await TimeSlot.find({ regBy: id });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};
//Time Slot
const createTimeSlots = async (req, res) => {
  const user = req.params.id;

  const slot = new TimeSlot({
    date: req.body.date,
    time: req.body.time,
    regBy: user,
  });
  try {
    const createSlot = await slot.save();
    res.status(201).json({ timeSlot: createSlot });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = (req, res) => {
  res.send("user updated!!!");
};

//Delete Time Slots
const deleteSlot = async (req, res) => {
  const id = req.params.id;
  try {
    const delSlot = await TimeSlot.findOneAndDelete({ _id: id });
    res.status(201).json({ deletedSlot: delSlot });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//Load Slots By Registered Id
const loadSlot = async (req, res) => {
  const id = req.params.regBy;
  try {
    const slots = await TimeSlot.find({ regBy: id });
    res.status(201).json(slots);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  loadByReg,
  TimeSlot,
  getLogin,
  addStaff,
  userSignUp,
  updateUser,
  getAllUsers,
  deleteSlot,
  staffList,
  createTimeSlots,
  loadSlot,
};

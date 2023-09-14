// const { json } = require("express");
const User = require("../models/uers");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const getLogin = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });

    if (!user) {
      return res.status(401).json("Wrong Credentials!");
    }

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const password = hashPassword.toString(CryptoJS.enc.Utf8);
    if (password !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }

    // const accessToken = jwt.sign(
    //   {
    //     id: User._id,
    //   },
    //   process.env.JWT_SEC,
    //   { expiresIn: "3d" }
    // );

    res.status(200).json(user);
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
    deg: req.body.deg,
    regBy: req.body.regBy,
    role: req.body.role,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllUsers = (req, res) => {
  res.send("All Users Table!!!");
};

//USER REGESTRATION
// const createUser = async (req, res) => {
//   // try {
//   //     admin = await this.req._id;
//   // } catch (error) {
//   //     console.log(error);
//   // }

//   const newUser = new User({
//     fName: req.body.fName,
//     mName: req.body.mName,
//     lName: req.body.lName,
//     email: req.body.email,
//     password: req.body.password,
//     cPassword: req.body.cPassword,
//     gender: req.body.gender,
//     degignation: req.body.degignation,
//     address: req.body.address,
//     adminId: req.body.adminId,
//   });

//   try {
//     const user = await User.create(newUser);
//     res.status(401).json({ user });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

//Displaying Staff List
const staffList = async (req, res) => {
  // const query = {adminId: hostId}
  try {
    const id = req.params.user;
    const staffList = await User.find({ admin: id, role: "User" });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const createTimeSlots = async (req, res) => {};

const updateUser = (req, res) => {
  res.send("user updated!!!");
};

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const delUser = await User.findOneAndDelete();
  } catch (error) {}
};

module.exports = {
  getLogin,
  userSignUp,
  updateUser,
  getAllUsers,
  deleteUser,
  staffList,
  createTimeSlots,
};

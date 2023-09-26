// const { json } = require("express");
const User = require("../models/uers");
const Staff = require("../models/staff");
const TimeSlot = require("../models/timeSlot");
const CryptoJS = require("crypto-js");

//Get _id of Users/Staff
const getId = async (req, res) => {
  const userId = req.params.user;

  try {
    const user = await User.findOne({ user: userId });

    const staff = await Staff.findOne({ user: userId });

    if (!user && !staff) {
      return res.status(401).json("Wrong Credentials!");
    }
    let id;
    if (user) {
      id = user._id;
    } else if (staff) {
      id = staff._id;
    }
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//Login
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

//Add Staff To Slots
const addToSlot = async (req, res) => {
  const timeSlotId = req.params.id;
  const staffDetail = req.body.staffDetail;

  try {
    const timeSlot = await TimeSlot.findById(timeSlotId);

    if (!timeSlot) {
      return res.status(404).json({ msg: "Time slot not found!!!" });
    }

    // console.log("Before Update:");
    // console.log("timeSlot.staff:", timeSlot.staff);
    // console.log("staff:", staffDetail);

    if (typeof staffDetail !== "object" || Array.isArray(staffDetail)) {
      return res.status(400).json({ msg: "staffDetail must be an object" });
    }

    const staffExists = timeSlot.staff.some((existingStaff) => {
      return existingStaff._id.toString() === staffDetail._id.toString();
    });

    if (staffExists) {
      return res
        .status(400)
        .json({ msg: "Staff detail already exists in the time slot" });
    }

    timeSlot.staff.push(staffDetail);

    // console.log("After Update:");
    // console.log("timeSlot.staff:", timeSlot.staff);

    const updateTimeSlot = await timeSlot.save();
    res.status(200).json(updateTimeSlot);
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
    // console.log(staff);
  }
};

const loadSheduledStaff = async (req, res) => {
  const slotId = req.params.id;
  try {
    const loadStaff = await TimeSlot.findOne({ _id: slotId });

    if (!loadStaff) {
      return res.status(404).json({ msg: "Time slot not found" });
    }

    res.status(201).json(loadStaff.staff);
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

//Delete Sheduled Staff
const deleteSheduledStaff = async (req, res) => {
  const staffId = req.params.id;
  const timeSlotId = req.params.timeslotId;
  try {
    const timeSlot = await TimeSlot.findById(timeSlotId);

    if (!timeSlot) {
      return res.status(404).json({ msg: "Time slot not found!!!" });
    }

    // Find the index of the staff member with the given staffId in the staff array
    const staffIndex = timeSlot.staff.findIndex(
      (staff) => staff._id.toString() === staffId
    );

    // Check if staff member was found
    if (staffIndex === -1) {
      return res
        .status(404)
        .json({ msg: "Staff member not found in the time slot" });
    }

    // Remove the staff member from the staff array
    timeSlot.staff.splice(staffIndex, 1);

    // Save the updated TimeSlot document
    const updatedTimeSlot = await timeSlot.save();
    res.status(200).json(updatedTimeSlot);
  } catch (error) {
    res.status(500).json({ msg: error });
    // console.log(error);
  }
};

//Load Duty
const loadDuty = async (req, res) => {
  const id = req.params.id;

  try {
    const duties = await TimeSlot.find({ "staff._id": id });

    // Map duties to include only the specific staff object that matches the 'id'
    const filteredDuties = duties.map((duty) => {
      const specificStaff = duty.staff.find((staffObj) => staffObj._id == id);
      return {
        ...duty.toObject(),
        staff: specificStaff,
      };
    });
    res.status(200).json(filteredDuties);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

//Profile Admin/User
const getProfile = async (req, res) => {
  const userId = req.params.user;

  try {
    const user = await User.findOne({ user: userId });

    const staff = await Staff.findOne({ user: userId });

    if (!user && !staff) {
      return res.status(401).json("Wrong Credentials!");
    }

    res.status(200).json(user || staff);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
module.exports = {
  getId,
  loadByReg,
  TimeSlot,
  getLogin,
  addStaff,
  userSignUp,
  deleteSlot,
  staffList,
  createTimeSlots,
  loadSlot,
  addToSlot,
  loadSheduledStaff,
  deleteSheduledStaff,
  loadDuty,
  getProfile,
};

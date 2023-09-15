const {
  getLogin,
  addStaff,
  userSignUp,
  staffList,
  createTimeSlots,
  loadByReg,
  deleteSlot,
  loadSlot,
} = require("../controllers/task");

const exp = require("express");
const router = exp.Router();

router.route("/sign-up").post(userSignUp);
router.route("/log-in/").post(getLogin);
router.route("/:id/add-staff").post(addStaff);
router.route("/admin/:id/staff").get(staffList);
router.route("/admin/:id/schedule-time").post(createTimeSlots);
router.route("/admin/:id/load-list").get(loadByReg);
router.route("/admin/delete-slot/:id").delete(deleteSlot);
router.route("/admin/:regBy/load-slots").get(loadSlot);

module.exports = router;

const {
  getLogin,
  addStaff,
  userSignUp,
  staffList,
  createTimeSlots,
  loadByReg,
  deleteSlot,
  loadSlot,
  addToSlot,
  loadSheduledStaff,
  deleteSheduledStaff,
  loadDuty,
  getId,
  getProfile,
} = require("../controllers/task");

const exp = require("express");
const router = exp.Router();

router.route("/:user/get-id").get(getId);
router.route("/sign-up").post(userSignUp);
router.route("/log-in/").post(getLogin);
router.route("/:id/add-staff").post(addStaff);
router.route("/admin/:id/staff").get(staffList);
router.route("/admin/:id/schedule-time").post(createTimeSlots);
router.route("/admin/:id/load-list").get(loadByReg);
router.route("/admin/delete-slot/:id").delete(deleteSlot);
router.route("/admin/:regBy/load-slots").get(loadSlot);
router.route("/admin/:id/add-to-slot").put(addToSlot);
router.route("/admin/:id/load-sheduled-staff").get(loadSheduledStaff);
router
  .route("/admin/:timeslotId/delete-sheduled-staff/:id")
  .delete(deleteSheduledStaff);
router.route("/user/:id/load-duty").get(loadDuty);
router.route("/:user/profile").get(getProfile);

module.exports = router;

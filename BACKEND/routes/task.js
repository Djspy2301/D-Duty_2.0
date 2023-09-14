const {
  getLogin,
  userSignUp,
  updateUser,
  staffList,
  deleteUser,
  createTimeSlots,
} = require("../controllers/task");

const exp = require("express");
const router = exp.Router();

router.route("/sign-up").post(userSignUp);
router.route("/log-in/").post(getLogin);
router.route("/admin/:id/staff").get(staffList);
// router.route("/dashboard/add-staff").post(createUser);
router.route("/dashboard/staff").get(staffList);
router.route("/dashboard/schedule-time").post(createTimeSlots);
router.route("/dashboard/:id/update-user").patch(updateUser);
router.route("/:admin/delete-user").delete(deleteUser);

module.exports = router;

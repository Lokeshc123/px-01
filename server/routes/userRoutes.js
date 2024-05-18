const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateUserProfile,
  getAllUsers,
  getDetails,
  editRole,
  deleteUser,
  getUser,
  getUserReviews,
} = require("../controllers/usercontroller");
const { isVerified, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forget-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);
router.route("/change-password").put(isVerified, changePassword);
router.route("/user").get(isVerified, getUserDetails);
router.route("/user/profile-update").put(isVerified, updateUserProfile);
router
  .route("/admin/all-users")
  .get(isVerified, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isVerified, authorizeRoles("admin"), getDetails);
router
  .route("/admin/user-role/:id")
  .put(isVerified, authorizeRoles("admin"), editRole);
router
  .route("/admin/remove/:id")
  .delete(isVerified, authorizeRoles("admin"), deleteUser);
router.route("/user-details/:id").get(isVerified, getUser);
router.route("/user/reviews/:id").get(isVerified, getUserReviews);
module.exports = router;

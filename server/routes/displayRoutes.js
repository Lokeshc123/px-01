const express = require("express");
const { isVerified, authorizeRoles } = require("../middleware/auth");
const {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  addBanner,
  deleteBanner,
  updateBanner,
  addSlider,
  updateSlider,
  deleteSlider,
  addBestProduct,
  updateBestProduct,
  deleteBestProduct,
  getAllSlider,
  getAllBanner,
  getallTestimonial,
  getAllUserTestimonial,
  deleteUserTestimonial,
} = require("../controllers/displayController");
const router = express.Router();

router.route("/admin/testimonal").post(isVerified, addTestimonial);
router
  .route("/admin/testimonal/:id")
  .put(isVerified, authorizeRoles("admin"), updateTestimonial)
  .delete(isVerified, deleteTestimonial);

router
  .route("/admin/banner")
  .post(isVerified, authorizeRoles("admin"), addBanner);
router
  .route("/admin/banner/:id")
  .put(isVerified, authorizeRoles("admin"), updateBanner)
  .delete(isVerified, authorizeRoles("admin"), deleteBanner);
router
  .route("/admin/slider")
  .post(isVerified, authorizeRoles("admin"), addSlider);
router
  .route("/admin/slider/:id")
  .put(isVerified, authorizeRoles("admin"), updateSlider)
  .delete(isVerified, authorizeRoles("admin"), deleteSlider);
router
  .route("/admin/best-products")
  .post(isVerified, authorizeRoles("admin"), addBestProduct);
router
  .route("/admin/best-products/:id")
  .put(isVerified, authorizeRoles("admin"), updateBestProduct)
  .delete(isVerified, authorizeRoles("admin"), deleteBestProduct);

router.route("/admin/all-slider").get(getAllSlider);
router.route("/admin/all-banner").get(getAllBanner);
router.route("/admin/all-testimonal").get(getallTestimonial);
router.route("/user/all-testimonal/:id").get(getAllUserTestimonial);

module.exports = router;

const express = require("express");
const { isVerified, authorizeRoles } = require("../middleware/auth");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router
  .route("/admin/category/new")
  .post(isVerified, authorizeRoles("admin"), createCategory);

router
  .route("/admin/categories")
  .get(isVerified, authorizeRoles("admin"), getCategories);

router
  .route("/admin/category/:id")
  .put(isVerified, authorizeRoles("admin"), updateCategory)
  .delete(isVerified, authorizeRoles("admin"), deleteCategory);

module.exports = router;

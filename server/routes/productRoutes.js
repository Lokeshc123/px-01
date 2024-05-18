// productsRoutes.js
const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/products");
const { isVerified, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isVerified, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isVerified, authorizeRoles("admin"), updateProduct)
  .delete(isVerified, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getDetails);
router.route("/product/add-review").put(isVerified, createProductReview);
router.route("/product/reviews/:id").get(getAllReviews);

router
  .route("/product/reviews/:productId/:id")
  .delete(isVerified, deleteReview);

module.exports = router;

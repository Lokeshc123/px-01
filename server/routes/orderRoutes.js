const express = require("express");
const router = express.Router();

const {
  createNewOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isVerified, authorizeRoles } = require("../middleware/auth");
router.route("/orders/new").post(isVerified, createNewOrder);
router.route("/order/:id").get(isVerified, getSingleOrder);
router.route("/user/orders/:id").get(isVerified, myOrders);
router
  .route("/admin/orders")
  .get(isVerified, authorizeRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isVerified, authorizeRoles("admin"), updateOrder)
  .delete(isVerified, deleteOrder);
module.exports = router;

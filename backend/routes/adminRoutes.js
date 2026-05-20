const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getStats,
  getUsers,
  updateUserRole,
  getOrders,
  updateOrderStatus,
  assignDeveloperToOrder,
} = require("../controllers/adminController");

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", getStats);
router.get("/users", getUsers);
router.patch("/users/:id/role", updateUserRole);

router.get("/orders", getOrders);
router.patch("/orders/:id/status", updateOrderStatus);
router.patch("/orders/:id/assign", assignDeveloperToOrder);

module.exports = router;
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const developerMiddleware = require("../middleware/developerMiddleware");

const {
  getDeveloperOrders,
  updateDeveloperOrderStatus,
} = require("../controllers/developerController");

router.use(authMiddleware);
router.use(developerMiddleware);

router.get("/orders", getDeveloperOrders);
router.patch("/orders/:id/status", updateDeveloperOrderStatus);

module.exports = router;
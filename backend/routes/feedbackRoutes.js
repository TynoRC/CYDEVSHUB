const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getFeedback,
  createFeedback,
} = require("../controllers/feedbackController");

router.get("/", getFeedback);
router.post("/", authMiddleware, createFeedback);

module.exports = router;
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getForumPosts,
  createForumPost,
} = require("../controllers/forumController");

router.get("/", getForumPosts);
router.post("/", authMiddleware, createForumPost);

module.exports = router;
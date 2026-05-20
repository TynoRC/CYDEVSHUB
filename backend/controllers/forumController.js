const prisma = require("../config/prisma");

async function getForumPosts(req, res) {
  try {
    const posts = await prisma.forumPost.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la citirea mesajelor.",
      error: error.message,
    });
  }
}

async function createForumPost(req, res) {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Mesajul nu poate fi gol.",
      });
    }

    const post = await prisma.forumPost.create({
      data: {
        content,
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la postarea mesajului.",
      error: error.message,
    });
  }
}

module.exports = {
  getForumPosts,
  createForumPost,
};
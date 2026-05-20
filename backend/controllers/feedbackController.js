const prisma = require("../config/prisma");

async function getFeedback(req, res) {
  try {
    const feedbacks = await prisma.feedback.findMany({
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
        createdAt: "desc",
      },
    });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la citire feedback.",
      error: error.message,
    });
  }
}

async function createFeedback(req, res) {
  try {
    const {
      developerName,
      developerEmail,
      rating,
      satisfaction,
      message,
      projectTitle,
    } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        developerName,
        developerEmail,
        rating: Number(rating),
        satisfaction: Number(satisfaction),
        message,
        projectTitle,
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

    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la creare feedback.",
      error: error.message,
    });
  }
}

module.exports = {
  getFeedback,
  createFeedback,
};
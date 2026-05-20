const prisma = require("../config/prisma");
const { sendOrderConfirmationEmail } = require("../services/emailService");

async function createOrder(req, res) {
  try {
    const { title, projectType, description } = req.body;

    const order = await prisma.order.create({
      data: {
        title,
        projectType,
        description,
        userId: req.user.id,
      },
      include: {
        user: true,
      },
    });

    await sendOrderConfirmationEmail(
      order.user.email,
      order.user.name,
      order.title,
      order.projectType,
      order.description
    );

    res.json({
      message: "Comandă plasată cu succes.",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      message: "Eroare la creare comandă.",
      error: error.message,
    });
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la citire comenzi.",
      error: error.message,
    });
  }
}

module.exports = {
  createOrder,
  getMyOrders,
};
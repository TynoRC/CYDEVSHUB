const prisma = require("../config/prisma");

async function getDeveloperOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        assignedDeveloperEmail: {
          equals: req.user.email,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("GET DEVELOPER ORDERS ERROR:", error);

    res.status(500).json({
      message: "Eroare la citirea comenzilor developerului.",
      error: error.message,
    });
  }
  console.log("DEV PANEL USER:", req.user);
}

async function updateDeveloperOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order || order.assignedDeveloperEmail !== req.user.email) {
      return res.status(403).json({
        message: "Nu ai acces la această comandă.",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la actualizarea comenzii.",
      error: error.message,
    });
  }
}

module.exports = {
  getDeveloperOrders,
  updateDeveloperOrderStatus,
};
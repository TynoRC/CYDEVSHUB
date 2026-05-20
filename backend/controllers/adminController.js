const prisma = require("../config/prisma");

const {
  sendClientAssignmentEmail,
  sendDeveloperAssignmentEmail,
} = require("../services/emailService");

async function assignDeveloperToOrder(req, res) {
  try {
    const { id } = req.params;
    const { developerName, developerEmail, price } = req.body;

    const paymentIban = "RO82 RNCB 0856 1763 6518 0001";
    const developerCut = Number(price) * 0.55;

    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        assignedDeveloperName: developerName,
        assignedDeveloperEmail: developerEmail,
        price: Number(price),
        developerCut,
        paymentIban,
        status: "IN_PROGRESS",
      },
      include: {
        user: true,
      },
    });

    await sendClientAssignmentEmail(
      order.user.email,
      order.user.name,
      order.title,
      developerName,
      developerEmail,
      Number(price),
      paymentIban
    );

    await sendDeveloperAssignmentEmail(
      developerEmail,
      developerName,
      order,
      order.user,
      Number(price),
      developerCut
    );

    res.json({
      message: "Developer repartizat cu succes.",
      order,
    });
  } catch (error) {
    console.error("ASSIGN DEVELOPER ERROR:", error);

    res.status(500).json({
      message: "Eroare la repartizarea developerului.",
      error: error.message,
    });
  }
}

async function getStats(req, res) {
  const users = await prisma.user.count();
  const orders = await prisma.order.count();
  const pendingOrders = await prisma.order.count({
    where: { status: "PENDING" },
  });
  const completedOrders = await prisma.order.count({
    where: { status: "COMPLETED" },
  });

  res.json({
    users,
    orders,
    pendingOrders,
    completedOrders,
  });
}

async function getUsers(req, res) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(users);
}

async function updateUserRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  res.json(user);
}

async function getOrders(req, res) {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(orders);
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
    include: {
      user: true,
    },
  });

  res.json(order);
}

module.exports = {
  getStats,
  getUsers,
  updateUserRole,
  getOrders,
  updateOrderStatus,
  assignDeveloperToOrder,
};
const express = require("express");
const router = express.Router();

const {
  sendAccountConfirmationEmail,
  sendOrderConfirmationEmail,
} = require("../services/emailService");

router.post("/account-created", async (req, res) => {
  try {
    const { email, name } = req.body;

    await sendAccountConfirmationEmail(email, name);

    res.json({ message: "Email creare cont trimis." });
  } catch (error) {
    console.error("ACCOUNT EMAIL ERROR:", error);
    res.status(500).json({ message: "Eroare email creare cont." });
  }
});

router.post("/order-created", async (req, res) => {
  try {
    const { email, name, orderTitle, projectType, description } = req.body;

    console.log("ORDER EMAIL DATA:", {
      email,
      name,
      orderTitle,
      projectType,
      description,
    });

    await sendOrderConfirmationEmail(
      email,
      name,
      orderTitle,
      projectType,
      description
    );

    res.json({ message: "Email comandă trimis." });
  } catch (error) {
    console.error("ORDER EMAIL ERROR:", error);
    res.status(500).json({
  message: "Eroare email comandă.",
  error: error.message,
});
  }
});

module.exports = router;
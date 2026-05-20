require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const developerRoutes = require("./routes/developerRoutes");
const forumRoutes = require("./routes/forumRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cydevshubofficial-m3bq02tx9-tynorcs-projects.vercel.app",
      "https://cydevshubofficial-tynorcs-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("CYDEVS API started");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CYDEVS API started on port ${PORT}`);
});


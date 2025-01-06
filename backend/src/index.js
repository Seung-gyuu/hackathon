const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_PROD
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});

module.exports = app;

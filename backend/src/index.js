const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // 개발 환경
      "hackathon-six-woad.vercel.app"
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

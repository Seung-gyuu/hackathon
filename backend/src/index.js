const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");

const app = express();

app.use(
  cors({
    origin: [
      "hackathon-six-woad.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoute);


module.exports = app;

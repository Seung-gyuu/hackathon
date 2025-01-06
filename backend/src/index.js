const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");
const app = express();

const corsOptions = {
  origin: [
    "https://hackathon-six-woad.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", userRoute);


module.exports = app;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

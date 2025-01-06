const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");

const app = express();

app.use(
  cors({
    origin: [
      "https://hackathon-six-woad.vercel.app",
      "http://localhost:3000" // Add localhost for development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add all necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Add necessary headers
    // origin: [
    //   "https://hackathon-six-woad.vercel.app" ,
    // ],
    // methods: ["GET", "POST"],
    // credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoute);




module.exports = app;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

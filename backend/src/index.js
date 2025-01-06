const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");

const app = express();

app.use(
  cors({// Add necessary headers
    origin: [
      "https://hackathon-six-woad.vercel.app" ,
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoute);


//
app.post("/test", (req, res) => {
  console.log("POST /test 요청 받음");
  console.log("Request body:", req.body); // 요청 본문 출력

  // 클라이언트로 응답 보내기
  res.json({
    message: "Received data successfully!",
    data: req.body
  });
});
//

module.exports = app;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

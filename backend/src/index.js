const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");
const { getAIResponse } = require("./aiController");

const app = express();

// 기본 CORS 미들웨어
app.use(
  cors({
    origin: ["https://hackathon-six-woad.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// 수동으로 CORS 헤더 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://hackathon-six-woad.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use("/api", userRoute);

app.post('/api/chat', async (req, res) => {
  const { docID } = req.body;

  if (!docID) {
    return res.status(400).json({ error: 'docID is required' });
  }

  try {
    const aiResponse = await getAIResponse(docID);  // Ensure this is the correct function
    res.json({ result: aiResponse });
  } catch (error) {
    console.error('Error handling /api/chat request:', error.message);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

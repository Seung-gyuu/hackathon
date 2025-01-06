const express = require("express");
const cors = require("cors");
const userRoute = require("./UserRoute");
const { getAIResponse } = require("./aiController");

const app = express();

app.use(
  cors({
    origin: [
      "hackathon-six-woad.vercel.app" ,
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoute);

app.post('/api/chat', async (req, res) => {
  const { docID } = req.body;

  if (!docID) {
    return res.status(400).json({ error: 'docID is required' });
  }

  try {
    const aiResponse = await aiController(docID);
    res.json({ result: aiResponse });
  } catch (error) {
    console.error('Error handling /api/chat request:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

module.exports = app;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

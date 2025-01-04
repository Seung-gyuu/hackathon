const express = require("express");
const { db } = require("./firebase");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.get("/get/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return res.status(404).send("The requested document does not exist.");
    }

    res.status(200).json({ id: doc.id, data: doc.data() });
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).send("An error occurred while fetching the document.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});

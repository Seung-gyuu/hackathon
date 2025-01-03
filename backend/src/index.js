const express = require("express");
const { db } = require("./firebase");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.post("/add", async (req, res) => {
  try {
    const { collection, id, data } = req.body;
    if (!collection || !id || !data) {
      return res.status(400).send("Collection, ID, and data are required");
    }
    await db.collection(collection).doc(id).set(data);
    res.status(200).send("Data added successfully!");
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Failed to add data.");
  }
});

app.get("/get/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return res.status(404).send("Document not found.");
    }
    res.status(200).json(doc.data());
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).send("Failed to get data.");
  }
});

app.delete("/delete/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    await db.collection(collection).doc(id).delete();
    res.status(200).send("Data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Failed to delete data.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
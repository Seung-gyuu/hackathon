const express = require("express");
const { db } = require("./firebase");

const router = express.Router();

router.post("/save-answers", async (req, res) => {
  try {
    const answers = req.body.answers;

    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      console.error("Invalid answers data:", answers);
      return res
        .status(400)
        .json({ error: "Invalid answers data. It must be an object." });
    }

    const docRef = db.collection("user_selections").doc();
    await docRef.set(answers);

    res
      .status(200)
      .json({ message: "Answers saved successfully!", docID: docRef.id });
  } catch (error) {
    console.error("Error saving answers:", error);
    res.status(500).json({ error: "An error occurred while saving answers." });
  }
});

router.get("/get-options/:question", async (req, res) => {
  try {
    const { question } = req.params;
    console.log("Requested question ID:", question);

    const docRef = db.collection("travel_question").doc(question);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.error(`Document not found for question: ${question}`);
      return res
        .status(404)
        .json({ error: `Question not found for: ${question}` });
    }

    console.log("Document data fetched:", doc.data());
    res.status(200).json(doc.data());
  } catch (error) {
    console.error("Error fetching options:", error);
    res.status(500).json({ error: "Failed to fetch options." });
  }
});

module.exports = router;

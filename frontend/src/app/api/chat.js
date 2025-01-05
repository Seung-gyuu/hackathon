import OpenAI from "openai";
import { db } from "../../../backend/firebase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { docID } = req.body;

    if (!docID) {
      return res.status(400).json({ error: "docID is required" });
    }

    const userDoc = await db.collection("user_selections").doc(docID).get();
    const userInput = userDoc.data();

    const userSelections = `
      Travel Purpose: ${userInput.travel_purpose}
      Travel Style: ${userInput.travel_style}
      Budget: ${userInput.budget}
      Companion: ${userInput.companion}
      Activities: ${userInput.activities}
      Climate: ${userInput.climate}
      Travel Duration: ${userInput.travel_duration}
    `;

    const aiResponse = await openai.chat.completions.create({
      messages: [
        { role: "user", content: userSelections },
        { role: "system", content: "Generate travel recommendations based on preferences." },
      ],
      model: "gpt-4o",
    });

    res.status(200).json({ result: aiResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate recommendations." });
  }
}

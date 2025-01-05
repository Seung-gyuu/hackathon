const OpenAI = require("openai");
const { db } = require("./firebase");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAIResponse = async (docID) => {
  try {
    const userDoc = await db.collection("user_selections").doc(docID).get();
    if (!userDoc.exists) {
      throw new Error("User data not found");
    }

    const user_input = userDoc.data();

    const user_selections = `
      Travel Purpose: ${user_input.travel_purpose}
      Travel Style: ${user_input.travel_style}
      Budget: ${user_input.budget}
      Companion: ${user_input.companion}
      Activities: ${user_input.activities}
      Climate: ${user_input.climate}
      Travel Duration: ${user_input.travel_duration}
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          // content: user_selections,
          content: `User Preferences:
- Travel Purpose: ${user_input.travel_purpose}
- Travel Style: ${user_input.travel_style}
- Budget: ${user_input.budget}
- Companion: ${user_input.companion}
- Activities: ${user_input.activities}
- Climate: ${user_input.climate}
- Travel Duration: ${user_input.travel_duration}`,
        },

        {
          role: "system",
          content:
            "You are a travel assistant AI. Based on the user preferences, recommend three destinations with a one-day itinerary each. Provide the result in JSON format, structured as an array of destinations, where each destination includes a name, a one-day itinerary, and activities for morning, lunch, afternoon, and evening.",
          //     "Based on the following user preferences, recommend three countries or cities with a 1-day itinerary for each destination. Please add React tags to this text.",
        },
      ],
    });

    return aiResponse.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI result:", error);
    throw error;
  }
};

module.exports = { getAIResponse };

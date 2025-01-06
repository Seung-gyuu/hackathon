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
          content: `
You are a travel assistant AI. Based on the user preferences, recommend three travel destinations. For each destination:
1. Suggest a travel itinerary tailored to the user's travel duration. 
2. If the duration is more than one day, provide a detailed day-by-day plan.
3. Include morning, lunch, afternoon, and evening activities for each day.
4. Ensure the recommendations align with the user's purpose, style, budget, and selected activities.

Return the result in the following JSON format:

[
  {
    "name": "Destination Name",
    "duration": "Recommended Duration (e.g., 3 days, 7 days)",
    "itinerary": {
      "day1": {
        "morning": "Morning activity description",
        "lunch": "Lunch recommendation",
        "afternoon": "Afternoon activity description",
        "evening": "Evening activity description"
      },
      "day2": { ... },
      "day3": { ... },
    "...": { ... }
    },
    "activities": ["activity1", "activity2", "activity3"],
  }
]
          `,
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

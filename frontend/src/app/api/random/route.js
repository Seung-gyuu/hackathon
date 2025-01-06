import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // OpenAI API 키 설정
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type) {
      return new Response(JSON.stringify({ error: "Type is required" }), {
        status: 400,
      });
    }

    const prompt = `Based on the travel type: "${type}", recommend one travel destination with the following details:

1. **Destination Name:** Provide the name of a city or region that matches the travel type.

2. **Recommended Duration:** Suggest the ideal duration (e.g., 3 days, 5 days, 7 days) for fully exploring the destination.

3. **Itinerary:** Provide a detailed itinerary for each day based on the recommended duration.
   - For each day (Day 1, Day 2, ..., Day N), include:
      - **Morning:** Describe a recommended activity or place to visit.
      - **Lunch:** Suggest a restaurant or type of cuisine.
      - **Afternoon:** Recommend an afternoon activity or location.
      - **Evening:** Suggest an evening activity or dining experience.

4. **Activities:** List 3-4 key activities or themes that define the experience of this destination.

Format the response as a structured JSON like this:
{
  "name": "Destination Name",
  "duration": "Recommended Duration",
  "itinerary": {
    "day1": {
      "morning": "Description of morning activity.",
      "lunch": "Description of lunch recommendation.",
      "afternoon": "Description of afternoon activity.",
      "evening": "Description of evening activity."
    },
    "day2": { ... },
    "day3": { ... },
    "...": { ... }
  },
  "activities": [
    "Key activity 1",
    "Key activity 2",
    "Key activity 3"
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0]?.message?.content;

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch response from OpenAI" }),
      { status: 500 }
    );
  }
}

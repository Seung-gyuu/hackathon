import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // OpenAI API 키 설정
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;
     // Log the received type
     console.log("Received type:", type);

    if (!type) {
      return new Response(JSON.stringify({ error: "Type is required" }), {
        status: 400,
      });
    }
    const prompt = `Based on the travel type: "${type}", recommend one travel destination with the following details:
    1. **Duration:** Recommend the ideal duration for fully exploring the destination.
    2. **Itinerary:** Provide a detailed itinerary based on the recommended duration up to 3 days only, even if the recommended duration is longer.
    
    Format the response as a structured JSON like this:
    {
      "name": "Destination Name",
      "duration": "Recommended Duration",
      "itinerary": {
        "day1": {
          "morning": "Description of morning activity.",
          "lunch": "Description of lunch recommendation very shortly.",
          "afternoon": "Description of afternoon activity.",
          "evening": "Description of evening activity."
        },
        "day2": { ... },
        "day3": { ... }
      },
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

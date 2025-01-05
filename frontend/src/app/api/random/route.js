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
      // Log before making the OpenAI API call
      console.log("Sending request to OpenAI with type:", type);

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${type}`,
        },

        {
          role: "system",
          content:"Suggest a random destination and a 1-day itinerary based on the travel type. Format as: - Destination: [Destination Name] - Itinerary: [Brief itinerary, max 80 words]"
        },
      ],
      model: "gpt-4o",
    });


    // const prompt = `Suggest a travel destination and a short itinerary for the type by short paragraph"${type}".`;

    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [{ role: "user", content: prompt }],
    // });
 // Log the full response from OpenAI
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

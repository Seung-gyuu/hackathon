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

    const prompt = `Suggest a travel destination and a short itinerary for the type by short paragraph"${type}".`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
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

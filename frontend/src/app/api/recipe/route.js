import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request) {
  const body = await request.json();
  const { ingredients } = body;

  if (!ingredients) {
    return new Response(JSON.stringify({ error: "Ingredients are required" }), {
      status: 400,
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        {
          role: "user",
          content: `I have the following ingredients: ${ingredients}. Can you suggest some recipes I can make?`,
        },
      ],
    });

    const result = response.choices[0].message.content;
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch response from OpenAI" }), {
      status: 500,
    });
  }
}

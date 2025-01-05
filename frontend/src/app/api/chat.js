// const OpenAI = require("openai");
// const { db } = require('./firebase'); 

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req, res) {
//   const docID = "9DFq1dRsAXhyd9o8RbOk"; 

//   try {
//     console.log(`Received docID: ${docID}`); 

//     // Fetch user data from Firestore using docID
//     const userDoc = await db.collection('user_selections').doc(docID).get();
//     if (!userDoc.exists) {
//       console.error(`No data found for docID: ${docID}`); 
//       return res.status(404).json({ error: 'User data not found' });
//     }

//     const user_input = userDoc.data();
//     console.log("Fetched user data:", user_input);
//     // Format the user data into a prompt
//     const user_selections = `
//       Travel Purpose: ${user_input.travel_purpose}
//       Travel Style: ${user_input.travel_style}
//       Budget: ${user_input.budget}
//       Companion: ${user_input.companion}
//       Activities: ${user_input.activities}
//       Climate: ${user_input.climate}
//       Travel Duration: ${user_input.travel_duration}
//     `;
//     console.log("Formatted user data for AI:", user_selections); 

//     // Call OpenAI with the formatted user data
//     const aiResponse = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: user_selections,
//         },
//         {
//           role: "system",
//           content: "Based on the following user preferences, recommend three countries or cities with a 3-day itinerary for each destination, and provide an image URL for each",
//         },
//       ],
//       model: "gpt-4o", 
//     });

//     const result = aiResponse.choices[0].message.content;
//     console.log("AI Result:", result); 

//     // Return the result as a response
//     return res.status(200).json({ result });
//   } catch (error) {
//     console.error('Error generating AI result:', error);
//     return res.status(500).json({ error: error.message || 'Failed to generate result' });
//   }
// }

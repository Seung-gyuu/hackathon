// "use client";
// import PlanningLayout from "@/components/PlanningLayout";
// import SelectionItem from "@/components/SelectionItem";
// import { purposeData } from "@/data/planningData";
// import { useEffect, useState } from "react";
// import { db } from "@/firebase"; // Firebase 설정 파일 불러오기
// import { collection, getDocs } from "firebase/firestore";

// export default function Purpose() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "questions"));
//         const fetchedQuestions = [];
//         querySnapshot.forEach((doc) => {
//           fetchedQuestions.push({ id: doc.id, ...doc.data() });
//         });
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   console.log("Questions", questions);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>Purpose Questions</h1>
//       <ul>
//         {questions.map((question) => (
//           <li key={question.id}>
//             <h3>{question.question}</h3>
//             <ul>
//               {question.options?.map((option, index) => (
//                 <li key={index}>{option}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

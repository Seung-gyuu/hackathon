// "use client";
// import { useEffect, useState } from "react";
// import { db } from "@/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useSearchParams } from "next/navigation";

// export default function ResultPage() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const documentId = searchParams.get("id"); // URL에서 ID 추출

//   useEffect(() => {
//     const fetchResult = async () => {
//       try {
//         if (!documentId) {
//           console.warn("No document ID found in the URL.");
//           setLoading(false);
//           return;
//         }

//         // ✅ Firestore에서 Document ID로 데이터 조회
//         const docRef = doc(db, "user_selections", documentId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//         } else {
//           console.warn("No document found with the provided ID.");
//         }
//       } catch (error) {
//         console.error("Error fetching result:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResult();
//   }, [documentId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!userData) {
//     return <p>No data available</p>;
//   }

//   return (
//     <div>
//       <h1>Your Travel Plan</h1>
//       <ul>
//         <li>
//           <strong>Purpose:</strong> {userData.travel_purpose || "N/A"}
//         </li>
//         <li>
//           <strong>Style:</strong> {userData.travel_style || "N/A"}
//         </li>
//         <li>
//           <strong>Activities:</strong> {userData.activities || "N/A"}
//         </li>
//         <li>
//           <strong>Budget:</strong> {userData.budget || "N/A"}
//         </li>
//         <li>
//           <strong>Climate:</strong> {userData.climate || "N/A"}
//         </li>
//         <li>
//           <strong>Companion:</strong> {userData.companion || "N/A"}
//         </li>
//         <li>
//           <strong>Duration:</strong> {userData.travel_duration || "N/A"}
//         </li>
//         <li>
//           <strong>Created At:</strong> {userData.createdAt || "N/A"}
//         </li>
//       </ul>
//     </div>
//   );
// }

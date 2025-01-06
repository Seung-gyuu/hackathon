"use client";
import { useEffect, useState, Suspense } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import DestinationCard from "@/components/DestinationCard";

function PlanResultContent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const documentId = searchParams.get("id");

  // Firestore에서 사용자 데이터 가져오기
  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (!documentId) {
          console.warn("No document ID found in the URL.");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "user_selections", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("No document found with the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    fetchResult();
  }, [documentId]);

  // AI API에서 결과 가져오기
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docID: documentId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data = await response.json();
        let parsedResult;

        try {
          parsedResult = JSON.parse(
            data.result
              .replace(/^```json/, "")
              .replace(/```$/, "")
              .trim()
          );

          setResult(parsedResult);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          setResult([]);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [documentId]);

  console.log("result", result);
  console.log("userData", userData);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!userData || result.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-[calc(100vh-8rem)] container">
      <div className="grid items-center justify-center w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.map((destination, index) => (
          <DestinationCard
            key={index}
            name={destination.name}
            duration={destination.duration}
            itinerary={destination.itinerary}
            activities={destination.activities || []}
          />
        ))}
      </div>
      <button
        className="px-8 py-2 border-2 rounded-full cursor-pointer hover:bg-third border-third/80 bg-third/80 text-neutralLight mt-4"
        onClick={() => router.push("/")}
      >
        Go Home
      </button>
    </div>
  );
}

// Suspense로 감싸기
export default function PlanResult() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PlanResultContent />
    </Suspense>
  );
}

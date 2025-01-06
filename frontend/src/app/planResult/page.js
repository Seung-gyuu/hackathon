"use client";
import { useEffect, useState, Suspense } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import DestinationCard from "@/components/DestinationCard";
import HomeButton from "@/components/HomeButton";

function PlanResultContent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const documentId = searchParams.get("id");

  /**
   * Firestore에서 사용자 데이터 가져오기
   */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!documentId) {
        console.warn("No document ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "user_selections", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("No document found with the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [documentId]);

  /**
   * AI API에서 결과 가져오기
   */
  useEffect(() => {
    const fetchAIResult = async () => {
      if (!documentId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ docID: documentId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch result from API");
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
        console.error("Error fetching result from API:", error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAIResult();
  }, [documentId]);

  /**
   * Debugging logs
   */
  console.log("result", result);
  console.log("userData", userData);

  /**
   * 로딩 상태
   */
  if (loading) {
    return <LoadingScreen />;
  }

  /**
   * 데이터가 없을 경우
   */
  if (!userData || result.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No data available</p>
        <HomeButton />
      </div>
    );
  }

  /**
   * 데이터 표시
   */
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
      <div className="flex justify-center w-full mt-8">
        <HomeButton />
      </div>
    </div>
  );
}

/**
 * Suspense로 감싸기
 */
export default function PlanResult() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PlanResultContent />
    </Suspense>
  );
}

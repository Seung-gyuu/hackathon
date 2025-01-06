"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import DestinationCard from "@/components/DestinationCard";

export default function PlanResult() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const searchParams = useSearchParams();
  const documentId = searchParams.get("id");

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

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/chat`, {
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
    </div>
  );
}

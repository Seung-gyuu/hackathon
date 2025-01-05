"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function planResult() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
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
      } finally {
        // setLoading(false);
        setTimeout(() => setLoading(false), 5000);
      }
    };
    fetchResult();
  }, [documentId]);

  useEffect(() => {
    const fetchResult = async () => {
      const docID = documentId;

      try {
        const response = await fetch(`http://localhost:3001/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data = await response.json();
        setResult(data.result);
      } catch (error) {
        console.error("Error fetching result:", error);
        setResult("Failed to load result.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  // console.log("result", result);

  if (loading) {
    // return <BasicLoading />;
    return <LoadingScreen />;
  }

  if (!userData) {
    return <p>No data available</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-[calc(100vh-8rem)] container">
      {/* <h1>Your Travel Plan</h1>
      <ul>
        <li>
          <strong>Purpose:</strong> {userData.travel_purpose || "N/A"}
        </li>
        <li>
          <strong>Style:</strong> {userData.travel_style || "N/A"}
        </li>
        <li>
          <strong>Activities:</strong> {userData.activities || "N/A"}
        </li>
        <li>
          <strong>Budget:</strong> {userData.budget || "N/A"}
        </li>
        <li>
          <strong>Climate:</strong> {userData.climate || "N/A"}
        </li>
        <li>
          <strong>Companion:</strong> {userData.companion || "N/A"}
        </li>
        <li>
          <strong>Duration:</strong> {userData.travel_duration || "N/A"}
        </li>
        <li>
          <strong>Created At:</strong> {userData.createdAt || "N/A"}
        </li>
      </ul> */}
      <p>{result}</p>
    </div>
  );
}

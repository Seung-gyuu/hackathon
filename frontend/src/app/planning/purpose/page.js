"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { purposeData } from "@/data/planningData";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Purpose() {
  const [purposeData, setPurposeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurposeData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_purpose");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPurposeData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching purpose data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurposeData();
  }, []);

  console.log("purposeData", purposeData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!purposeData) {
    return <p>No data available</p>;
  }
  return (
    <div>
      <PlanningLayout
        title={purposeData.question || "Purpose Question"}
        currentStep={1}
      >
        <div className="grid grid-cols-2 gap-4">
          {purposeData.options?.map((option, id) => (
            <SelectionItem
              key={id}
              title={option}
              description=""
              isSelected={false}
              onSelect={() => console.log(`Selected: ${option}`)}
            />
          ))}
        </div>
      </PlanningLayout>
    </div>
  );
}

"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Type() {
  const [travelStyleData, setTravelStyleData] = useState(null); // State for travel style data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOption, setSelectedOption] = useState(null); // State for selected option
  const [title, setTitle] = useState("Loading..."); // State to store the page title

  const icons = [
    "/images/plan-2-1.png",
    "/images/plan-2-2.png",
    "/images/plan-2-3.png",
  ];

  /**
   * Fetch travel style data from Firestore
   */
  useEffect(() => {
    const fetchTravelStyleData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_style");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTravelStyleData(docSnap.data());
          const title = docSnap.data().question || "Default Title"; // Set the title from fetched data or use default
          setTitle(title);
        } 

        // Retrieve selected option from localStorage
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedStyle");
          if (storedOption) setSelectedOption(storedOption);
        }
      } catch (error) {
        console.error("Error fetching travel style data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelStyleData();
  }, []);

  /**
   * Option select handler
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedStyle", option);
    }
  };

  /**
   * Loading state
   */
  if (loading) {
    return <BasicLoading />;
  }

  /**
   * If no data is available
   */
  if (!travelStyleData) {
    return <p>No data available</p>;
  }

  /**
   * Render the page
   */
  return (
    <PlanningLayout
      title={`2. ${title}`}
      currentStep={2}
      isNextDisabled={!selectedOption}
    >
      {/* Option selection area */}
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {travelStyleData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            icon={icons[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}

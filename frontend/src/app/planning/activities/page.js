"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import BasicLoading from "@/components/basicLoading";

export default function Activities() {
  const [activityData, setActivityData] = useState(null); // State to hold the activity data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option
  const [title, setTitle] = useState("Loading..."); // State to store the page title

  const imgs = [
    "/img/plan/activity1.png",
    "/img/plan/activity2.png",
    "/img/plan/activity3.png",
    "/img/plan/activity4.png",
  ]; // Array of image URLs for activity options

  const router = useRouter(); // Router instance for navigation

  /**
   * Fetch activity data from Firestore
   */
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const docRef = doc(db, "travel_question", "activities"); // Reference to the Firestore document
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setActivityData(docSnap.data()); // Set the fetched data to state
          const title = docSnap.data().question || "Default Title"; // Set the title from fetched data or use default
          setTitle(title);
        }
      } catch (error) {
        // Handle error (e.g., show alert or log)
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchActivityData(); // Call the function to fetch data
  }, []);

  /**
   * Handle option selection
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option); // Set the selected option
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedActivity", option); // Save the selected option to localStorage
    }
  };

  /**
   * Save user selections to Firestore and navigate to results page
   */
  const handleSaveToFirestore = async () => {
    try {
      const userSelections = {
        travel_purpose: localStorage.getItem("selectedPurpose") || null,
        travel_style: localStorage.getItem("selectedStyle") || null,
        activities: localStorage.getItem("selectedActivity") || null,
        budget: localStorage.getItem("selectedBudget") || null,
        climate: localStorage.getItem("selectedWeather") || null,
        companion: localStorage.getItem("selectedCompanion") || null,
        travel_duration: localStorage.getItem("selectedDuration") || null,
        createdAt: new Date().toISOString(),
      }; // Create user selection object

      // Filter out null values
      const filteredSelections = Object.fromEntries(
        Object.entries(userSelections).filter(([_, value]) => value !== null)
      );

      const docRef = await addDoc(
        collection(db, "user_selections"),
        filteredSelections
      ); // Save filtered selections to Firestore

      // Clear localStorage after saving
      [
        "selectedPurpose",
        "selectedStyle",
        "selectedActivity",
        "selectedBudget",
        "selectedWeather",
        "selectedCompanion",
        "selectedDuration",
      ].forEach((key) => localStorage.removeItem(key));

      router.push(`/planResult?id=${docRef.id}`); // Navigate to the results page with the document ID
    } catch (error) {
      alert("Failed to save data. Please try again."); // Show an alert if saving fails
    }
  };

  /**
   * Render loading state
   */
  if (loading) {
    return <BasicLoading />; // Show loading component if data is still being fetched
  }

  /**
   * Render if no data is available
   */
  if (!activityData) {
    return <p>No data available</p>; // Show message if no data is found
  }

  /**
   * Render the component UI
   */
  return (
    <PlanningLayout
      title={title}
      currentStep={7}
      isFinal={true}
    >
      {/* Render selection options */}
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {activityData?.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            img={imgs[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>

      {/* Render navigation buttons */}
      <div className="flex justify-between w-full gap-4 mt-8">
        <div className="flex items-center justify-between w-full gap-4 font-semibold">
          {/* Back button */}
          <button
            className="px-8 py-2 border-2 rounded-full cursor-pointer text-neutralDarkLight border-neutralDarkLight hover:border-neutralDark hover:text-neutralDark"
            onClick={() => router.push("/planning/companion")}
          >
            Back
          </button>

          {/* View Results button */}
          <button
            className="px-8 py-2 border-2 rounded-full cursor-pointer hover:bg-third border-third/80 bg-third/80 text-neutralLight"
            onClick={handleSaveToFirestore}
            disabled={!selectedOption}
          >
            View Results
          </button>
        </div>
      </div>
    </PlanningLayout>
  );
}

"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { stepsData } from "@/data/planningData";
import { IoMdCloseCircle } from "react-icons/io";
import NavigationButtons from "./NavigationButtons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import ProgressBar from "./ProgressBar";

export default function PlanningLayout({
  title,
  children,
  currentStep,
  isFinal = false,
  isNextDisabled = false,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const steps = [
    { label: "Purpose" },
    { label: "Style" },
    { label: "Weather" },
    { label: "Budget" },
    { label: "Duration" },
    { label: "Companion" },
    { label: "Activities" },
  ];

  const prevStep =
    currentStep === 1 ? "/" : stepsData[currentStep - 2]?.path || "/planning";
  const nextStep = isFinal
    ? "/planResult"
    : stepsData[currentStep]?.path || "/planning";

  const pageStorageKeys = {
    "/planning/purpose": "selectedPurpose",
    "/planning/type": "selectedStyle",
    "/planning/activities": "selectedActivity",
    "/planning/budget": "selectedBudget",
    "/planning/weather": "selectedWeather",
    "/planning/companion": "selectedCompanion",
    "/planning/duration": "selectedDuration",
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/");
    } else {
      router.push(prevStep);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      router.push(nextStep);
    } else {
      alert("Please select an option before proceeding to the next step!");
    }
  };

  useEffect(() => {
    if (!pathname.startsWith("/planning")) {
      const keysToClear = Object.values(pageStorageKeys);
      keysToClear.forEach((key) => localStorage.removeItem(key));
      console.log("All planning-related localStorage keys have been cleared");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-[calc(100vh-8rem)] container">
      <div className="flex flex-col justify-center w-full p-4 mx-auto md:p-6 lg:w-2/3">
        {/* Title */}
        <h1 className="flex items-center justify-center w-full mb-16 text-2xl font-bold md:text-4xl md:m-0">
          {title}
        </h1>

        {/* Progress Bar */}
        <div className="items-center justify-center hidden w-full h-full my-20 md:flex">
          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            className="w-full"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-1 mb-8">
          {children}
        </div>

        {/* Navigation Buttons */}
        {!isFinal ? (
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            isFinal={isFinal}
            isNextDisabled={isNextDisabled}
          />
        ) : null}
      </div>
    </div>
  );
}

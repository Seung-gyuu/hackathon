"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { stepsData } from "@/data/planningData";
import NavigationButtons from "./NavigationButtons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function PlanningLayout({
  title,
  children,
  currentStep,
  isFinal = false,
  isNextDisabled = false,
  onResults, // ✅ 결과 저장 핸들러 추가
}) {
  const router = useRouter();
  const pathname = usePathname();

  const prevStep =
    currentStep === 1 ? "/" : stepsData[currentStep - 2]?.path || "/planning";
  const nextStep = isFinal
    ? "/result"
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
    const currentStorageKey = pageStorageKeys[pathname];
    if (currentStorageKey) {
      localStorage.removeItem(currentStorageKey);
      console.log(`${currentStorageKey} has been removed from localStorage`);
    }

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
    <div className="w-1/2 p-6 mx-auto">
      {/* Progress Bar */}
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <progress
          value={currentStep}
          max={stepsData.length}
          className="w-full"
        ></progress>
      </div>

      {/* Main Content */}
      <div className="mb-8">{children}</div>

      {/* Navigation Buttons (isFinal이 false일 때만 렌더링) */}
      {!isFinal && (
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          isFinal={isFinal}
          isNextDisabled={isNextDisabled}
        />
      )}
    </div>
  );
}

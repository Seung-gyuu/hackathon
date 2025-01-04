"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { stepsData } from "@/data/planningData";
import NavigationButtons from "./NavigationButtons";

export default function PlanningLayout({
  title,
  children,
  currentStep,
  isFinal = false,
}) {
  const router = useRouter();

  const prevStep =
    currentStep === 1 ? "/" : stepsData[currentStep - 2]?.path || "/planning";
  const nextStep = isFinal
    ? "/result"
    : stepsData[currentStep]?.path || "/planning";

  return (
    // <div className="max-w-3xl p-6 mx-auto">
    <div className="w-1/2 p-6 mx-auto ">
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

      {/* Navigation Buttons */}
      <NavigationButtons
        onBack={() =>
          currentStep === 1 ? router.push("/") : router.push(prevStep)
        }
        onNext={() => router.push(nextStep)}
        isFinal={isFinal}
        // isBackDisabled={currentStep === 1}
      />
    </div>
  );
}

import React from "react";

export default function ProgressBar({ steps, currentStep }) {
  return (
    <div className="flex w-full gap-2 mt-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 h-2 rounded ${
            index < currentStep ? "bg-primary" : "bg-neutralDarkLight"
          }`}
        />
      ))}
    </div>
  );
}

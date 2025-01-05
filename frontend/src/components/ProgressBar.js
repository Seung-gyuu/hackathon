import React from "react";
import { FaCheck } from "react-icons/fa6";

export default function ProgressBar({ steps, currentStep }) {
  return (
    <div className="relative flex items-center justify-between w-full ">
      <div className="absolute left-0 right-0 z-0 h-1 -translate-y-1/2 bg-gray-300 top-1/2" />

      <div
        className="absolute left-0 z-0 h-1 transition-all duration-300 -translate-y-1/2 bg-primary top-1/2"
        style={{
          // width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          width: `${
            ((currentStep - 1) / (steps.length - 1)) * 100 +
            100 / (steps.length - 1) / 2
          }%`,
        }}
      />

      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center w-full"
          style={{
            flex: 1,
          }}
        >
          <div
            className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold z-10 mt-6  ${
              index + 1 === currentStep
                ? "bg-primary text-white border-primary"
                : index + 1 < currentStep
                ? "bg-white text-primary border-primary"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            {index + 1 < currentStep ? (
              <FaCheck className="text-sm text-primary" />
            ) : (
              index + 1
            )}
          </div>

          <div
            className={`mt-2 text-sm ${
              index + 1 === currentStep
                ? "text-primary font-bold"
                : "text-gray-400"
            }`}
          >
            {step.label}
          </div>
        </div>
      ))}
    </div>
  );
}

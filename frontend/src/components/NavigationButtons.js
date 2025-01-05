import React from "react";
import Button from "./Button";

export default function NavigationButtons({
  onBack,
  onNext,
  onResults,
  isFinal = false,
  isNextDisabled = false,
}) {
  return (
    <div className="flex justify-between w-full gap-4 mt-8">
      <div className="flex items-center justify-between w-full gap-4 font-semibold">
        <button
          className="px-8 py-2 border-2 rounded-full cursor-pointer text-neutralDarkLight border-neutralDarkLight hover:border-neutralDark hover:text-neutralDark"
          onClick={onBack}
        >
          Back
        </button>

        <button
          className={`${
            isFinal
              ? "text-third border-third hover:bg-third hover:text-neutralLight"
              : "text-primary border-primary hover:bg-primary hover:text-neutralLight"
          } px-8 py-2 border-2 rounded-full cursor-pointer`}
          onClick={isFinal ? onResults : onNext}
          disabled={isNextDisabled}
        >
          {isFinal ? "Save and View Results" : "Next"}
        </button>
      </div>
    </div>
  );
}

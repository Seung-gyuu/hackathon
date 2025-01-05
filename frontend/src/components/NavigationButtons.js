import React from "react";
import Button from "./Button";

export default function NavigationButtons({
  onBack,
  onNext,
  onResults,
  isFinal = false,
  isBackDisabled = false,
  isNextDisabled = false, // ✅ 다음 버튼 비활성화 여부
}) {
  return (
    <div className="flex justify-between gap-4 mt-8">
      {/* Back Button */}
      <Button
        text="Back"
        color="neutralDarkLight"
        clickHandler={onBack}
        full
        disabled={isBackDisabled}
        font="geistSans"
      />

      {/* Next Button */}
      <Button
        text={isFinal ? "View Results" : "Next"}
        color={isFinal ? "third" : "primary"}
        clickHandler={isFinal ? onResults : onNext}
        full
        disabled={isNextDisabled}
        font="geistSans"
      />
    </div>
  );
}

import React from "react";
import Button from "./Button";

export default function NavigationButtons({
  onBack,
  onNext,
  onResults, // ✅ 결과 버튼 핸들러
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

      {/* Next / Save and View Results Button */}
      <Button
        text={isFinal ? "Save and View Results" : "Next"}
        color={isFinal ? "third" : "primary"}
        clickHandler={isFinal ? onResults : onNext} // ✅ 최종 페이지일 때 onResults 실행
        full
        disabled={isNextDisabled}
        font="geistSans"
      />
    </div>
  );
}

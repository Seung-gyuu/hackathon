import React from "react";
import Button from "./Button";

// export default function NavigationButtons({ onBack, onNext, isFinal }) {
//   return (
//     <div className="flex justify-between mt-8">
//       <Button text="Back" color="neutralDark" onClick={onBack} />
//       <Button
//         text={isFinal ? "View Results" : "Next"}
//         color="primary"
//         onClick={onNext}
//       />
//     </div>
//   );
// }

export default function NavigationButtons({
  onBack,
  onNext,
  isFinal = false,
  isBackDisabled = false,
}) {
  return (
    <div className="flex justify-between gap-4 mt-8">
      {/* Back Button */}
      <Button
        text="Back"
        color="neutralDarkLight"
        clickHandler={onBack}
        full
        // dark
        disabled={isBackDisabled}
        font="geistSans"
      />

      {/* Next Button */}
      <Button
        text={isFinal ? "View Results" : "Next"}
        color={isFinal ? "third" : "primary"}
        clickHandler={onNext}
        full
        dark={isFinal}
        font="geistSans"
      />
    </div>
  );
}

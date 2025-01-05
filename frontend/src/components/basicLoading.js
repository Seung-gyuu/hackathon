"use client";
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

// export default function BasicLoading({ delay = 1000 }) {
//   const [isVisible, setIsVisible] = useState(true); // 페이드 아웃 제어 상태

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false); // 최소 로딩 시간 이후 페이드 아웃
//     }, delay);

//     return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
//   }, [delay]);

//   return (
//     <div
//       className={`w-full h-full flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
//         isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div className="flex items-center justify-center">
//         <Spinner color="secondary" size="lg" />
//       </div>
//       <p className="mt-4 text-gray-500">Loading...</p>
//     </div>
//   );
// }

export default function BasicLoading({ delay = 1000 }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="flex items-center justify-center ">
        <Spinner color="secondary" size="lg" />
      </div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  );
}

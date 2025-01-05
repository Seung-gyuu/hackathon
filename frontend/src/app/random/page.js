"use client";
import { useState } from "react";
import Image from "next/image";
import testImage from "../../../public/img/random/activity-removebg-preview.png";
import testImage2 from "../../../public/img/random/shopping-removebg-preview.png";
import testImage3 from "../../../public/img/random/relax-removebg-preview.png";
import testImage4 from "../../../public/img/random/foody-removebg-preview.png";

export default function RandomPlanner() {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
  };

  return (
    <div className="flex flex-col items-center p-8 mt-20">
      <h2 className="mb-12 text-2xl font-bold text-black uppercase">
        Random Travel
      </h2>

      <div className="flex max-w-full gap-8 p-4 overflow-x-auto">
        {[1, 2, 3, 4].map((boxNumber) => (
          <div
            key={boxNumber}
            onClick={() => handleBoxClick(boxNumber)}
            className={`
                w-64 h-96 rounded-3xl cursor-pointer
                flex flex-col justify-between
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-xl
                border border-gray-700
                ${
                  selectedBox === boxNumber
                    ? "bg-gradient-to-b from-orange-400 to-purple-900 text-white"
                    : "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300"
                }
              `}
          >
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-xl font-semibold">Plan {boxNumber}</h3>
              <p className="text-sm opacity-80">
                {selectedBox === boxNumber
                  ? "Results will be displayed!"
                  : "Click to open"}
              </p>
              <div className="relative w-full h-48">
                <Image
                  src={
                    [testImage, testImage2, testImage3, testImage4][
                      boxNumber - 1
                    ]
                  }
                  alt="Random Travel Image"
                  fill
                  className={`object-cover rounded-lg ${
                    selectedBox === boxNumber ? "opacity-100" : "opacity-70"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between w-full p-4 border-t border-gray-700">
              <span className="text-sm opacity-70">✨</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

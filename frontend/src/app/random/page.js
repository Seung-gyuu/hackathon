// 사실상 사용안하는듯? 한번더 체크. random result는 ResultModal이라는 컴포넌트에 있음음

"use client";
import { useState, useEffect } from "react";
import PlanCard from "@/components/PlanCard";
import breakfastImage from "../../../public/img/result/breakfast-removebg-preview.png";
import dinnerImage from "../../../public/img/result/dinner-removebg-preview.png";
import hotspringImage from "../../../public/img/result/hotspring-removebg-preview.png";
import summerImage from "../../../public/img/result/summer-removebg-preview.png";
import winterImage from "../../../public/img/result/winter-removebg-preview.png";
import CountryFlag, { countryToCode } from "@/components/CountryFlag";

const originalImages = [
  breakfastImage,
  dinnerImage,
  hotspringImage,
  summerImage,
  winterImage,
];

export default function Result() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [shuffledImages, setShuffledImages] = useState(
    originalImages.slice(0, 3)
  );
  const [shuffledCountries, setShuffledCountries] = useState([]);

  useEffect(() => {
    const shuffledImgs = [...originalImages]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 3);

    const countries = Object.keys(countryToCode);
    const shuffledCtrs = [...countries]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 3);

    setShuffledImages(shuffledImgs);
    setShuffledCountries(shuffledCtrs);
  }, []);

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-8rem)]">
      <h2 className="text-2xl font-bold text-black uppercase">
        Your Travel Plan
      </h2>
      <div className="flex max-w-full gap-8 p-4 overflow-x-auto">
        {[1, 2, 3].map((boxNumber) => (
          <PlanCard
            key={boxNumber}
            number={boxNumber}
            isSelected={selectedBox === boxNumber}
            onClick={() => handleBoxClick(boxNumber)}
            showCursor={true}
            title="STOP"
            imageSrc={shuffledImages[boxNumber - 1]}
            subtitle={
              selectedBox === boxNumber ? (
                <CountryFlag countryName={shuffledCountries[boxNumber - 1]} />
              ) : (
                "Open"
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import PlanCard from "@/components/PlanCard";
import LoadingScreen from "@/components/LoadingScreen";
import ResultModal from "@/components/ResultModal";

import testImage from "../../../public/img/random/activity-removebg-preview.png";
import testImage2 from "../../../public/img/random/shopping-removebg-preview.png";
import testImage3 from "../../../public/img/random/relax-removebg-preview.png";
import testImage4 from "../../../public/img/random/foody-removebg-preview.png";

const originalImages = [testImage, testImage2, testImage3, testImage4];

export default function RandomPlanner() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [shuffledImages, setShuffledImages] = useState(originalImages);
  const [result, setResult] = useState(null); // JSON 객체로 저장
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const shuffled = [...originalImages]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setShuffledImages(shuffled);
  }, []);

  const handleBoxClick = async (boxNumber) => {
    setSelectedBox(boxNumber);
    setLoading(true);

    const type = shuffledImages[boxNumber - 1].src.includes("activity")
      ? "Adventure Seeker"
      : shuffledImages[boxNumber - 1].src.includes("foody")
      ? "Food Explorer"
      : shuffledImages[boxNumber - 1].src.includes("shopping")
      ? "Shopping Expert"
      : "Relaxation Lover";

    setSelectedType(type);

    try {
      const response = await fetch("/api/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      let parsedResult;
      try {
        // 불필요한 부분 제거 및 JSON 파싱
        parsedResult = JSON.parse(
          data.result
            .replace(/^```json/, "") // 시작 부분 제거
            .replace(/```$/, "") // 끝 부분 제거
            .trim()
        );

        setResult(parsedResult);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        setResult([]);
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setResult([]);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-8rem)]">
        <h2 className="text-2xl font-bold text-black uppercase">
          Random Travel
        </h2>
        <div className="flex max-w-full gap-8 p-4 overflow-x-auto">
          {[1, 2, 3, 4].map((boxNumber) => (
            <PlanCard
              key={boxNumber}
              number={boxNumber}
              isSelected={selectedBox === boxNumber}
              onClick={() => handleBoxClick(boxNumber)}
              imageSrc={shuffledImages[boxNumber - 1]}
              subtitle={
                shuffledImages[boxNumber - 1].src.includes("activity")
                  ? "Adventure Seeker"
                  : shuffledImages[boxNumber - 1].src.includes("foody")
                  ? "Food Explorer"
                  : shuffledImages[boxNumber - 1].src.includes("shopping")
                  ? "Shopping Expert"
                  : "Relaxation Lover"
              }
            />
          ))}
        </div>
      </div>
      {loading && <LoadingScreen />}
      {isModalOpen && result && (
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBox(null);
          }}
          result={result}
          type={selectedType}
        />
      )}
    </>
  );
}

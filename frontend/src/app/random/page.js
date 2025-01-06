"use client";
import { useState, useEffect } from "react";
import PlanCard from "@/components/PlanCard";
import LoadingScreen from "@/components/LoadingScreen";
import ResultModal from "@/components/ResultModal";
import RandomNavButtons from "@/components/RandomNavButton";

import activity from "../../../public/img/random/activity-removebg-preview.png";
import shopping from "../../../public/img/random/shopping-removebg-preview.png";
import relax from "../../../public/img/random/relax-removebg-preview.png";
import foody from "../../../public/img/random/foody-removebg-preview.png";
import breakfast from "../../../public/img/random/breakfast-removebg-preview.png";
import dinner from "../../../public/img/random/dinner-removebg-preview.png";
import hotspring from "../../../public/img/random/hotspring-removebg-preview.png";
import summer from "../../../public/img/random/summer-removebg-preview.png";
import winter from "../../../public/img/random/winter-removebg-preview.png";

const originalImages = [
  { type: "activity", image: activity },
  { type: "shopping", image: shopping },
  { type: "relax", image: relax },
  { type: "foody", image: foody },
  { type: "foody", image: breakfast },
  { type: "foody", image: dinner },
  { type: "relax", image: hotspring },
  { type: "relax", image: summer },
  { type: "relax", image: winter },
];

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

    const typeMap = {
      activity: "Thrill Seeker",
      foody: "Foodie",
      shopping: "Shopaholic",
      relax: "Chill Traveler",
    };
    const type =
      typeMap[shuffledImages[boxNumber - 1].type] || "Chill Traveler";
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

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-8rem)]">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-black uppercase mb-8">
            Random Travel
          </h2>

          <div className="flex flex-wrap justify-center gap-4 px-4 mb-8">
            {[1, 2, 3, 4].map((boxNumber) => (
              <PlanCard
                key={boxNumber}
                number={boxNumber}
                isSelected={selectedBox === boxNumber}
                onClick={() => handleBoxClick(boxNumber)}
                imageSrc={shuffledImages[boxNumber - 1].image}
                subtitle={
                  shuffledImages[boxNumber - 1].type === "activity"
                    ? "Adventure Seeker"
                    : shuffledImages[boxNumber - 1].type === "foody"
                    ? "Foodie"
                    : shuffledImages[boxNumber - 1].type === "shopping"
                    ? "Shopaholic"
                    : "Relaxation Lover"
                }
              />
            ))}
          </div>

          <div className="mb-8">
            <RandomNavButtons />
          </div>
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
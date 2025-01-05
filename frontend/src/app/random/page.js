"use client";
import { useState, useEffect } from "react";
import PlanCard from "@/components/PlanCard";
import LoadingScreen from "@/components/LoadingScreen";
import testImage from "../../../public/img/random/activity-removebg-preview.png";
import testImage2 from "../../../public/img/random/shopping-removebg-preview.png";
import testImage3 from "../../../public/img/random/relax-removebg-preview.png";
import testImage4 from "../../../public/img/random/foody-removebg-preview.png";

const originalImages = [testImage, testImage2, testImage3, testImage4];

const ResultModal = ({ isOpen, onClose, result, type }) => {
  if (!isOpen) return null;

  const parseResult = (text) => {
    try {
      if (!text || typeof text !== "string") {
        return { destination: "No destination available", itinerary: "" };
      }

       const destinationMatch = text.match(/- Destination:\s*([^\n]+)/);
       const itineraryMatch = text.match(/- Itinerary:\s*([\s\S]+)$/);
 
       // Extract destination and itinerary
       const destination = destinationMatch && destinationMatch[1] ? destinationMatch[1].trim() : "Unknown Destination";
       const itinerary = itineraryMatch && itineraryMatch[1] ? itineraryMatch[1].trim() : "No itinerary available";
 
       return { destination, itinerary };
     } catch (error) {
       console.error("Error parsing result:", error);
       return { destination: "Error parsing destination", itinerary: "" };
     }
   };
   const { destination, itinerary } = parseResult(result);
  
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary">{type}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h4 className="text-xl font-semibold text-gray-900">
              {destination} <br/> {itinerary}
            </h4>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary/90 font-medium"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default function RandomPlanner() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [shuffledImages, setShuffledImages] = useState(originalImages);
  const [result, setResult] = useState("");
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
      setTimeout(async () => {
        const response = await fetch("/api/random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type }),
        });
        const data = await response.json();
        setResult(data.result || "Failed to get recommendations.");
        setLoading(false);
        setIsModalOpen(true);
      }, 3000);
    } catch (error) {
      setResult("An error occurred. Please try again.");
      setLoading(false);
      setIsModalOpen(true);
      console.error("Error fetching travel plan:", error);
    }
  };

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
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBox(null);
        }}
        result={result}
        type={selectedType}
      />
    </>
  );
}

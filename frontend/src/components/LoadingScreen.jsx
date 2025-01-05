import { useState, useEffect } from "react";
import Image from "next/image";

const LoadingScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/img/loading/loading-barcelona.png",
    "/img/loading/loading-berlin.png",
    "/img/loading/loading-istanbul.png",
    "/img/loading/loading-london.png",
    "/img/loading/loading-paris.png",
    "/img/loading/loading-rome.png",
    "/img/loading/loading-seoul.png",
  ];

  const cities = [
    "Barcelona",
    "Berlin",
    "Istanbul",
    "London",
    "Paris",
    "Rome",
    "Seoul",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* Image Container */}
      <div className="relative w-96 h-96">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Loading ${cities[index]}`}
            fill
            className={`object-cover rounded-lg transition-opacity duration-1000
              ${currentImageIndex === index ? "opacity-100" : "opacity-0"}`}
            priority
          />
        ))}
      </div>

      {/* Text Container*/}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to {cities[currentImageIndex]}
        </h2>
        <p className="text-gray-600">Discovering amazing places...</p>
      </div>

      {/* Indicater */}
      <div className="mt-4 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 
              ${currentImageIndex === index ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;

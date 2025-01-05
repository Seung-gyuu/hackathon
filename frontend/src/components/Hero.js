"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { Fugaz_One } from "next/font/google";
import Link from "next/link";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  const variants = {
    variant1: {
      x: 0,
      y: -150,
      opacity: 0.3,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    rotateMove: {
      x: [0, 900], // 왼쪽 → 중간 → 오른쪽
      // y: [0, 50, -50], // 약간 위아래로 움직임
      y: [-150, -100, -180, -100, -150], // 아래 → 중간 → 위
      rotate: [0, 360], // 두 바퀴 회전
      opacity: [0.3, 0.8, 1], // 투명도 변화
      transition: {
        x: { duration: 1.5, ease: "easeInOut" },
        y: { duration: 1.5, ease: "easeInOut" },
        rotate: { duration: 1.5, ease: "linear" },
        opacity: { duration: 1.5, ease: "easeInOut" },
        repeat: Infinity, // 무한 반복
        repeatType: "loop",
      },
    },
  };

  return (
    // <div className="relative flex items-center justify-center w-full h-[calc(100vh-8rem)] overflow-hidden text-center container">
    <div className="relative flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)] px-4 md:px-8 lg:px-16 ">
      {/* <div className="absolute w-1/3 rounded-full opacity-40 left-28 top-1/3 h-1/4 bg-primary blur-3xl -z-10"></div> */}
      {/* <div className="absolute w-1/3 rounded-full opacity-30 right-28 top-1/2 h-1/4 bg-secondary blur-3xl -z-10"></div> */}

      <div className="absolute bottom-0 w-full -translate-x-1/2 opacity-80 -translate-y-1/3 h-1/2 -z-10 left-1/2">
        <Image
          // src="/images/travel-5.png"
          src="/images/travel-7.png"
          alt="Left Travel Image"
          fill
          objectFit="contain"
          className="object-cover opacity-50"
        />
      </div>
      {/* Motion Animation */}
      <motion.div
        className="absolute inset-0 w-[6rem] -z-10"
        variants={variants}
        initial="variant1"
        animate="rotateMove"
      >
        <Image
          src="/images/travel-3.png"
          alt="Left Travel Image"
          fill
          objectFit="contain"
          className="object-cover opacity-70"
        />
      </motion.div>

      {/* mid contents */}
      <h1 className="mb-4 text-5xl font-bold md:text-6xl text-neutralDark">
        Your Next Stop, <span className="text-primary">Guided by AI</span>
      </h1>

      <p className="max-w-2xl mb-8 text-lg md:text-xl text-neutralDark/80">
        Plan smarter, travel further, and discover your perfect destinations
        with AI-powered recommendations.
      </p>

      <div className="flex gap-4 mb-12">
        <Link
          href="/planning"
          className="px-8 py-3 text-lg text-white transition shadow-md rounded-3xl bg-primary hover:bg-primaryDark"
        >
          Plan My Trip
        </Link>
        <Link
          href="/random"
          className="px-8 py-3 text-lg transition border-2 shadow-md rounded-3xl text-primary border-primary hover:bg-primary hover:text-white"
        >
          Surprise Me
        </Link>
      </div>
    </div>
    // </div>
    // </div>
  );
}

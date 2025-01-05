"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  const variants = {
    variant1: {
      x: 400,
      y: -100,
      opacity: 0.3,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
    rotateMove: {
      x: [400, 900], // 왼쪽 → 중간 → 오른쪽
      // y: [0, 50, -50], // 약간 위아래로 움직임
      y: [-100, 50, -120, 0, -150], // 아래 → 중간 → 위
      rotate: [0, 360, 720], // 두 바퀴 회전
      opacity: [0.3, 0.8, 1], // 투명도 변화
      transition: {
        x: { duration: 1.5, ease: "easeInOut" },
        y: { duration: 1.5, ease: "easeInOut" },
        rotate: { duration: 1.5, ease: "linear" },
        // scale: [1, 1.5, 2],
        opacity: { duration: 1.5, ease: "easeInOut" },
        repeat: Infinity, // 무한 반복
        repeatType: "loop",
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden text-center">
      {/* <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden text-center md:flex-row"> */}

      <div
        className="absolute w-1/4 rounded-full opacity-40 left-28 top-1/3 h-1/4 bg-primary blur-3xl -z-10"
        variants={variants}
        animate="blobExpand"
      ></div>

      <div
        className="absolute w-1/4 rounded-full opacity-30 right-28 top-1/2 h-1/4 bg-primary blur-3xl -z-10"
        variants={variants}
        animate="blobExpand"
      ></div>

      {/* Motion Animation */}
      <motion.div
        className="absolute inset-0 w-1/6 h-full -z-10"
        variants={variants}
        initial="variant1"
        // animate="variant2"
        animate="rotateMove"
      >
        <Image
          src="/images/travel-13.png"
          alt="Left Travel Image"
          fill
          objectFit="contain"
          className="object-cover opacity-70"
        />
      </motion.div>

      {/* mid contents */}
      <div className="flex flex-col items-center w-full lg:flex-row">
        <div className="relative z-10 flex flex-col items-center justify-center w-full rounded-xl">
          {/* Heading */}
          <h1
            className={`text-[5rem] font-bold text-neutralDark ${fugaz.className}`}
          >
            NEXT STOP,
          </h1>

          {/* Sub */}
          <div className="w-full my-6">
            <h2
              // className={`text-3xl font-semibold text-neutralDark ${fugaz.className}`}
              className="text-3xl font-bold text-neutralDark/80"
            >
              Your Perfect Getaway
            </h2>
            <p
              // className={`mt-2 text-lg text-neutralDark opacity-70 ${fugaz.className}`}
              className="mt-1 text-md text-neutralDark/80 "
            >
              Plan Smart, Travel Freely, Made by Your Choice
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col items-center justify-center w-3/5 w-full gap-8 mt-8 sm:flex-row">
          <Button
            text="Planning Trip"
            color="neutralDark"
            dark={false}
            font="fugaz"
            href="/planning/purpose"
          />
          <Button
            text="Random Trip"
            color="neutralDark"
            dark={false}
            font="fugaz"
            href="/random"
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

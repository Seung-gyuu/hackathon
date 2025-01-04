import { Fugaz_One } from "next/font/google";
import Image from "next/image";
import Button from "./Button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4 relative overflow-hidden min-h-screen">
      {/* 1. Map w route */}
      {/* <div className="absolute top-16 left-24 w-full h-full">
        <Image
          src="/images/travel-7.png"
          alt="Left Travel Image"
          layout="fill"
          objectFit="contain"
          className="object-cover filter grayscale opacity-50"
          priority
        />
      </div> */}

      {/* 2. planes w dot line */}
      <div className="absolute top-0 left-24 w-full h-screen">
        <Image
          src="/images/travel-9.png"
          alt="Left Travel Image"
          layout="fill"
          objectFit="contain"
          className="object-cover filter grayscale opacity-20"
          priority
        />
      </div>

      {/* 3. Direction Sign */}
      {/* <div className="absolute top-6 left-44 w-1/3 h-full transform -rotate-12">
        <Image
          src="/images/travel-11.png"
          alt="Left Travel Image"
          layout="fill"
          objectFit="contain"
          className="object-cover filter grayscale opacity-50"
          priority
        />
      </div> */}

      {/* 4. Airplane */}
      {/* <div className="absolute top-10 right-16 w-1/4 h-full opacity-40 transform -rotate-12">
        <Image
          src="/images/travel-1.png"
          alt="Right Travel Image"
          layout="fill"
          objectFit="contain"
          className="object-cover filter grayscale"
          priority
        />
      </div> */}

      {/* mid contents */}
      <div className="w-full relative z-10 rounded-xl px-8 py-12 max-w-3xl flex flex-col  items-center justify-center">
        {/* Heading */}
        <h1
          className={`text-[5rem] font-bold text-neutralDark ${fugaz.className}`}
        >
          NEXT STOP,
        </h1>

        {/* Sub */}
        <div className="my-6 w-full">
          <h2 className="text-3xl font-semibold text-neutralDark">
            Your Perfect Getaway
          </h2>
          <p className="text-lg text-neutralDark opacity-70 mt-2">
            Plan Smart, Travel Freely, Made by Your Choice
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8 w-3/5">
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
          />
        </div>
      </div>
    </div>
  );
}

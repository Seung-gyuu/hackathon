import { Fugaz_One } from "next/font/google";
import Image from "next/image";
import Button from "./Button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full px-4 overflow-hidden text-center">
      {/* 1. Map w route */}
      {/* <div className="absolute w-full h-full top-16 left-24">
        <Image
          src="/images/travel-7.png"
          alt="Left Travel Image"
          layout="fill"
          objectFit="contain"
          className="object-cover opacity-50 filter grayscale"
          priority
        />
      </div> */}

      {/* 2. planes w dot line */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden -z-10">
        <Image
          src="/images/travel-9.png"
          alt="Background Image"
          layout="fill"
          objectFit="contain"
          className="object-cover filter grayscale opacity-20"
          priority
        />
      </div>

      {/* 3. Direction Sign */}
      {/* <div className="absolute w-1/3 h-full transform top-6 left-44 -rotate-12">
        <Image
          src="/images/travel-11.png"
          alt="Left Travel Image"
          layout="fill"
          objectFit="contain"
          className="object-cover opacity-50 filter grayscale"
          priority
        />
      </div> */}

      {/* 4. Airplane */}
      {/* <div className="absolute w-1/4 h-full transform top-10 right-16 opacity-40 -rotate-12">
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

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center w-3/5 gap-8 mt-8 sm:flex-row">
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
    </div>
  );
}

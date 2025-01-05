import { Fugaz_One } from "next/font/google";
import Link from "next/link";
import React from "react";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Button({
  text,
  color = "primary",
  dark = false,
  full = false,
  font = "fugaz",
  clickHandler,
  href,
}) {
  const fontStyles = {
    geistSans: "var(--font-geist-sans)",
    geistMono: "var(--font-geist-mono)",
    fugaz: fugaz.className,
  };

  const colorStyles = {
    primary: dark
      ? "bg-primary text-neutralLight border-primary hover:bg-neutralLight hover:text-primary"
      : "bg-neutralLight text-primary border-primary hover:bg-primary hover:text-neutralLight",
    secondary: dark
      ? "bg-secondary text-neutralDark border-secondary hover:bg-neutralLight hover:text-secondary"
      : "bg-neutralLight text-secondary border-secondary hover:bg-secondary hover:text-neutralDark",
    third: dark
      ? "bg-third text-neutralLight border-third hover:bg-neutralLight hover:text-third"
      : "bg-neutralLight text-third border-third hover:bg-third hover:text-neutralLight",
    neutralDark: dark
      ? "bg-neutralDark text-neutralLight border-neutralDark hover:bg-neutralLight hover:text-neutralDark"
      : "bg-neutralLight text-neutralDark border-neutralDark hover:bg-neutralDark hover:text-neutralLight",
    neutralDarkLight: dark
      ? "bg-neutralDarkLight text-neutralLight border-neutralDarkLight hover:bg-neutralLight hover:text-neutralDarkLight"
      : "bg-neutralLight text-neutralDarkLight border-neutralDarkLight hover:bg-neutralDarkLight hover:text-neutralLight",
  };

  const buttonClass = `
    rounded-2xl overflow-hidden duration-200 border-2 border-solid
    text-center flex items-center justify-center px-6 py-2 text-lg font-bold break-words
    ${fontStyles[font]} ${colorStyles[color]}
    ${full ? "w-full" : "w-auto"}
  `;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={clickHandler} className={buttonClass}>
      {text}
    </button>
  );
}

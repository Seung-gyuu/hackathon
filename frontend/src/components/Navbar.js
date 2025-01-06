import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center w-full h-16 bg-white ">
      <div className="container flex items-center justify-left px-4 mx-auto md:px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="relative w-20 h-20 cursor-pointer md:w-24 md:h-24"
        >
          <Image
            src="/logo-1.png"
            alt="Next Stop Logo"
            fill
            objectFit="contain"
            className="object-cover"
            priority
          />
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import siteLogo from "../../public/img/logo/site-logo-st.png";

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center -ml-16">
            <Image
              src={siteLogo}
              alt="Site Logo"
              className="h-64 w-auto"
              priority
            />
          </Link>

          {/* Navigation Menu */}
          {/* <div className="hidden sm:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

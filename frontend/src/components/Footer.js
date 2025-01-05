import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center w-full h-16 bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 mx-auto md:px-6">
        <div className="text-sm text-neutralDark/80">Brain Bubbles © 2025</div>

        <div className="flex items-center gap-8">
          <a
            href="https://github.com/Euna-kim-1/hackathon-web/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 cursor-pointer hover:text-neutralDark"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/dev_bbbles/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 cursor-pointer hover:text-neutralDark"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/company/katec2024/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 cursor-pointer hover:text-neutralDark"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

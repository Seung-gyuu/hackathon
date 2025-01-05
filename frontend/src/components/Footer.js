import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex items-center justify-between w-full h-16 px-6 md:h-20 text-neutralDark/80">
      <div className="text-sm ">Brain Bubbles © 2025</div>

      <div className="flex items-center gap-8 ">
        <a
          href="https://github.com/Euna-kim-1/hackathon-web/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-200 cursor-pointer hover:text-neutralDark"
        >
          <FaGithub className="w-5 h-5 " />
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
  );
}

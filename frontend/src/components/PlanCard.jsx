import Image from "next/image";

export default function PlanCard({
  number,
  isSelected,
  onClick,
  imageSrc,
  title = "TYPE",
  subtitle,
  showCursor = true,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        w-64 h-96 rounded-3xl ${showCursor ? "cursor-pointer" : ""}
        flex flex-col justify-between
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-xl
        
        ${
          isSelected
            ? "bg-gradient-to-b from-orange-400 bg-primary text-white"
            : "bg-gradient-to-b bg-neutralDarkLight text-gray-700"
        }
      `}
    >
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg text-center font-semibold">
          {title} {number}
        </h3>
        <div className="text-xl uppercase font-bold text-center mt-2">
          {subtitle}
        </div>
        <div className="relative w-full h-60">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={`${title} Image`}
              fill
              className="object-cover rounded-lg -mt-6"
            />
          )}
        </div>
        <p className="text-md text-center opacity-80 -mt-12">
          {imageSrc?.src.includes("relax") && "Perfect time for healing"}
          {imageSrc?.src.includes("foody") && "Discover amazing local cuisine"}
          {imageSrc?.src.includes("shopping") && "Experience shopping paradise"}
          {imageSrc?.src.includes("activity") && "Exciting adventures await"}
        </p>
      </div>

      <div className="flex items-center justify-between w-full p-4 border-t border-gray-400">
        <span className="text-md">✨</span>
      </div>
    </div>
  );
}

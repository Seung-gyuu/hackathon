import React from "react";

export default function SelectionItem({
  title,
  img,
  icon,
  onSelect,
  isSelected,
}) {
  return (
    <div
      className={`p-4 border-2 shadow-md cursor-pointer w-full h-full rounded-xl flex items-center justify-center flex-col ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-neutralDarkLight/40 hover:bg-neutralDarkLight/10"
      }
      `}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <img
            src={icon}
            alt="icon"
            className="object-contain w-8 h-8 mx-auto "
          />
        )}

        <p className="text-center">{title}</p>
      </div>

      {img && (
        <img
          src={img}
          alt="Select Image"
          className="object-contain w-20 h-20 mx-auto my-4"
        />
      )}
    </div>
  );
}

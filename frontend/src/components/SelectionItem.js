import React from "react";

export default function SelectionItem({
  title,
  description,
  onSelect,
  isSelected,
}) {
  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer ${
        isSelected ? "border-primary bg-primary/10" : "border-neutralDarkLight"
      }`}
      onClick={onSelect}
    >
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-neutralDarkLight">{description}</p>
    </div>
  );
}

"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { companionData } from "@/data/planningData";
import { useState } from "react";

export default function Companion() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout title="Who Are You Traveling With?" currentStep={6}>
      <div className="grid grid-cols-2 gap-4">
        {companionData.map((item) => (
          <SelectionItem
            key={item.id}
            title={item.title}
            description={item.description}
            isSelected={selected === item.id}
            onSelect={() => setSelected(item.id)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}

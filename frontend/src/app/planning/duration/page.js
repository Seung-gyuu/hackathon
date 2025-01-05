"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { durationData } from "@/data/planningData";
import { useState } from "react";

export default function Duration() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout title="How Long is Your Trip?" currentStep={5}>
      <div className="grid grid-cols-2 gap-4">
        {durationData.map((item) => (
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

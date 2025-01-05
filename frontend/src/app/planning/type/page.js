"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useState } from "react";
import { styleData } from "@/data/planningData";

export default function Type() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout title="What is Your Travel Style?" currentStep={2}>
      <div className="grid grid-cols-2 gap-4">
        {styleData.map((item) => (
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

"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { purposeData } from "@/data/planningData";
import { useState } from "react";

export default function Purpose() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout title="What is Your Travel Purpose?" currentStep={1}>
      <div className="grid grid-cols-2 gap-4">
        {purposeData.map((item) => (
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

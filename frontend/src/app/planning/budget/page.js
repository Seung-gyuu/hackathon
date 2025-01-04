"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { budgetData } from "@/data/planningData";
import { useState } from "react";

export default function Budget() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout title="Select Your Budget Range" currentStep={4}>
      <div className="grid grid-cols-2 gap-4">
        {budgetData.map((item) => (
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

"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { activitiesData } from "@/data/planningData";
import { useState } from "react";

export default function Activities() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout
      title="Select Your Activities"
      currentStep={7}
      isFinal={true}
    >
      <div className="grid grid-cols-2 gap-4">
        {activitiesData.map((item) => (
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

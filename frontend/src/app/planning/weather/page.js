"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { weatherData } from "@/data/planningData";
import { useState } from "react";

export default function Weather() {
  const [selected, setSelected] = useState(null);

  return (
    <PlanningLayout title="Select Your Preferred Weather" currentStep={3}>
      <div className="grid grid-cols-2 gap-4">
        {weatherData.map((item) => (
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

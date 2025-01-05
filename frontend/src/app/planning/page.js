"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PlanningPage() {
  const router = useRouter();

  // const pathname = usePathname();

  // useEffect(() => {
  //   // 경로가 '/planning'을 벗어날 때 실행
  //   if (!pathname.startsWith("/planning")) {
  //     const keysToClear = [
  //       "selectedPurpose",
  //       "selectedStyle",
  //       "selectedActivities",
  //       "selectedBudget",
  //       "selectedClimate",
  //       "selectedCompanion",
  //       "selectedDuration",
  //     ];
  //     keysToClear.forEach((key) => localStorage.removeItem(key));
  //     console.log("All planning-related localStorage keys have been cleared");
  //   }
  // }, [pathname]);

  useEffect(() => {
    router.push("/planning/purpose");
  }, [router]);

  return;
}

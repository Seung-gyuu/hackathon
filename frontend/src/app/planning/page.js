// "use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlanningPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/planning/purpose");
  }, [router]);

  return null;
}

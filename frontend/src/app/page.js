"use client";
import RandomPlanner from "@/components/RandomPlanner";
import NavBar from "@/components/NavBar";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main>
      <NavBar />
      <LoadingScreen />
      {/* <RandomPlanner /> */}
    </main>
  );
}

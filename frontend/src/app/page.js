"use client";
<<<<<<< HEAD
import RandomPlanner from "@/components/RandomPlanner";
import NavBar from "@/components/NavBar";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main>
      <NavBar />
      <LoadingScreen />
      {/* <RandomPlanner /> */}
=======
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-8rem)]">
      <Hero />
>>>>>>> 8d0f99749d31b5f5544f5956ed065b5faaa42d7c
    </main>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";

export default function BasicLoading({ delay = 1000 }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="flex items-center justify-center ">
        <Spinner color="secondary" size="lg" />
      </div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  );
}

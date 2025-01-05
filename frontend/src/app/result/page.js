"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      const docID = "9DFq1dRsAXhyd9o8RbOk"; 

      try {
        
        const response = await fetch(`http://localhost:3001/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docID }), 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data = await response.json();
        setResult(data.result); 
      } catch (error) {
        console.error("Error fetching result:", error);
        setResult("Failed to load result.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []); 

  return (
    <div className="p-4">
      <h1 className="text-black text-xl font-bold mb-4">Result Page</h1>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="text-black">{result}</div> 
      )}
    </div>
  );
}

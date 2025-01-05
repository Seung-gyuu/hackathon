"use client";

import React, { useState, useEffect } from "react";

export default function TravelQuestionnaire() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionKeys = [
          "activities",
          "budget",
          "climate",
          "companion",
          "travel_duration",
          "travel_purpose",
          "travel_style",
        ];

        const questionsData = await Promise.all(
          questionKeys.map(async (key) => {
            const response = await fetch(
              `http://localhost:3001/api/get-options/${key}`
            );
            if (!response.ok) {
              const errorData = await response.json();
              console.error(`Error for question ${key}:`, errorData.error);
              throw new Error(`Failed to fetch options for question: ${key}`);
            }
            const data = await response.json();
            return { questionKey: key, ...data };
          })
        );

        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Questionnaire complete!");
      console.log("Final Answers before saving:", updatedAnswers);

      const questionKeys = questions.map((q) => q.questionKey);
      const finalAnswers = questionKeys.reduce((acc, key, index) => {
        acc[key] = updatedAnswers[index] || "Not provided";
        return acc;
      }, {});

      console.log("Final Answers for saving:", finalAnswers);

      try {
        const response = await fetch("http://localhost:3001/api/save-answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: finalAnswers,
          }),
        });

        if (response.ok) {
          alert("Answers saved successfully!");
          const data = await response.json();
          console.log("Response from server:", data);
        } else {
          console.error("Failed to save answers:", await response.text());
        }
      } catch (error) {
        console.error("Error saving answers:", error);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Loading question...</p>;
  }

  return (
    <div>
      <h1>{currentQuestion.question}</h1>
      <ul>
        {currentQuestion.options.map((option, idx) => (
          <li
            key={idx}
            onClick={() => handleAnswer(option)}
            style={{ cursor: "pointer" }}
          >
            {option}
          </li>
        ))}
      </ul>
      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
    </div>
  );
}
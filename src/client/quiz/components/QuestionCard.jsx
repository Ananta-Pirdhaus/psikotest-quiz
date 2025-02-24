import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faExchangeAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../assets/logo.png";
import LogoUnesa from "../../../assets/logo-unesa.jpg";
import SaveJawaban from "./SaveJawaban";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const QuestionCard = ({
  question,
  selectedAnswers,
  handleAnswerOptionClick,
  handleNextQuestion,
  handlePrevQuestion,
  totalQuestions,
  IdSession,
  quizType,
  handleChangeQuizType,
  isLastQuestionAnswered,
  currentPage,
  isAnswered,
  handleCorrectAnswer,
}) => {
  console.log("isAnswered", isAnswered);
  const [selectedAnswerIDs, setSelectedAnswerIDs] = useState(
    selectedAnswers ?? (question.type === "Multiple" ? [] : null)
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // State for tracking submission
  const [currentQuestionId, setCurrentQuestionId] = useState(question.id);
  const answeredOptionIds = question.answers.map((ans) => ans.option_id);

  useEffect(() => {
    setSelectedAnswerIDs(selectedAnswers);
  }, [selectedAnswers]);

  useEffect(() => {
    if (question.type === "Multiple" && question.id !== currentQuestionId) {
      setSelectedAnswerIDs([]); // Reset selected answers for Multiple type
    }
    setCurrentQuestionId(question.id); // Update the current question id
  }, [question.id, currentQuestionId, question.type]);

  const handleAnswerClick = (id) => {
    const isMultiple = question.type === "Multiple";
    let updatedAnswers;

    if (Array.isArray(selectedAnswerIDs)) {
      if (isMultiple) {
        updatedAnswers = selectedAnswerIDs.includes(id)
          ? selectedAnswerIDs.filter((answerID) => answerID !== id)
          : [...selectedAnswerIDs, id];
      } else {
        updatedAnswers = id;
      }

      setSelectedAnswerIDs(updatedAnswers); // Update local state
      handleAnswerOptionClick(updatedAnswers); // Pass the updated answer back to App.js
    } else {
      updatedAnswers = [id];
      setSelectedAnswerIDs(updatedAnswers);
      handleAnswerOptionClick(updatedAnswers);
    }
  };

  const handleSubmitAnswers = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false); // After submission
    }, 2000); // Simulating submission time
  };

  const progressPercentage =
    totalQuestions > 1 ? ((currentPage - 1) / (totalQuestions - 1)) * 100 : 0;

  const handleSwitchQuizType = () => {
    if (isLastQuestionAnswered) {
      handleChangeQuizType(); // Switch quiz type
    } else {
      alert("Please answer the last question before switching quiz type.");
    }
  };

  const correctAnswers =
    question.options.filter((answerOption) =>
      answeredOptionIds.includes(answerOption.id)
    ).length > 0;

  // Pastikan useEffect selalu dijalankan dengan jumlah yang sama dalam setiap render
  useEffect(() => {
    if (correctAnswers) {
      handleCorrectAnswer(true);
    }
  }, [correctAnswers, handleCorrectAnswer]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-md shadow sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
          {/* Logo Section */}
          <div className="flex space-x-2 items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl"
            />
            <img
              src={LogoUnesa}
              alt="Logo Unesa"
              className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl"
            />
          </div>

          {/* Quiz Info & Progress Section */}
          <div className="w-full flex flex-col items-center sm:items-end justify-end h-auto sm:h-32 text-center sm:text-right">
            <div className="mb-2">
              <span className="text-sm font-semibold py-1 px-3 uppercase rounded-full text-blue-600 bg-blue-200">
                Quiz Type: {quizType}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full sm:w-1/2">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  Progress
                </span>
                <span className="text-xs sm:text-sm font-semibold py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3">
                <div
                  className="bg-orange-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Question Indicator */}
            <h2 className="text-lg sm:text-xl font-bold leading-none text-gray-900 mt-3 sm:mt-4">
              Question {currentPage} of {totalQuestions}
            </h2>
          </div>
        </div>

        <div className="flow-root">
          <hr className="border-gray-200 sm:mx-auto" />
          <div className="px-4">
            <p className="my-6 font-semibold text-gray-700 text-lg">
              {question.question}
            </p>
            {question.options.map((answerOption) => {
              const isSelected =
                selectedAnswerIDs?.includes(answerOption.id) ||
                answeredOptionIds.includes(answerOption.id);

              return (
                <button
                  key={answerOption.id}
                  onClick={() => handleAnswerClick(answerOption.id)}
                  className={`w-full text-left font-semibold text-gray-900 ${
                    isSelected
                      ? "bg-yellow-300 border border-yellow-400"
                      : "border border-orange-600 hover:bg-orange-500"
                  } focus:outline-none hover:bg-yellow-300 rounded-md text-base px-5 py-2.5 mr-2 mb-2`}
                >
                  {answerOption.answer}
                </button>
              );
            })}
            <div className="flex flex-wrap justify-center gap-4 p-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevQuestion}
                className="flex items-center gap-2 text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-medium rounded-md text-md px-5 py-2.5"
              >
                <FontAwesomeIcon icon={faAnglesLeft} /> Sebelumnya
              </button>

              {/* Render button based on conditions */}
              {quizType === "Single" && isLastQuestionAnswered ? (
                <button
                  onClick={handleSwitchQuizType}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-medium rounded-md text-md px-5 py-2.5"
                >
                  <FontAwesomeIcon icon={faExchangeAlt} /> Switch to{" "}
                  {quizType === "Single" ? "Multiple" : "Single"} Type
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-medium rounded-md text-md px-5 py-2.5"
                >
                  Selanjutnya <FontAwesomeIcon icon={faAnglesRight} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          {quizType === "Multiple" && isLastQuestionAnswered && (
            <button
              onClick={handleSubmitAnswers}
              className="flex items-center gap-2 text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-7 py-2.5 mr-6 mb-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Submit All Answers
                </>
              )}
            </button>
          )}
        </div>

        <SaveJawaban
          selectedAnswer={selectedAnswerIDs}
          IdSession={IdSession}
          questionId={question.id}
          BASE_URL={BASE_URL}
          isSubmitting={isSubmitting}
          quizType={quizType}
        />
      </div>
    </div>
  );
};

export default QuestionCard;

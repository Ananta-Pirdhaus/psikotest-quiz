import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
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
}) => {
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

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-md shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <img src={Logo} alt="Logo" className="w-16 h-16 rounded-xl" />
            <img
              src={LogoUnesa}
              alt="Logo Unesa"
              className="w-16 h-16 rounded-xl"
            />
          </div>
          <div className="w-full flex flex-col items-end justify-end h-32">
            <div className="mb-2">
              <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Quiz Type: {quizType}
              </span>
            </div>
            <div className="relative w-1/2">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  Progress
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 sm:h-4">
                <div
                  className="bg-orange-500 h-2 sm:h-4 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-xl font-bold leading-none text-gray-900 mt-4">
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
                answeredOptionIds.includes(answerOption.id); // Cek apakah opsi ini sudah dijawab
              const isCorrectAnswer = answeredOptionIds.includes(
                answerOption.id
              ); // Jika sudah dijawab, beri gaya khusus

              return (
                <button
                  key={answerOption.id}
                  onClick={() => handleAnswerClick(answerOption.id)}
                  className={`w-full text-left font-semibold text-gray-900 ${
                    isSelected || isCorrectAnswer
                      ? "bg-yellow-100 border border-yellow-400"
                      : "border border-orange-600 hover:bg-orange-600"
                  } focus:outline-none hover:bg-yellow-200 rounded-md text-base px-5 py-2.5 mr-2 mb-2`}
                >
                  {answerOption.answer}
                </button>
              );
            })}

            <div className="flex justify-center p-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevQuestion}
                className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-md text-md px-5 py-2.5 mr-6 mb-2"
              >
                <FontAwesomeIcon icon={faAnglesLeft} /> Sebelumnya
              </button>

              {/* Render button based on conditions */}
              {quizType === "Single" && isLastQuestionAnswered ? (
                <button
                  onClick={handleSwitchQuizType}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-md px-5 py-2.5 mb-2"
                >
                  Switch to {quizType === "Single" ? "Multiple" : "Single"} Type
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-md text-md px-5 py-2.5 mb-2"
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
              className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-7 py-2.5 mr-6 mb-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit All Answers"}
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

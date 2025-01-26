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
  handleScoreQuiz,
  handleClearAnswers,
  currentQuestionNumber,
  totalQuestions,
  IdSession,
  selectedAnswerID,
  quizType,
  handleChangeQuizType,
  isLastQuestionAnswered,
}) => {
  console.log("handleChangeQuizType:", isLastQuestionAnswered);

  const [selectedAnswerIDs, setSelectedAnswerIDs] = useState(
    selectedAnswers ?? (question.type === "Multiple" ? [] : null)
  );

  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk melacak proses submit

  useEffect(() => {
    setSelectedAnswerIDs(selectedAnswers);
  }, [selectedAnswers]);

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

      setSelectedAnswerIDs(updatedAnswers);
      handleAnswerOptionClick(updatedAnswers);
    } else {
      updatedAnswers = [id];
      setSelectedAnswerIDs(updatedAnswers);
      handleAnswerOptionClick(id);
    }
  };

  const handleSubmitAnswers = () => {
    // Mulai proses submit
    setIsSubmitting(true);

    // Proses ini akan diteruskan ke komponen SaveJawaban
    setTimeout(() => {
      setIsSubmitting(false); // Setelah pengiriman selesai
    }, 2000); // Simulasi waktu pengiriman
  };

  const progressPercentage =
    totalQuestions > 1
      ? ((currentQuestionNumber - 1) / (totalQuestions - 1)) * 100
      : 0;

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
              Question {currentQuestionNumber} of {totalQuestions}
            </h2>
          </div>
        </div>
        <div className="flow-root">
          <hr className="border-gray-200 sm:mx-auto" />
          <div className="px-4">
            <p className="my-6 font-semibold text-gray-700 text-lg">
              {question.question}
            </p>
            {question.options.map((answerOption) => (
              <button
                key={answerOption.id}
                onClick={() => handleAnswerClick(answerOption.id)}
                className={`w-full text-left font-semibold text-gray-900 ${
                  selectedAnswerIDs?.includes(answerOption.id) ||
                  answerOption.id === selectedAnswerID
                    ? "bg-yellow-100 border border-yellow-400"
                    : "border border-orange-600 hover:bg-orange-600"
                } focus:outline-none hover:bg-yellow-200 rounded-md text-base px-5 py-2.5 mr-2 mb-2`}
              >
                {answerOption.answer}
              </button>
            ))}

            <div className="flex justify-center p-4">
              {/* Tombol Sebelumnya */}
              <button
                onClick={handlePrevQuestion}
                className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-md text-md px-5 py-2.5 mr-6 mb-2"
              >
                <FontAwesomeIcon icon={faAnglesLeft} /> Sebelumnya
              </button>

              {/* Render tombol sesuai kondisi */}
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
          <button
            onClick={handleSubmitAnswers}
            className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-7 py-2.5 mr-6 mb-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit All Answers"}
          </button>
          <button
            onClick={handleClearAnswers}
            className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
          >
            Clear My Answers
          </button>
        </div>
      </div>
      <SaveJawaban
        selectedAnswer={selectedAnswerIDs}
        IdSession={IdSession}
        questionId={question.id}
        BASE_URL={BASE_URL}
        isSubmitting={isSubmitting} // Status pengiriman diteruskan ke SaveJawaban
      />
    </div>
  );
};

export default QuestionCard;

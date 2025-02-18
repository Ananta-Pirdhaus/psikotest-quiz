import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SurveiCard({ questions, sessionId, baseUrl }) {
  console.log("data questionnya: ", questions);
  const navigate = useNavigate();

  // State to store answers for each question
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = { selectedAnswer: "", textAnswer: "" };
      return acc;
    }, {})
  );
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Function to handle scale answer selection
  const handleScaleSelection = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { ...prevAnswers[questionId], selectedAnswer: answer },
    }));
  };

  // Function to handle text answer change
  const handleTextChange = (questionId, e) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { ...prevAnswers[questionId], textAnswer: e.target.value },
    }));
  };

  // Function to collect all answers and save them at once
  const handleSaveAnswers = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(""); // Menghapus state successMessage

    // Siapkan body permintaan
    const requestBody = questions.map((question) => {
      const { selectedAnswer, textAnswer } = answers[question.id];
      const answer = question.type === "Scale" ? selectedAnswer : textAnswer;
      return { question: question.id, answer };
    });

    try {
      // Mengirim permintaan POST ke server
      const response = await axios.post(
        `${baseUrl}jawaban-survei/${sessionId}`,
        requestBody
      );

      if (response.status === 200) {
        // Menampilkan pemberitahuan sukses dengan Toastify
        toast.success("Jawaban berhasil disimpan!");
        navigate(`/hasil-quiz/${sessionId}`);
      }
    } catch (err) {
      // Menampilkan pemberitahuan error dengan Toastify
      toast.error("Gagal menyimpan jawaban. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {questions.map((question) => {
        const surveyType = question.type;

        return (
          <div key={question.id} className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              {/* Left side: Question */}
              <div className="flex-1 pr-4 mb-4 sm:mb-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 break-words">
                  {question.question}
                </h2>
              </div>

              {/* Right side: Answer Options */}
              {surveyType === "Scale" && (
                <div className="flex flex-col items-center space-y-2 w-full sm:w-1/2">
                  <p className="text-lg text-gray-700">Pilih jawaban Anda:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                    {[
                      "Sangat Setuju",
                      "Setuju",
                      "Tidak Setuju",
                      "Sangat Tidak Setuju",
                    ].map((option) => (
                      <button
                        key={option}
                        className={`w-full h-16 py-2 px-6 rounded-lg text-white font-semibold transition-all duration-200 transform ${
                          answers[question.id].selectedAnswer === option
                            ? "bg-yellow-600 shadow-lg"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                        onClick={() =>
                          handleScaleSelection(question.id, option)
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Display a textarea if surveyType is 'Text' */}
            {surveyType === "Text" && (
              <div className="mt-4">
                <p className="text-lg text-gray-700">Tulis jawaban Anda:</p>
                <textarea
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows="4"
                  placeholder="Tulis jawaban di sini..."
                  value={answers[question.id].textAnswer}
                  onChange={(e) => handleTextChange(question.id, e)}
                ></textarea>
              </div>
            )}
          </div>
        );
      })}

      {/* Save Answer Button at the bottom */}
      <div className="mt-6 text-center">
        <button
          className="py-2 px-6 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300"
          onClick={handleSaveAnswers}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Jawaban"}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}

      {/* Success message */}
      {successMessage && !loading && (
        <div className="text-center text-green-500 mt-4">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}

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
        navigate(`/finish-quiz`);
      }
    } catch (err) {
      // Menampilkan pemberitahuan error dengan Toastify
      toast.error("Gagal menyimpan jawaban. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      {questions.map((question) => {
        const surveyType = question.type;

        return (
          <div key={question.id} className="mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Pertanyaan
              </h2>
              <p className="mt-2 text-gray-600">{question.question}</p>
            </div>

            {/* Display scale options as buttons if surveyType is 'Scale' */}
            {surveyType === "Scale" && (
              <div className="mt-4">
                <p className="text-gray-700">Pilih jawaban Anda:</p>
                <div className="flex space-x-4 mt-2">
                  {[
                    "Sangat Setuju",
                    "Setuju",
                    "Tidak Setuju",
                    "Sangat Tidak Setuju",
                  ].map((option) => (
                    <button
                      key={option}
                      className={`w-1/4 max-w-xs py-1 px-3 rounded-lg text-white ${
                        answers[question.id].selectedAnswer === option
                          ? "bg-blue-700" // Darker color when selected
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => handleScaleSelection(question.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Display a textarea if surveyType is 'Text' */}
            {surveyType === "Text" && (
              <div className="mt-4">
                <p className="text-gray-700">Tulis jawaban Anda:</p>
                <textarea
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="mt-4 text-center">
        <button
          className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
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

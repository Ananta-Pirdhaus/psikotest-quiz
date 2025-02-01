import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import QuestionCard from "./components/QuestionCard";
import ScoreReportCard from "./components/ScoreReportCard";
import ProgressCard from "./components/ProgressCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const fetchQuestionsData = async (sessionId, quizType, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}soal/${sessionId}?type=${quizType}&page=${page}`
    );
    const questions = response.data.data || [];
    const pagination = response.data.pagination || {};
    return { questions, pagination };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { questions: [], pagination: {} };
  }
};

export default function App() {
  const { sessionId } = useParams();
  const navigate = useNavigate(); // Added navigate hook
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerID, setSelectedAnswerID] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: 1,
  });
  const [quizType, setQuizType] = useState("Single");
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [previousQuestionId, setPreviousQuestionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("checkpointPage")) || 1
  );

  useEffect(() => {
    if (currentPage) {
      localStorage.setItem("checkpointPage", currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (sessionId) {
      const initializeQuestions = async () => {
        try {
          const { questions: fetchedQuestions, pagination: fetchedPagination } =
            await fetchQuestionsData(sessionId, quizType, currentPage); // Use the updated currentPage

          if (fetchedQuestions.length === 0) {
            toast.error(
              "Session ID tidak valid. Mengarahkan ke halaman peserta."
            );
            navigate("/peserta");
            return;
          }

          // // Change quiz type to 'Multiple' if all answers are filled in the 'Single' quiz type
          if (
            quizType === "Single" &&
            fetchedQuestions.every((q) => q.answers.length === questions.length)
          ) {
            setQuizType("Multiple");
            toast.info(
              "Tipe kuis diubah menjadi Multiple karena semua jawaban sudah terisi!"
            );
          }

          // Set fetched questions and pagination
          setQuestions(fetchedQuestions);
          setPagination(fetchedPagination);
          setCurrentPage(fetchedPagination.current_page);
          setLoading(false);
        } catch (error) {
          setError("Gagal memuat data soal.");
          setLoading(false);
        }
      };

      initializeQuestions();
    }
  }, [sessionId, quizType, currentPage]); // Ensure dependencies are properly included

  useEffect(() => {
    setCurrentQuestionNumber(currentQuestion + 1);
  }, [currentQuestion]);

  const handleAnswerOptionClick = (selectedAnswerID) => {
    if (!selectedAnswerID) return;
    setSelectedAnswerID(selectedAnswerID);
  };

  const handleNextQuestion = async () => {
    if (
      quizType === "Multiple" &&
      (!selectedAnswerID || selectedAnswerID.length !== 3)
    ) {
      toast.error("Tolong pilih tepat 3 jawaban.");
      return;
    }

    if (
      selectedAnswerID === null ||
      (quizType !== "Multiple" && selectedAnswerID.length === 0)
    ) {
      toast.error(
        "Tolong Jawab Pertanyaan dalam soal berikut terlebih dahulu!"
      );
      return;
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswerID(null);
    } else if (pagination.current_page < pagination.last_page) {
      const nextPage = pagination.current_page + 1;
      const { questions: fetchedQuestions, pagination: fetchedPagination } =
        await fetchQuestionsData(sessionId, quizType, nextPage);

      setQuestions(fetchedQuestions);
      setPagination(fetchedPagination);
      setCurrentQuestion(0);
      setCurrentPage(nextPage);
    }
  };

  const handlePrevQuestion = async () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setSelectedAnswerID(null);
    } else if (pagination.current_page > 1) {
      const prevPage = pagination.current_page - 1;
      const { questions: fetchedQuestions, pagination: fetchedPagination } =
        await fetchQuestionsData(sessionId, quizType, prevPage);

      setQuestions(fetchedQuestions);
      setPagination(fetchedPagination);
      setCurrentPage(prevPage);
      setCurrentQuestion(fetchedQuestions.length - 1);
    }
  };

  const handleScoreQuiz = () => {
    let finalScore = 0;
    questions.forEach((question) => {
      const storedAnswer = localStorage.getItem(`question_${question.id}`);
      if (storedAnswer === question.correctResponse) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setShowScore(true);
  };

  const handleRetakeQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setSelectedAnswerID(null);
    setScore(0);
    setPagination({
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    });
    setQuestions([]);
    localStorage.clear();
  };

  const handleChangeQuizType = () => {
    if (
      quizType === "Single" &&
      questions.every((q) => q.answers.length === questions.length)
    ) {
      // Jika tipe kuis adalah "Single" dan setiap soal memiliki jumlah jawaban yang sesuai
      if (pagination.current_page === pagination.last_page) {
        // Jika berada di halaman terakhir untuk tipe yang aktif, setel checkpointPage ke 1
        setCurrentPage(1); // Memulai dari halaman 1
      }

      // Ganti tipe kuis
      setQuizType(quizType === "Single" ? "Multiple" : "Single");

      // Reset pagination dan soal
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: 1,
        total: 1,
      });
      setCurrentQuestion(0); // Reset ke soal pertama
      setSelectedAnswerID(null); // Hapus jawaban yang terpilih
    } else {
      // Menambahkan aksi jika validasi gagal, misalnya memberi peringatan
      toast.warn("Validasi gagal: Jawaban tidak sesuai dengan jumlah soal.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <button type="button" disabled>
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-e-transparent align-[-0.125em]"
            role="status"
          ></div>
          <span className="ml-2">Loading...</span>
        </button>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const isLastQuestionAnswered =
    pagination.current_page === pagination.last_page;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="p-3 mt-5 flex-grow items-center justify-center">
        <div className="p-3">
          {showProgress ? (
            <ProgressCard
              questions={questions}
              currentQuestionNumber={currentQuestionNumber}
              totalQuestions={pagination.total}
              handleProgressToggle={() => setShowProgress(false)}
              handleLinkFromProgress={(index) => {
                setCurrentQuestion(index);
                setSelectedAnswerID(
                  localStorage.getItem(`question_${questions[index].id}`) ||
                    null
                );
              }}
            />
          ) : showScore ? (
            <ScoreReportCard
              score={score}
              quizLength={questions.length}
              currentQuestionNumber={currentQuestionNumber}
              totalQuestions={pagination.total}
              handleRetakeQuiz={handleRetakeQuiz}
            />
          ) : (
            <QuestionCard
              IdSession={sessionId}
              quizLength={questions.length}
              question={questions[currentQuestion]}
              selectedAnswerID={selectedAnswerID}
              currentQuestionNumber={currentQuestionNumber}
              totalQuestions={pagination.total}
              handleAnswerOptionClick={handleAnswerOptionClick}
              handleNextQuestion={handleNextQuestion}
              handlePrevQuestion={handlePrevQuestion}
              handleScoreQuiz={handleScoreQuiz}
              handleProgressToggle={() => setShowProgress(!showProgress)}
              quizType={quizType}
              handleChangeQuizType={handleChangeQuizType}
              isLastQuestionAnswered={isLastQuestionAnswered}
              currentPage={currentPage}
            />
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

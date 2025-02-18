import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import QuestionCard from "./components/QuestionCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import PanduanCard from "./components/PanduanCard";

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

const fetchPanduanData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}panduan`);
    const panduan = response.data.data || [];
    console.log("Fetched panduan:", panduan);
    return panduan;
  } catch (error) {
    console.error("Error fetching panduan data:", error);
    return [];
  }
};

export default function App() {
  const { sessionId } = useParams();
  const [panduanList, setPanduanList] = useState([]);
  const [showPanduan, setShowPanduan] = useState(true);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerID, setSelectedAnswerID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: 1,
  });
  const [quizType, setQuizType] = useState(
    localStorage.getItem("quizType") || "Single"
  );

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("checkpointPage")) || 1
  );
  const [isAnswered, setIsAnswered] = useState(false); // New state to track if question is answered

  useEffect(() => {
    if (currentPage) {
      localStorage.setItem("checkpointPage", currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("quizType", quizType);
  }, [quizType]);

  useEffect(() => {
    if (sessionId) {
      const initializeQuestions = async () => {
        try {
          const { questions: fetchedQuestions, pagination: fetchedPagination } =
            await fetchQuestionsData(sessionId, quizType, currentPage);

          if (fetchedQuestions.length === 0) {
            toast.error(
              "Session ID tidak valid. Mengarahkan ke halaman peserta."
            );
            navigate("/peserta");
            return;
          }

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
  }, [sessionId, quizType, currentPage]);

  useEffect(() => {
    setCurrentQuestionNumber(currentQuestion + 1);
  }, [currentQuestion]);

  const handleAnswerOptionClick = (selectedAnswerID) => {
    if (!selectedAnswerID) return;
    setSelectedAnswerID(selectedAnswerID);
    setIsAnswered(true); // Mark question as answered
  };

  const handleCorrectAnswer = (correct) => {
    if (correct) {
      setIsAnswered(true); // Set `isAnswered` to true if the answer is correct
    }
  };

  const handleNextQuestion = async () => {
    if (!isAnswered) {
      toast.error("Tolong jawab pertanyaan terlebih dahulu!");
      return;
    }

    if (
      quizType === "Multiple" &&
      (!selectedAnswerID || selectedAnswerID.length !== 3)
    ) {
      toast.error("Tolong pilih tepat 3 jawaban.");
      return;
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswerID(null);
      setIsAnswered(false); // Reset isAnswered for the next question
    } else if (pagination.current_page < pagination.last_page) {
      const nextPage = pagination.current_page + 1;
      const { questions: fetchedQuestions, pagination: fetchedPagination } =
        await fetchQuestionsData(sessionId, quizType, nextPage);

      setQuestions(fetchedQuestions);
      setPagination(fetchedPagination);
      setCurrentQuestion(0);
      setCurrentPage(nextPage);
      setIsAnswered(false); // Reset for new page
    }
  };

  const handlePrevQuestion = async () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setSelectedAnswerID(null);
      setIsAnswered(false); // Reset isAnswered when going to previous question
    } else if (pagination.current_page > 1) {
      const prevPage = pagination.current_page - 1;
      const { questions: fetchedQuestions, pagination: fetchedPagination } =
        await fetchQuestionsData(sessionId, quizType, prevPage);

      setQuestions(fetchedQuestions);
      setPagination(fetchedPagination);
      setCurrentPage(prevPage);
      setCurrentQuestion(fetchedQuestions.length - 1);
      setIsAnswered(false); // Reset for previous page
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

  const handleChangeQuizType = () => {
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
  };

  // Fetch panduan data
  useEffect(() => {
    const initializePanduan = async () => {
      try {
        const panduan = await fetchPanduanData();
        setPanduanList([panduan]); // Wrap it in an array for rendering
      } catch (error) {
        console.error("Error fetching panduan:", error);
      }
    };

    initializePanduan();
  }, []);

  useEffect(() => {
    const savedCheckpointPage = localStorage.getItem("checkpointPage");
    const savedQuizType = localStorage.getItem("quizType");

    if (savedCheckpointPage === "1" && savedQuizType === "Single") {
      setShowPanduan(true);
    } else {
      setShowPanduan(false);
    }
  }, []);

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
      <main className="p-3 mt-5 flex-grow flex items-center justify-center">
        {/* If showPanduan is true, display the guide */}
        {showPanduan ? (
          <div className="p-3 max-w-3xl w-full bg-gray-100 rounded-lg shadow-md text-center">
            {panduanList.map((panduan, index) => (
              <PanduanCard key={index} panduan={panduan} />
            ))}
            <button
              className="mt-4 px-4 py-2 w-full bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              onClick={() => setShowPanduan(false)} // Click to start the quiz
            >
              Mulai Quiz
            </button>
          </div>
        ) : (
          // If showPanduan is false, display the QuestionCard
          <div className="p-3 max-w-3xl w-full bg-white rounded-lg shadow-md">
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
              quizType={quizType}
              handleChangeQuizType={handleChangeQuizType}
              isLastQuestionAnswered={isLastQuestionAnswered}
              currentPage={currentPage}
              isAnswered={isAnswered} // Pass isAnswered to QuestionCard
              handleCorrectAnswer={handleCorrectAnswer}
            />
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ResultQuizCard from "./components/ResultQuzCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const fetchResultQuizData = async (idSession) => {
  try {
    const response = await axios.get(`${BASE_URL}report/${idSession}`);
    const quizResult = response.data.data || null;
    console.log("Fetched quiz result:", quizResult);
    return quizResult;
  } catch (error) {
    console.error("Error fetching result quiz data:", error);
    return null;
  }
};

export default function ResultQuizApp() {
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idSession } = useParams();
  const navigate = useNavigate(); // Menambahkan useNavigate

  useEffect(() => {
    const initializeResultQuiz = async () => {
      try {
        const fetchedResult = await fetchResultQuizData(idSession);
        if (!fetchedResult) {
          toast.error("Tidak ada data hasil kuis yang tersedia.");
          setTimeout(() => {
            navigate(`/survey/${idSession}`); // Redirect ke halaman survey
          }, 2000); // Delay 2 detik agar user melihat pesan error
        } else {
          setQuizResult(fetchedResult);
        }
      } catch (error) {
        toast.error("Gagal memuat data hasil kuis.");
        setTimeout(() => {
          navigate(`/survei/${idSession}`);
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    initializeResultQuiz();
  }, [idSession, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="p-3 mt-5 flex-grow items-center justify-center">
        <div className="p-3">
          <ResultQuizCard
            quizResult={quizResult}
            idSession={idSession}
            baseUrl={BASE_URL}
          />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

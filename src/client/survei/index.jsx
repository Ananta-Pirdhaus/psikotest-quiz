import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import SurveiCard from "./components/surveiCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const fetchSurveiData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}survei`);
    const questions = response.data.data || [];
    console.log("Fetched questions:", questions);
    return questions;
  } catch (error) {
    console.error("Error fetching survei data:", error);
    return [];
  }
};

export default function SurveiApp() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil sessionId dari URL
  const { sessionId } = useParams();

  useEffect(() => {
    const initializeSurvei = async () => {
      try {
        const fetchedQuestions = await fetchSurveiData();

        if (fetchedQuestions.length === 0) {
          toast.error("Tidak ada data survei yang tersedia.");
          setLoading(false);
          return;
        }

        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        setError("Gagal memuat data survei.");
        setLoading(false);
      }
    };

    initializeSurvei();
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

  return (
    <div className="flex flex-col h-screen">
      <main className="p-3 mt-5 flex-grow items-center justify-center">
        <div className="p-3">
          {/* Passing all questions as a prop without mapping */}
          <SurveiCard
            questions={questions} // Passing raw questions data
            sessionId={sessionId} // Passing sessionId as a prop
            baseUrl={BASE_URL}
          />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}


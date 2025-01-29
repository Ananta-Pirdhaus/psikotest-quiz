import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultQuizCard = ({ quizResult, idSession }) => {
  if (!quizResult) return null; // Menghindari error jika tidak ada data

  const { participant, talent, message } = quizResult;
  const navigate = useNavigate();

  // State untuk mengontrol apakah talentItem expand atau collapse
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  // Ambil hanya name dan score dari talent untuk chart
  const talentNames = talent.map((t) => t.name);
  const talentScores = talent.map((t) => t.score);

  // Data untuk chart
  const data = {
    labels: talentNames,
    datasets: [
      {
        label: "Skor Talenta",
        data: talentScores,
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Light blue for background
        borderColor: "rgba(59, 130, 246, 1)", // Darker blue for border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Skor Talenta Peserta",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        max: 10, // Mengatur nilai maksimum untuk sumbu y, sesuaikan jika perlu
      },
    },
  };

  const handleNavigateToSurvey = () => {
    navigate(`/survey/${idSession}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Hasil Kuis - {participant.name}
      </h2>

      {/* Peserta */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-600">Peserta:</h3>
        <p className="text-gray-700">Nama: {participant.name}</p>
        <p className="text-gray-700">Kelas: {participant.class}</p>
        <p className="text-gray-700">Sekolah: {participant.school}</p>
        <p className="text-gray-700">Level: {participant.level}</p>
      </div>

      {/* Bar Chart */}
      <div className="mb-6">
        <Bar data={data} options={options} />
      </div>

      {/* Rekomendasi */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-600 my-5">Rekomendasi:</h3>
        {talent.slice(0, 3).map((talentItem, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-blue-50 rounded-md hover:bg-blue-100 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-blue-600 text-xl font-semibold">
                {talentItem.name}
              </h4>
              <button
                onClick={() => toggleExpand(index)}
                className="text-blue-600 font-semibold"
              >
                {expanded === index ? "Sembunyikan Detail" : "Lihat Detail"}
              </button>
            </div>

            {/* Expandable Content with Smooth Animation */}
            <div
              className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out max-h-[${
                expanded === index ? "500px" : "0"
              }]`}
            >
              {expanded === index && (
                <div>
                  <p className="text-gray-700">
                    <strong>Deskripsi:</strong> {talentItem.full_description}
                  </p>

                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Jurusan yang Relevan:</strong>
                    </p>
                    <p className="text-gray-700">
                      {talentItem.jurusan.join(", ")}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Profesi yang Cocok:</strong>
                    </p>
                    <p className="text-gray-700">
                      {talentItem.profesi.join(", ")}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Rekomendasi:</strong>
                    </p>
                    <p className="text-gray-600">{talentItem.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pesan */}
      <div className="mt-6">
        <p className="text-gray-600">{message}</p>
      </div>

      <div className="mt-6 justify-center flex">
        <button
          onClick={handleNavigateToSurvey}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Lanjutkan ke Survey
        </button>
      </div>
    </div>
  );
};

export default ResultQuizCard;

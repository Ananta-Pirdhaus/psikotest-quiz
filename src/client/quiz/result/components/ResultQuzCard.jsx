import React, { useState, useEffect } from "react";
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
import DOMPurify from "dompurify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultQuizCard = ({ quizResult }) => {
  if (!quizResult) return null;
  const { participant, talent, profession, major, message } = quizResult;
  const [expanded, setExpanded] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const sortedTalents = [...talent].sort((a, b) => b.score - a.score);
  const topThreeTalents = sortedTalents.slice(0, 3);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const barData = {
    labels: talent.map((t) => t.name),
    datasets: [
      {
        label: "Skor Bakat Peserta",
        data: talent.map((t) => t.score),
        backgroundColor: [
          "#ff9f40",
          "#f39c12",
          "#f9b5b1",
          "#fedc56",
          "#e74c3c",
          "#8e44ad",
          "#2ecc71",
          "#3498db",
          "#1abc9c",
          "#9b59b6",
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Skor Bakat Peserta",
        font: { size: 18 },
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true, max: 10 },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-3xl border border-gray-300">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        📊 Hasil Kuis
      </h2>

      <div className="mb-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-2xl w-full">
        <h3 className="font-semibold text-2xl text-gray-800 flex items-center justify-center gap-3">
          <i className="fas fa-user-circle text-2xl text-amber-600"></i> Peserta
        </h3>
        <div className="mt-5 space-y-4 text-gray-700">
          <p className="flex items-center gap-3">
            <i className="fas fa-user text-amber-500"></i>
            <span className="font-medium text-gray-900">Nama:</span>
            <span>{participant.name}</span>
          </p>
          <p className="flex items-center gap-3">
            <i className="fas fa-school text-amber-500"></i>
            <span className="font-medium text-gray-900">Kelas:</span>
            <span>{participant.class}</span>
          </p>
          <p className="flex items-center gap-3">
            <i className="fas fa-building text-amber-500"></i>
            <span className="font-medium text-gray-900">Sekolah:</span>
            <span>{participant.school}</span>
          </p>
          <p className="flex items-center gap-3">
            <i className="fas fa-cogs text-amber-500"></i>
            <span className="font-medium text-gray-900">Level:</span>
            <span>{participant.level}</span>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              ℹ️ Informasi Penting
            </h3>
            <p className="text-gray-700 mt-4">
              Jangan salah, ya! Bukan berarti kelima kecerdasan lainnya ini
              tidak kamu miliki, lho! Itu menandakan bahwa 3 kecerdasan
              unggulanmu sering kamu gunakan dalam belajar atau menyelesaikan
              sebuah masalah
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="w-full md:w-full bg-gray-100 p-6 rounded-2xl shadow-lg h-[400px] flex items-center justify-center">
        <Bar
          data={barData}
          options={{ ...options, maintainAspectRatio: false }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-orange-600 flex items-center gap-2 my-6">
          <i className="fas fa-lightbulb text-2xl text-yellow-500"></i>
          Penjelasan Karakter Kamu
        </h3>
        {topThreeTalents.map((talentItem, index) => (
          <div
            key={index}
            className="p-5 mb-5 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-orange-700 text-xl font-semibold">
                {talentItem.name}
              </h4>
              <button
                onClick={() => toggleExpand(index)}
                className="text-orange-700 font-medium transition duration-300 flex items-center gap-1 hover:text-orange-500"
              >
                {expanded === index ? (
                  <>
                    <i className="fas fa-minus-circle"></i> Sembunyikan
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus-circle"></i> Lihat Detail
                  </>
                )}
              </button>
            </div>
            <div
              className={`mt-4 transition-all duration-500 ease-in-out overflow-hidden ${
                expanded === index
                  ? "max-h-[600px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {expanded === index && (
                <div className="p-4 bg-white rounded-lg shadow-sm border border-orange-200">
                  <p className="text-gray-800 font-medium">
                    <strong>Deskripsi Singkat:</strong>{" "}
                    {talentItem.short_description}
                  </p>
                  <p className="text-gray-800 font-medium mt-3">
                    <strong>Deskripsi Lengkap:</strong>
                  </p>
                  <div
                    className="text-gray-700 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(talentItem.full_description),
                    }}
                  />
                  <div className="mt-4">
                    <p className="text-gray-800 font-medium">
                      <strong>Rekomendasi:</strong>
                    </p>
                    <div
                      className="text-gray-700 mt-1"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(talentItem.recommendation),
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <h3 className="text-2xl font-bold text-orange-600 flex items-center gap-2 mb-6">
          <i className="fas fa-briefcase text-2xl text-yellow-500"></i> Profesi
          yang Cocok untuk Kamu
        </h3>
        {profession.map((item, index) => (
          <div
            key={index}
            className="p-5 mb-5 bg-yellow-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h4 className="text-yellow-700 text-xl font-semibold flex items-center gap-2">
              <i className="fas fa-briefcase"></i> {item.name}
            </h4>
          </div>
        ))}

        <h3 className="text-2xl font-bold text-orange-600 flex items-center gap-2 mt-8 mb-6">
          <i className="fas fa-school text-2xl text-yellow-500"></i> Jurusan
          yang Cocok untuk Kamu
        </h3>
        {major.map((item, index) => (
          <div
            key={index}
            className="p-5 mb-5 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-orange-700 text-xl font-semibold flex items-center gap-2">
                <i className="fas fa-graduation-cap"></i> {item.name}
              </h4>
              <button
                onClick={() => toggleExpand(`major-${index}`)}
                className="text-orange-700 font-medium transition duration-300 flex items-center gap-1 hover:text-orange-500"
              >
                {expanded === `major-${index}` ? (
                  <i className="fas fa-minus-circle"></i>
                ) : (
                  <i className="fas fa-plus-circle"></i>
                )}
              </button>
            </div>

            <div
              className={`mt-4 transition-all duration-500 ease-in-out overflow-hidden ${
                expanded === `major-${index}`
                  ? "max-h-[600px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {expanded === `major-${index}` && (
                <p className="text-gray-800 p-4 bg-white rounded-lg shadow-sm border border-orange-200 font-medium">
                  {item.universities.slice(0, 5).join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultQuizCard;

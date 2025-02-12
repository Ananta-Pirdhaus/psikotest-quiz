import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faSchool,
  faStar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";


const ResultQuizCard = ({ quizResult }) => {
  if (!quizResult) return null;
  const { participant, talent, profession, major, message } = quizResult;
  const [expanded, setExpanded] = useState(null);
  const sortedTalents = [...talent].sort((a, b) => b.score - a.score);
  const topThreeTalents = sortedTalents.slice(0, 3);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const barData = {
    labels: talent.map((t) => t.name),
    datasets: [
      {
        label: "Skor Talenta",
        data: talent.map((t) => t.score),
        backgroundColor: [
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
          "#c9cbcf",
          "#2ecc71",
          "#e74c3c",
          "#f39c12",
          "#8e44ad",
        ],
        borderRadius: 10,
      },
    ],
  };

  const doughnutData = {
    labels: talent.map((t) => t.name),
    datasets: [
      {
        data: talent.map((t) => t.score),
        backgroundColor: [
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
          "#c9cbcf",
          "#2ecc71",
          "#e74c3c",
          "#f39c12",
          "#8e44ad",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Skor Talenta Peserta",
        font: { size: 18 },
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true, max: 10 },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Hasil Kuis
      </h2>

      <div className="mb-6 p-6 bg-gradient-to-r from-orange-50 via-yellow-50 to-yellow-100 rounded-2xl shadow-lg border transition-transform transform hover:scale-105 w-full">
        <h3 className="font-bold text-xl text-purple-800 flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faUser} className="text-purple-600" />
          Peserta
        </h3>
        <div className="mt-4 space-y-3 text-gray-800">
          <p className="flex flex-row items-center gap-3">
            <FontAwesomeIcon icon={faUser} className="text-pink-500" />
            <span className="font-semibold text-purple-800">Nama:</span>
            <span className="text-gray-700">{participant.name}</span>
          </p>
          <p className="flex flex-row items-center gap-3">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-green-500"
            />
            <span className="font-semibold text-purple-800">Kelas:</span>
            <span className="text-gray-700">{participant.class}</span>
          </p>
          <p className="flex flex-row items-center gap-3">
            <FontAwesomeIcon icon={faSchool} className="text-indigo-500" />
            <span className="font-semibold text-purple-800">Sekolah:</span>
            <span className="text-gray-700">{participant.school}</span>
          </p>
          <p className="flex flex-row items-center gap-3">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 animate-pulse"
            />
            <span className="font-semibold text-purple-800">Level:</span>
            <span className="text-gray-700">{participant.level}</span>
          </p>
        </div>
      </div>

      {/* Container untuk Chart dengan Flex */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
          {talent?.length > 0 ? (
            <>
              <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-50 to-teal-200 p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center">
                <div className="w-full h-full">
                  <Doughnut
                    data={doughnutData}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-gradient-to-l from-blue-50 to-emerald-200 p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center">
                <div className="w-full h-full">
                  <Bar
                    data={barData}
                    options={{ ...options, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Loading data...</p>
          )}
        </div>

        {/* Progress Bar Section */}
        <div className="w-full text-center mt-3">
          {topThreeTalents.map((talent, index) => (
            <div key={index} className="w-full mb-2">
              <p className="text-gray-700 font-semibold mb-1">{talent.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full text-center text-white text-xs leading-6"
                  style={{
                    width: `${(talent.score / 10) * 100}%`,
                    backgroundColor: ["#4bc0c0", "#f39c12", "#e74c3c"][index],
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-600 my-5">Rekomendasi:</h3>
        {topThreeTalents.map((talentItem, index) => (
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
                className="text-blue-600 font-semibold transition duration-200 flex items-center gap-1"
              >
                {expanded === index ? (
                  <>
                    <FontAwesomeIcon icon={faChevronUp} /> Sembunyikan
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faChevronDown} /> Lihat Detail
                  </>
                )}
              </button>
            </div>

            <div
              className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                expanded === index
                  ? "max-h-[400px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {expanded === index && (
                <div className="p-2">
                  <p className="text-gray-700">
                    <strong>Deskripsi Singkat:</strong>{" "}
                    {talentItem.short_description}
                  </p>
                  <p className="text-gray-700">
                    <strong>Deskripsi Lengkap:</strong>{" "}
                    {talentItem.full_description}
                  </p>
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

        {/* Profesi */}
        <h3 className="font-semibold text-blue-600 my-5">
          Profesi yang Direkomendasikan:
        </h3>
        {profession.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-green-50 rounded-md hover:bg-green-100 transition duration-300"
          >
            <h4 className="text-green-600 text-xl font-semibold">
              {item.name}
            </h4>
          </div>
        ))}

        {/* Jurusan */}
        <h3 className="font-semibold text-blue-600 my-5">
          Jurusan yang Direkomendasikan:
        </h3>
        {major.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-yellow-50 rounded-md hover:bg-yellow-100 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-yellow-600 text-xl font-semibold">
                {item.name}
              </h4>
              <button
                onClick={() => toggleExpand(`major-${index}`)}
                className="text-yellow-600 font-semibold transition duration-200 flex items-center gap-1"
              >
                {expanded === `major-${index}` ? (
                  <>
                    <FontAwesomeIcon icon={faChevronUp} /> Sembunyikan
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faChevronDown} /> Lihat Detail
                  </>
                )}
              </button>
            </div>

            <div
              className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                expanded === `major-${index}`
                  ? "max-h-[400px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {expanded === `major-${index}` && (
                <p className="text-gray-700 p-2 font-semibold">
                  {item.universities.slice(0, 3).join(", ")}
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

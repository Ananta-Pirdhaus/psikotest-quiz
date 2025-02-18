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
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
          "#ff9f40", // Orange
          "#f39c12", // Yellow
          "#f9b5b1", // Light Red
          "#fedc56", // Soft Yellow
          "#ffacb7", // Light Pink
          "#ff6f61", // Coral
          "#f4b6c2", // Blush
          "#f1a7a1", // Peach
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
        text: "Skor Talenta Peserta",
        font: { size: 18 },
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true, max: 10 },
    },
  };

  useEffect(() => {
    // Menampilkan toast ketika komponen pertama kali dirender
    toast.warn(
      "Jangan salah, ya! Bukan berarti kelima kecerdasan lainnya ini tidak kamu miliki, lho! Itu menandakan bahwa 3 kecerdasan unggulanmu sering kamu gunakan dalam belajar atau menyelesaikan sebuah masalah",
      {
        position: "top-right",
        autoClose: 7500, // Toast akan muncul selama 30 detik
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          width: "80vw", // Menggunakan viewport width untuk lebar yang lebih responsif
          maxWidth: "500px", // Lebar maksimum untuk tampilan besar
          whiteSpace: "normal", // Membiarkan teks membungkus
          wordWrap: "break-word", // Memecah kata panjang
          textAlign: "start", // Menyejajarkan teks di kiri
          padding: "10px", // Menambahkan sedikit ruang di dalam toast
          boxSizing: "border-box", // Memastikan padding tidak mengubah ukuran total
        },
      }
    );
  }, []); // Hanya dijalankan sekali setelah pertama kali komponen dirender

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-4xl font-bold text-yellow-600 mb-6 text-center">
        Hasil Kuis
      </h2>

      <div className="mb-6 p-6 bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-300 rounded-2xl shadow-lg border transition-transform transform hover:scale-105 w-full">
        <h3 className="font-bold text-xl text-orange-700 flex items-center justify-center gap-3">
          <i className="fas fa-user-circle text-xl text-orange-700"></i> Peserta
        </h3>
        <div className="mt-4 space-y-3 text-gray-800">
          <p className="flex flex-row items-center gap-3">
            <i className="fas fa-user text-yellow-700"></i>
            <span className="font-semibold text-yellow-700">Nama:</span>
            <span className="text-gray-700">{participant.name}</span>
          </p>
          <p className="flex flex-row items-center gap-3">
            <i className="fas fa-school text-yellow-700"></i>
            <span className="font-semibold text-yellow-700">Kelas:</span>
            <span className="text-gray-700">{participant.class}</span>
          </p>
          <p className="flex flex-row items-center gap-3">
            <i className="fas fa-building text-yellow-700"></i>
            <span className="font-semibold text-yellow-700">Sekolah:</span>
            <span className="text-gray-700">{participant.school}</span>
          </p>
          <p className="flex flex-row items-center gap-3">
            <i className="fas fa-cogs text-yellow-700"></i>
            <span className="font-semibold text-yellow-700">Level:</span>
            <span className="text-gray-700">{participant.level}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200 p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center">
          <div className="w-full h-full">
            <Bar
              data={barData}
              options={{ ...options, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Progress chart akan tersembunyi di bawah layar md (tablet ke bawah) */}
        <div className="w-full md:w-1/2 bg-gradient-to-l from-yellow-100 via-orange-200 to-red-100 p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center hidden md:block">
          <div className="w-full h-full">
            <div className="space-y-4 w-full">
              {topThreeTalents.map((talent, index) => (
                <div key={index} className="w-full">
                  <p className="text-gray-700 font-semibold mb-1">
                    <i className="fas fa-star text-yellow-600"></i>{" "}
                    {talent.name}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full text-center text-white text-xs leading-6"
                      style={{
                        width: `${(talent.score / 10) * 100}%`,
                        backgroundColor: [
                          "#ff9f40", // Orange
                          "#f39c12", // Yellow
                          "#f9b5b1", // Light Red
                        ][index],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-orange-600 my-5">
          <i className="fas fa-lightbulb text-xl text-yellow-500"></i>{" "}
          Rekomendasi:
        </h3>
        {topThreeTalents.map((talentItem, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-orange-50 rounded-md hover:bg-orange-100 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-orange-600 text-xl font-semibold">
                {talentItem.name}
              </h4>
              <button
                onClick={() => toggleExpand(index)}
                className="text-orange-600 font-semibold transition duration-200 flex items-center gap-1"
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
              className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                expanded === index
                  ? "max-h-[400px] opacity-100 overflow-y-auto"
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

        <h3 className="font-semibold text-orange-600 my-5">
          <i className="fas fa-briefcase text-xl text-yellow-500"></i> Profesi
          yang Direkomendasikan:
        </h3>
        {profession.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-yellow-50 rounded-md hover:bg-yellow-100 transition duration-300"
          >
            <h4 className="text-yellow-600 text-xl font-semibold">
              <i className="fas fa-briefcase"></i> {item.name}
            </h4>
          </div>
        ))}

        <h3 className="font-semibold text-orange-600 my-5">
          <i className="fas fa-school text-xl text-yellow-500"></i> Jurusan yang
          Direkomendasikan:
        </h3>
        {major.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-orange-50 rounded-md hover:bg-orange-100 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-orange-600 text-xl font-semibold">
                <i className="fas fa-graduation-cap"></i> {item.name}
              </h4>
              <button
                onClick={() => toggleExpand(`major-${index}`)}
                className="text-orange-600 font-semibold transition duration-200 flex items-center gap-1"
              >
                {expanded === `major-${index}` ? (
                  <i className="fas fa-minus-circle"></i>
                ) : (
                  <i className="fas fa-plus-circle"></i>
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

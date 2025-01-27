import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ThankYouCard = () => {
  const [balls, setBalls] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Menginisialisasi bola-bola dengan posisi acak
  useEffect(() => {
    setBalls(
      Array.from({ length: 20 }).map(() => ({
        size: Math.random() * 80 + 20, // Ukuran bola antara 20-100 px
        color: `hsl(${Math.random() * 360}, 70%, 80%)`, // Warna random
        x: Math.random() * window.innerWidth, // Posisi acak di sumbu X
        y: Math.random() * window.innerHeight, // Posisi acak di sumbu Y
      }))
    );
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-300 overflow-hidden">
      {/* Grafik bola di latar belakang */}
      {balls.map((ball, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            backgroundColor: ball.color,
            width: ball.size,
            height: ball.size,
            top: ball.y,
            left: ball.x,
          }}
          animate={{
            x: Math.random() * window.innerWidth, // Gerakkan bola ke posisi acak X
            y: Math.random() * window.innerHeight, // Gerakkan bola ke posisi acak Y
          }}
          transition={{
            duration: 2, // Durasi lebih panjang untuk pergerakan yang halus
            repeat: Infinity, // Ulangi gerakan bola secara terus-menerus
            repeatType: "reverse", // Ulangi pergerakan dan balik ke posisi semula
            ease: "easeInOut", // Efek easing untuk transisi yang lebih lembut
          }}
        />
      ))}

      {/* Kartu Terima Kasih */}
      <div className="relative z-10 max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-green-500 bg-green-100 w-20 h-20 flex justify-center items-center rounded-full shadow-md mb-6">
              <FontAwesomeIcon icon={faCheckCircle} size="3x" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
              Terima Kasih!
            </h1>
            <p className="text-gray-700 leading-relaxed mb-6">
              Anda telah berhasil menyelesaikan survei dan melaksanakan
              <span className="font-semibold">
                {" "}
                "Quiz the Explorer" Psikotest
              </span>
              . Semoga pengalaman ini memberikan wawasan baru bagi Anda.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg focus:outline-none"
              onClick={() => navigate("/")} // Navigasi ke halaman utama
            >
              Kembali ke Halaman Utama
            </motion.button>
          </motion.div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white text-center">
          <p className="text-sm font-medium">
            Terima kasih telah meluangkan waktu Anda!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouCard;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}setting`;

function Banner() {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.data.status === "success") {
          setPhone(response.data.data.contact.phone);
        }
      })
      .catch((error) => console.error("Gagal mengambil data:", error));
  }, []);

  if (!phone) return null; // Jangan tampilkan tombol jika nomor belum dimuat

  return (
    <div className="fixed rounded-full shadow-xl bottom-20 sm:bottom-20 md:bottom-12 lg:bottom-8 right-7 md:right-12 z-50 hover:animate-bounce active:animate-bounce">
      <div className="bg-green-500 hover:bg-green-700 border border-transparent rounded-full text-gray-50 p-3 shadow-lg flex">
        <div className="flex items-center gap-6">
          <a
            className="text-gray-50 hover:text-gray-200 flex items-center gap-2"
            href={`https://wa.me/${phone.replace(/[^\d+]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 text-white"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;

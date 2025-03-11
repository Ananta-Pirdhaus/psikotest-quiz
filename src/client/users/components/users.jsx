import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import image_test from "../../../assets/test_svg.svg";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function UserPeserta({ jurusan, perguruanTinggi, sekolah, kelas }) {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    class: "",
    university: "",
    major: "",
  });

  const [selectedLevel, setSelectedLevel] = useState(""); // State untuk level sekolah
  const [selectedMajor, setSelectedMajor] = useState(null); // State untuk jurusan yang dipilih

  // Options for select components
  const jurusanOptions = jurusan.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const sekolahOptions = sekolah.data.map((item) => ({
    value: item.id,
    label: item.name,
    level: item.level,
  }));

  const filteredKelas = kelas.data.filter(
    (item) => item.level === selectedLevel
  );

  const kelasOptions = filteredKelas.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // Filter perguruan tinggi berdasarkan jurusan yang dipilih
  const filteredPerguruanTinggi = perguruanTinggi.data.filter((university) =>
    university.jurusan.some((major) => major.id === selectedMajor?.value)
  );

  const perguruanTinggiOptions = filteredPerguruanTinggi.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f8f9fa",
      borderColor: "#d1d5db",
      borderRadius: "8px",
      padding: "4px",
      fontSize: "14px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#a1a1aa",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#e5e7eb" : "white",
      color: "#374151",
      padding: "10px",
      "&:active": {
        backgroundColor: "#d1d5db",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}peserta`, {
        name: formData.name,
        email: formData.email,
        school: formData.school,
        class: formData.class,
        university: formData.university,
        major: formData.major,
      });

      const { status, message, data } = response.data;

      if (status === "success") {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
        });

        // Mencari session yang aktif
        const activeSession = data.sessions.find(
          (session) => session.status === "Active"
        );

        if (activeSession) {
          const { id: sessionId, type } = activeSession; // Ambil sessionId dan type

          // Cek tipe sesi, jika "Survey" arahkan ke halaman survei, jika tidak ke halaman test
          if (type === "Survey") {
            navigate(`/survey/${sessionId}`);
          } else {
            navigate(`/test/${sessionId}`);
          }
        } else {
          toast.error("Tidak ada sesi aktif ditemukan.", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        console.log("Response:", response.data);
      }
    } catch (error) {
      toast.error("Pendaftaran gagal, coba lagi.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Daftar Peserta
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                {/* Name Input */}
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                {/* Email Input */}
                <input
                  className="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                {/* Sekolah Select */}
                <Select
                  className="mt-5"
                  options={sekolahOptions}
                  styles={customStyles}
                  placeholder="Pilih Sekolah"
                  onChange={(selected) => {
                    setFormData({ ...formData, school: selected.value });
                    setSelectedLevel(selected.level); // Set level sekolah
                  }}
                />

                {/* Kelas Select */}
                <Select
                  className="mt-5"
                  options={kelasOptions}
                  styles={customStyles}
                  placeholder="Pilih Kelas"
                  onChange={(selected) =>
                    setFormData({ ...formData, class: selected.value })
                  }
                />

                {/* Jurusan Select */}
                {/* <Select
                  className="mt-5"
                  options={jurusanOptions}
                  styles={customStyles}
                  placeholder="Pilih Jurusan"
                  onChange={(selected) => {
                    setFormData({ ...formData, major: selected.value });
                    setSelectedMajor(selected); // Set jurusan yang dipilih
                  }}
                /> */}

                {/* Perguruan Tinggi Select */}
                {/* <Select
                  className="mt-5"
                  options={perguruanTinggiOptions}
                  styles={customStyles}
                  placeholder="Pilih Perguruan Tinggi"
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      university: selected.value,
                    })
                  }
                /> */}

                {/* Sign Up Button */}
                <button
                  className="mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleSubmit}
                >
                  <span className="ml-3">Daftar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Background Image */}
        <div className="flex-1 bg-amber-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image_test})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserPeserta;

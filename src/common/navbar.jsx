import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import LogoUnesa from "../common/logo-unesa.png";
import { useNavigate } from "react-router-dom";
import bgHeader from ".././assets/bg-header.webp";

export default function Header() {
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [resizeTimer, setResizeTimer] = useState(null);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  const handleResize = () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    const timer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);
    setResizeTimer(timer);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [resizeTimer]);

  return (
    <header className="relative w-full">
      <nav className="fixed left-0 top-0 w-full min-h-[70px] bg-white z-40 flex items-center shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center justify-between w-full lg:w-auto lg:flex-1">
            <a
              href="#"
              className="text-dark-gray text-[32px] font-bold uppercase tracking-tight"
            >
              <span className="hidden lg:inline">CAREER THE EXPLORER</span>
              <span className="lg:hidden">CTE</span>
            </a>
            {/* Tombol untuk Toggle Menu pada Mobile */}
            <button
              type="button"
              className="lg:hidden text-dark-gray text-2xl"
              onClick={toggleNavbar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* Navbar Menu */}
          <div
            className={`fixed right-0 top-0 w-full sm:w-1/2 h-full bg-white shadow-lg pt-[60px] px-5 pb-4 text-center transition-transform transform duration-300 lg:relative lg:flex lg:items-center lg:justify-between lg:w-auto lg:bg-transparent lg:shadow-none ${
              isNavbarVisible ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0`}
          >
            <button
              type="button"
              className="absolute top-5 right-5 lg:hidden text-2xl text-dark-gray"
              onClick={toggleNavbar}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <ul className="flex flex-col pb-7 lg:flex-row lg:space-x-8 text-dark-gray">
              <li className="py-2 lg:py-0">
                <a
                  href=""
                  className="text-lg font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-orange-500"
                >
                  Home
                </a>
              </li>
              <li className="py-2 lg:py-0">
                <a
                  href="#features"
                  className="text-lg font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-orange-500"
                >
                  Features
                </a>
              </li>
              <li className="py-2 lg:py-0">
                <a
                  href=""
                  className="text-lg font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-orange-500"
                >
                  Visi & Misi
                </a>
              </li>
              <li className="py-2 lg:py-0">
                <a
                  href="#"
                  className="text-lg font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-orange-500"
                >
                  Test
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="text-gray-800 body-font bg-amber-100 pt-[70px] relative overflow-hidden">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center relative z-10">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-5xl mb-4 font-bold text-gray-900">
              Temukan Potensi Karier Terbaikmu
            </h1>
            <p className="text-lg max-w-xl mb-8 text-gray-800">
              "Career The Explorer" adalah platform inovatif yang dirancang
              untuk membantu Anda mengeksplorasi potensi karier terbaik melalui
              tes psikologi.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex text-white bg-orange-600 border-0 py-3 px-8 rounded-full font-semibold hover:bg-orange-500 transition duration-300 text-lg"
                onClick={() => navigate("/peserta")}
              >
                <span>Mulai Tes Sekarang</span>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={LogoUnesa}
            />
          </div>
        </div>
      </section>
    </header>
  );
}

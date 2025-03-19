import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoLarge from "../assets/logo_large.png";
import logoUnesa from "../common/logo-unesa.png";
import Logo from "../assets/logo.png";
import MainSvg from "../assets/main_svg.svg";

export default function Header() {
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative w-full">
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 min-h-[70px] px-6 lg:px-12 flex items-center justify-between transition-all duration-300 shadow-md ${
          isScrolled ? "bg-white shadow-lg" : "bg-white"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="#"
          className="text-2xl font-bold uppercase tracking-tight text-gray-900 flex items-center gap-4"
        >
          <img
            src={logoUnesa}
            alt="Unesa Logo"
            className="hidden lg:inline h-20"
          />
          <img
            src={LogoLarge}
            alt="Career The Explorer Logo"
            className="hidden lg:inline h-24"
          />
          <img src={Logo} alt="CTE Logo" className="lg:hidden h-10" />
        </a>

        <button className="lg:hidden text-gray-900" onClick={toggleNavbar}>
          {isNavbarVisible ? (
            <i className="fas fa-times text-2xl"></i>
          ) : (
            <i className="fas fa-bars text-2xl"></i>
          )}
        </button>

        <AnimatePresence>
          {isNavbarVisible && (
            <motion.div
              className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-5 right-5 text-gray-900"
                onClick={toggleNavbar}
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
              <ul className="space-y-6 text-lg font-semibold">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-orange-500">
                    Tentang Tes Bakat
                  </a>
                </li>
                <li>
                  <a href="#visi-misi" className="hover:text-orange-500">
                    Visi & Misi
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-orange-500">
                    Kontak
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="hidden lg:flex space-x-8 text-lg font-semibold text-gray-900">
          <li>
            <a href="#" className="hover:text-orange-500">
              Beranda
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-orange-500">
              Tentang Tes Bakat
            </a>
          </li>
          <li>
            <a href="#visi-misi" className="hover:text-orange-500">
              Visi & Misi
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-orange-500">
              Kontak
            </a>
          </li>
        </ul>
      </motion.nav>

      {/* Header */}
      <section className="text-gray-800 body-font bg-amber-100 pt-[70px] relative overflow-hidden">
        {/* Dekorasi Latar */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-orange-400 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-300 rounded-full opacity-30 blur-2xl"></div>

        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center relative z-10">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <motion.h1
              className="title-font sm:text-4xl text-5xl mb-6 font-bold text-gray-900"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Temukan Potensi Karier Terbaikmu
            </motion.h1>

            <motion.p
              className="text-lg max-w-xl mb-8 text-gray-800 text-justify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              "Career The Explorer" adalah platform inovatif yang dirancang
              untuk membantu Anda menemukan dan mengeksplorasi potensi karier
              terbaik. Dengan tes psikologi berbasis sains, kami memberikan
              wawasan mendalam dan akurat, sehingga Anda dapat merancang masa
              depan profesional dengan lebih percaya diri dan terarah.✨🚀
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <button
                type="button"
                className="inline-flex text-white bg-orange-600 border-0 py-3 px-8 rounded-full font-semibold hover:bg-orange-500 transition duration-300 text-lg shadow-lg hover:shadow-xl"
                onClick={() => navigate("/peserta")}
              >
                <span>Mulai Tes Sekarang</span>
              </button>
            </motion.div>
          </div>
          <motion.div
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={MainSvg}
            />
          </motion.div>
        </div>
      </section>
    </header>
  );
}

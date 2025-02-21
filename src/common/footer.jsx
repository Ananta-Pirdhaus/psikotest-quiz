import React from "react";
import { motion } from "framer-motion";
import LogoLarge from "../assets/logo_large.png";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t  border-light-gray" id="contact">
      {/* Footer Top Section */}
      <div className="py-10 container mx-auto grid gap-8 lg:grid-cols-3 text-center lg:text-left">
        {/* Brand Info */}
        <div className="max-w-md mx-auto lg:mx-0 text-dark-gray">
          <a href="#" className="block mb-4">
            <img
              src={window.innerWidth >= 1024 ? LogoLarge : Logo}
              alt="Career The Explorer"
              className="mx-auto lg:mx-0 w-32 lg:w-48"
            />
          </a>
          <p className="text-gray-600">
            Platform layanan tes psikotes online interaktif untuk membantu
            mengetahui dan memahami potensi, bakat, minat, serta keahlian
            penting dalam pengembangan karir profesional.
          </p>
        </div>

        {/* Support Links */}
        <div className="text-dark-gray text-center">
          <h5 className="mb-4 uppercase text-lg font-bold">Supports</h5>
          <ul className="space-y-2">
            {[
              "Settings & Privacy",
              "Help & Support",
              "Live Actions",
              "Our News",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-md mx-auto lg:mx-0 text-dark-gray">
          <h5 className="mb-4 uppercase text-lg font-bold">Newsletter</h5>
          <p className="text-gray-600">
            Subscribe untuk mendapatkan update & berita terbaru.
          </p>
          <form className="mt-4 flex w-full max-w-sm">
            <input
              type="email"
              className="flex-1 px-4 py-2 bg-light-gray text-dark-gray border border-gray-300 outline-none"
              placeholder="Your email address"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-orange-500 px-4 text-white flex items-center justify-center transition duration-300"
              aria-label="Subscribe"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </motion.button>
          </form>
        </div>
      </div>
    </footer>
  );
}

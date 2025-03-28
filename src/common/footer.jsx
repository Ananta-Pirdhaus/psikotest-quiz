import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LogoLarge from "../assets/logo_large.png";
import Logo from "../assets/logo.png";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}setting`;

export default function Footer() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.data.status === "success") {
          setContact(response.data.data.contact);
        }
      })
      .catch((err) => {
        setError("Gagal mengambil data kontak.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <footer className="bg-white border-t border-light-gray" id="contact">
      {/* Footer Top Section */}
      <div className="py-10 container mx-auto grid gap-8 lg:grid-cols-2 text-center lg:text-left">
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
            Platform layanan tes minat bakat online interaktif untuk membantu
            mengetahui dan memahami potensi, bakat, minat, serta keahlian
            penting dalam pengembangan karir profesional.
          </p>
        </div>

        {/* Contact Info (Replacing Support Links) */}
        <div className="text-dark-gray flex text-start justify-center">
          <div className="flex-col">
            <h5 className="mb-4 uppercase text-lg font-bold">Kontak</h5>
            {loading ? (
              <p className="text-gray-600">Memuat kontak...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="space-y-2">
                <li>
                  <span className="font-bold">Email:</span>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-600 hover:text-orange-500 transition duration-300"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Telepon:</span>{" "}
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-gray-600 hover:text-orange-500 transition duration-300"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Alamat:</span>{" "}
                  <p className="text-gray-600">{contact.address}</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

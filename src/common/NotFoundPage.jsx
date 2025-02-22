import React from "react";
import NotFoundImages from "../common/404.svg";

const NotFoundPage = () => {
  return (
    <>
      {/* Halaman tidak ditemukan */}
      <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8 text-center">
            <div className="text-7xl text-amber-500 font-dark font-extrabold mb-8">
              404
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Halaman yang Anda cari tidak dapat ditemukan
            </p>
            <p className="text-lg md:text-xl mb-8">
              Mungkin URL yang Anda masukkan salah, atau halaman tersebut telah
              dipindahkan atau dihapus.
            </p>
            <a
              href="/"
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-amber-600 active:bg-red-600 hover:bg-red-700"
            >
              Kembali ke Beranda
            </a>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12 text-center">
            <img src={NotFoundImages} alt="Halaman tidak ditemukan" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Footer Top with Light Background and Primary Colors */}
      <div className="bg-white py-[78px] border-t-[1px] border-solid border-t-light-gray">
        <div className="container grid gap-6 lg:grid-cols-[2fr_repeat(3,1fr)] text-center lg:text-start">
          {/* First Footer Item (Brand) */}
          <div className="text-dark-gray">
            <a
              href="#"
              className="text-dark-gray uppercase block whitespace-nowrap font-bold text-[32px] mb-4"
            >
              Career The <span className="text-orange-500">Explorer</span>
            </a>
            <p className="max-w-[380px] mx-auto lg:ml-0 text-dark-gray">
              Career The Explorer adalah platform yang menyediakan layanan tes
              psikotest untuk membantu Anda mengetahui potensi dan keahlian
              dalam karir. Temukan jalur karir terbaik untuk Anda melalui tes
              yang dirancang secara profesional.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-dark-gray">
            <h5 className="mb-3 uppercase text-[20px] tracking-[.03em] font-bold">
              quick link
            </h5>
            <ul className="space-y-[6px]">
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Gaming
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Social Network
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Supports Section */}
          <div className="text-dark-gray">
            <h5 className="mb-3 uppercase text-[20px] tracking-[.03em] font-bold">
              supports
            </h5>
            <ul className="space-y-[6px]">
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Settings & Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Live Actions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-dark-gray opacity-70 hover:opacity-100 transition ease-in-out duration-300"
                >
                  Our News
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="text-dark-gray">
            <h5 className="mb-3 uppercase text-[20px] tracking-[.03em] font-bold">
              newsletter
            </h5>
            <p className="max-w-[380px] mx-auto lg:ml-0 text-dark-gray">
              Subscribe to our newsletter to get our latest updates & news.
            </p>
            <form className="flex items-stretch h-12 w-full mx-auto mt-4 transition ease-in-out duration-300">
              <div className="h-12 max-w-[284px] w-full mx-auto lg:ml-0 flex items-stretch transition ease-in-out duration-300">
                <input
                  type="text"
                  className="bg-light-gray px-[22px] flex-1 text-dark-gray outline-none"
                  placeholder="Your email address"
                />
                <button
                  className="bg-orange-500 inline-flex items-center justify-center w-12 hover:scale-[1.1] text-white transition ease-in-out duration-300"
                  type="button"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

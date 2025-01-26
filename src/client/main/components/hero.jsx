import React from "react";
import LogoUnesa from "../../../common/logo-unesa.png";

export default function VisiMisi() {
  return (
    <section className="py-16 bg-sky-blue" >
      <div className="container">
        <div className="sc-title">
          <h3>
            Visi dan <span className="text-white">Misi</span>
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center mt-[60px] gap-8">
          {/* Bagian kiri (foto) */}
          <div className="w-full md:w-1/2">
            <img
              src={LogoUnesa}
              alt="Career The Explorer"
              className="w-full max-w-[500px] h-auto rounded-lg object-cover"
            />
          </div>

          {/* Bagian kanan (visi dan misi) */}
          <div className="w-full md:w-1/2">
            <div className="p-4 bg-white shadow-lg rounded-lg border-dashed border-2 border-gray-400">
              <h4 className="text-2xl font-bold mb-4">Visi</h4>
              <p className="text-lg">
                Menjadi platform terpercaya yang membantu individu dalam
                mengeksplorasi karier mereka melalui tes psikologi yang akurat
                dan relevan, serta memberikan wawasan yang mendalam untuk
                pengembangan diri dan keputusan karier.
              </p>
            </div>

            <div className="p-4 bg-white shadow-lg rounded-lg mt-8 border-dashed border-2 border-gray-400">
              <h4 className="text-2xl font-bold mb-4">Misi</h4>
              <p className="text-lg">
                1. Menyediakan layanan tes psikologi yang terstandarisasi dan
                mudah diakses oleh semua kalangan.
                <br />
                2. Membantu individu menemukan potensi dan keahlian mereka untuk
                memilih jalur karier yang tepat.
                <br />
                3. Memberikan rekomendasi yang berbasis data psikologis yang
                dapat diandalkan untuk pengembangan karier.
                <br />
                4. Mengedukasi masyarakat mengenai pentingnya tes psikologi
                dalam pengambilan keputusan karier yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

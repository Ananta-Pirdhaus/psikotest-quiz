import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faUserCog,
  faChartLine,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export default function Banner() {
  return (
    <div id="features" className="bg-gray-300">
      <section className="py-16 bg-gradient-to-b from-amber-100 to-amber-500">
        <div className="container mx-auto px-6">
          <div className="join-title text-center py-5 text-amber-800">
            <h1 className="font-bold">
              Pentingnya <span className="text-amber-600">Psikotes</span>
            </h1>
            <div className="line bg-amber-400 w-24 h-1 mx-auto mt-2"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: 1,
                title: "Mengukur Kecerdasan",
                description:
                  "Psikotes membantu menilai kemampuan intelektual seseorang, seperti pemecahan masalah, logika, dan daya ingat.",
                features: ["Problem-solving", "Logical reasoning", "Memory"],
                icon: faBrain,
              },
              {
                id: 2,
                title: "Menilai Kepribadian",
                description:
                  "Tes ini memberikan gambaran tentang sifat individu, pola perilaku, serta bagaimana seseorang berinteraksi dengan lingkungan.",
                features: [
                  "Sifat individu",
                  "Perilaku sosial",
                  "Kecocokan pekerjaan",
                ],
                icon: faUserCog,
              },
              {
                id: 3,
                title: "Menentukan Potensi Karier",
                description:
                  "Psikotes dapat membantu menentukan jalur karier yang sesuai berdasarkan kemampuan dan minat seseorang.",
                features: [
                  "Analisis minat",
                  "Kecocokan pekerjaan",
                  "Perencanaan karier",
                ],
                icon: faChartLine,
              },
              {
                id: 4,
                title: "Mengasah Kreativitas",
                description:
                  "Beberapa tes psikologi mengukur kreativitas dan kemampuan berpikir out-of-the-box dalam menyelesaikan masalah.",
                features: [
                  "Pemikiran inovatif",
                  "Kreativitas",
                  "Problem-solving",
                ],
                icon: faLightbulb,
              },
            ].map((info) => (
              <div
                className="game-card rounded-lg bg-amber-100 shadow-lg p-6 transform transition duration-300 hover:scale-105"
                key={info.id}
              >
                <div className="flex justify-center">
                  <div className="icon-container w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <FontAwesomeIcon
                      icon={info.icon}
                      size="2x"
                      className="text-amber-600"
                    />
                  </div>
                </div>
                <div className="game-card-bottom mt-4 text-center">
                  <h4 className="text-amber-900 text-lg font-semibold">
                    {info.title}
                  </h4>
                  <p className="text-amber-900 text-sm mt-2">
                    {info.description}
                  </p>
                  <div className="mt-3">
                    <p className="font-semibold text-amber-800">Manfaat:</p>
                    <ul className="text-amber-800 list-disc pl-4 text-sm">
                      {info.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faClipboardList,
  faUserCog,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Banner() {
  return (
    <div id="features" className="bg-gray-300">
      <section className="py-16 bg-gradient-to-b from-amber-100 to-orange-500">
        <div className="container">
          <div className="join-title text-center py-5 text-orange-600">
            <h1>
              Career The Explorer{" "}
              <span className="text-orange-400">Psychotests</span>
            </h1>
            <div className="line bg-orange-300"></div>
          </div>

          <div className="game-card-list grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                title: "Cognitive Ability Test",
                description:
                  "Tes ini mengukur kemampuan kognitif, termasuk pemecahan masalah, kecepatan berpikir, dan kemampuan untuk belajar hal-hal baru.",
                features: [
                  "Problem-solving skills",
                  "Quick thinking",
                  "Learning ability",
                ],
                icon: faBrain,
              },
              {
                id: 2,
                title: "Personality Test",
                description:
                  "Tes ini mengevaluasi kepribadian Anda, memberi gambaran mengenai sifat, preferensi, dan kecenderungan pribadi Anda dalam konteks pekerjaan.",
                features: [
                  "Personality traits",
                  "Behavioral tendencies",
                  "Career preferences",
                ],
                icon: faUserCog,
              },
            ].map((test) => (
              <div
                className="game-card rounded-lg bg-orange-100 shadow-md"
                key={test.id}
              >
                <div className="game-card-top img-fit-cover">
                  <div className="icon-container text-center py-10">
                    <FontAwesomeIcon
                      icon={test.icon}
                      size="3x"
                      className="text-orange-500"
                    />
                  </div>
                </div>
                <div className="game-card-bottom p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start flex-wrap">
                    <div className="py-1">
                      <h4 className="text-orange-600 uppercase game-card-title">
                        {test.title}
                      </h4>
                      <p className=" text-orange-800">
                        {test.description}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 py-1 flex gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-300">☆</span>
                    </div>
                  </div>
                  <div className="block-wrap flex justify-between items-end">
                    <div className="details-group">
                      <p className="font-semibold text-orange-600">Features:</p>
                      <ul className="text-orange-500 list-disc pl-4">
                        {test.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
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

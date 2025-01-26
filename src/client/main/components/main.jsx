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
    <div id="features">
      <section className="py-16 sc-popular bg-violet-dark-active">
        <div className="container">
          <div className="sc-title">
            <h3>
              Career The Explorer <span>Psychotests</span>
            </h3>
            <div className="line"></div>
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
              {
                id: 3,
                title: "Logic and Reasoning Test",
                description:
                  "Tes ini dirancang untuk mengukur kemampuan Anda dalam berpikir logis dan menganalisis situasi dengan cara yang terstruktur.",
                features: [
                  "Analytical skills",
                  "Logical thinking",
                  "Attention to detail",
                ],
                icon: faClipboardList,
              },
              {
                id: 4,
                title: "Career Interests Test",
                description:
                  "Tes ini membantu Anda memahami minat karir Anda dan mengeksplorasi bidang pekerjaan yang sesuai dengan minat tersebut.",
                features: [
                  "Career preferences",
                  "Job satisfaction",
                  "Interest alignment",
                ],
                icon: faClock,
              },
              {
                id: 5,
                title: "Emotional Intelligence Test",
                description:
                  "Tes ini menilai seberapa baik Anda mengenali, mengelola, dan mengontrol emosi Anda sendiri serta berinteraksi dengan orang lain.",
                features: ["Emotional awareness", "Self-regulation", "Empathy"],
                icon: faBrain,
              },
              {
                id: 6,
                title: "Skills Assessment Test",
                description:
                  "Tes ini mengukur keterampilan teknis dan keahlian khusus yang relevan dengan berbagai bidang karir.",
                features: [
                  "Technical skills",
                  "Problem-solving ability",
                  "Specialized knowledge",
                ],
                icon: faClipboardList,
              },
            ].map((test) => (
              <div className="game-card rounded-none" key={test.id}>
                <div className="game-card-top img-fit-cover">
                  <div className="icon-container text-center py-10">
                    <FontAwesomeIcon
                      icon={test.icon}
                      size="3x"
                      className="text-white"
                    />
                  </div>
                </div>
                <div className="game-card-bottom">
                  <div className="flex flex-col sm:flex-row justify-between items-start flex-wrap">
                    <div className="py-1">
                      <h4 className="text-white uppercase game-card-title">
                        {test.title}
                      </h4>
                      <p className="para-text">{test.description}</p>
                    </div>
                    <div className="star-rating mt-2 sm:mt-0 py-1">
                      <img src="../assets/icons/star-green.svg" alt="" />
                      <img src="../assets/icons/star-green.svg" alt="" />
                      <img src="../assets/icons/star-green.svg" alt="" />
                      <img src="../assets/icons/star-green.svg" alt="" />
                      <img src="../assets/icons/star-green-half.svg" alt="" />
                    </div>
                  </div>

                  <div className="block-wrap flex justify-between items-end">
                    <div className="details-group">
                      <p className="font-semibold">Features:</p>
                      <ul>
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

          <div className="flex justify-center mt-[60px]">
            <a href="#" className="section-btn">
              See More Psychotests
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

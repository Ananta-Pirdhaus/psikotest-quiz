import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SaveJawaban = ({
  selectedAnswer,
  IdSession,
  questionId,
  BASE_URL,
  isSubmitting,
  quizType,
}) => {
  const navigate = useNavigate();
  const [storedAnswers, setStoredAnswers] = useState([]); // Menggunakan useState untuk menyimpan jawaban

  useEffect(() => {
    if (isSubmitting) {
      // Kirimkan semua jawaban hanya jika isSubmitting bernilai true
      submitAllAnswers(IdSession, storedAnswers);
    } else if (selectedAnswer) {
      if (Array.isArray(selectedAnswer) && selectedAnswer.length > 0) {
        // Menyimpan jawaban untuk Multiple
        setStoredAnswers(selectedAnswer);

        // Cek jika quizType adalah 'multiple', baru periksa jumlah jawaban
        if (quizType === "multiple" && selectedAnswer.length === 3) {
          sendAnswerToServer(selectedAnswer); // Kirim jawaban jika sudah 3
          updateAnswerToServer(selectedAnswer); // Update jika jawaban sudah ada
        } else if (quizType === "multiple") {
          toast.error(
            "Anda harus memilih tepat 3 jawaban untuk pertanyaan ini.",
            {
              position: "top-right",
              autoClose: 2500,
            }
          );
        } else {
          sendAnswerToServer(selectedAnswer); // Untuk Single atau tipe lain, langsung kirim jawaban
        }
      } else if (typeof selectedAnswer === "string") {
        setStoredAnswers([selectedAnswer]); // Single option converted to array
        sendAnswerToServer([selectedAnswer]); // Kirim jawaban langsung
      }
    }
  }, [isSubmitting, selectedAnswer, quizType]);

  const submitAllAnswers = async (idSession, answers) => {
    if (!idSession || !Array.isArray(answers) || answers.length === 0) {
      toast.error(
        "Sesi atau jawaban tidak valid. Harap periksa kembali data Anda.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      return;
    }

    const bodyReq = {
      session: idSession,
      answers,
    };

    try {
      const response = await axios.get(
        `${BASE_URL}jawaban/save/${IdSession}`,
        bodyReq
      );
      if (response.data?.status === "error") {
        toast.error(response.data?.message || "Pengiriman jawaban gagal!", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      toast.success("Semua jawaban berhasil dikirim!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate(`/finish-quiz`);

      localStorage.removeItem("checkpointPage");
      localStorage.removeItem("quizType");
    } catch (error) {
      toast.error("Gagal mengirim jawaban. Silakan coba lagi.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const sendAnswerToServer = (options) => {
    if (!validateData(options, IdSession, questionId)) return;

    // Untuk tipe "multiple", pastikan jawaban terdiri dari 3 pilihan
    if (quizType === "multiple" && options.length !== 3) {
      toast.error("Anda harus memilih tepat 3 jawaban untuk pertanyaan ini..", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }

    const bodyReq = {
      session: IdSession,
      answer: {
        question: questionId,
        option: options,
      },
    };

    axios
      .post(`${BASE_URL}jawaban`, bodyReq)
      .then(() => {
        toast.success("Jawaban berhasil dikirim!", {
          position: "top-right",
          autoClose: 2500,
        });
      })
      .catch((error) => {
        if (
          error.response?.data?.errors?.["answer.question"]?.includes(
            "Pertanyaan yang dipilih tidak valid."
          )
        ) {
          toast.error(
            "ID pertanyaan tidak valid. Harap periksa kembali data Anda..",
            {
              position: "top-right",
              autoClose: 2500,
            }
          );
        } else if (
          error.response?.data?.errors?.["answer.question"]?.includes(
            "Pertanyaan sudah ada sebelumnya."
          )
        ) {
          updateAnswerToServer(options); // Update if the answer already exists
        }
      });
  };

  const updateAnswerToServer = (options) => {
    const bodyReq = {
      session: IdSession,
      answer: {
        question: questionId,
        option: options,
      },
    };

    axios
      .put(`${BASE_URL}jawaban`, bodyReq)
      .then(() => {
        toast.success("Jawaban berhasil diperbarui!", {
          position: "top-right",
          autoClose: 2500,
        });
      })
      .catch(() => {
        // toast.error("Error updating your answer!", {
        //   position: "top-right",
        //   autoClose: 2500,
        // });
      });
  };

  const validateData = (options, IdSession, questionId) => {
    if (!IdSession || typeof IdSession !== "string") {
      toast.error("ID sesi tidak valid.", {
        position: "top-right",
        autoClose: 2500,
      });
      return false;
    }

    if (!questionId || typeof questionId !== "string") {
      toast.error("ID pertanyaan tidak valid.", {
        position: "top-right",
        autoClose: 2500,
      });
      return false;
    }

    if (!options || !Array.isArray(options) || options.length === 0) {
      toast.error("Pilihan jawaban tidak valid.", {
        position: "top-right",
        autoClose: 2500,
      });
      return false;
    }

    return true;
  };

  return null;
};

export default SaveJawaban;

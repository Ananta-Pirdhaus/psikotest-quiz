import React, { useEffect } from "react";
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
  let storedAnswers = []; // Variabel untuk menyimpan jawaban sementara

  useEffect(() => {
    if (isSubmitting) {
      // Kirimkan semua jawaban hanya jika isSubmitting bernilai true
      submitAllAnswers(IdSession, selectedAnswer);
    } else if (selectedAnswer) {
      if (Array.isArray(selectedAnswer) && selectedAnswer.length > 0) {
        // Menyimpan jawaban untuk Multiple
        storedAnswers = selectedAnswer;

        // Cek jika quizType adalah 'multiple', baru periksa jumlah jawaban
        if (quizType === "multiple" && storedAnswers.length === 3) {
          sendAnswerToServer(storedAnswers); // Kirim jawaban jika sudah 3
        } else if (quizType === "multiple") {
          toast.error("You must select exactly 3 answers for this question.", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          sendAnswerToServer(storedAnswers); // Untuk Single atau tipe lain, langsung kirim jawaban
        }
      } else if (typeof selectedAnswer === "string") {
        sendAnswerToServer([selectedAnswer]); // Single option converted to array
      }
    }
  }, [isSubmitting, selectedAnswer]);

  const submitAllAnswers = async (answers) => {
    const idSession = localStorage.getItem("IdSession");
    const checkpointPage = localStorage.getItem("checkpointPage");

    if (!idSession || !Array.isArray(answers) || answers.length === 0) {
      toast.error("Invalid session or answers. Please check your data.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const bodyReq = {
      session: idSession,
      answers,
    };

    try {
      const response = await axios.get(`${BASE_URL}jawaban/save/${idSession}`, {
        params: bodyReq,
      });

      if (response.data?.status === "error") {
        toast.error(response.data?.message || "Submission failed!", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      // Clear localStorage after successful submission
      localStorage.removeItem("IdSession");
      localStorage.removeItem("checkpointPage");

      toast.success("All answers submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate(`/hasil-quiz/${idSession}`);
    } catch (error) {
      toast.error("Failed to submit answers. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const sendAnswerToServer = (options) => {
    if (!validateData(options, IdSession, questionId)) return;

    // Untuk tipe "multiple", pastikan jawaban terdiri dari 3 pilihan
    if (quizType === "multiple" && options.length !== 3) {
      toast.error("You must select exactly 3 answers for this question.", {
        position: "top-center",
        autoClose: 3000,
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
        toast.success("Answer submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (
          error.response?.data?.errors?.["answer.question"]?.includes(
            "Pertanyaan yang dipilih tidak valid."
          )
        ) {
          toast.error("Invalid question ID. Please check your data.", {
            position: "top-center",
            autoClose: 3000,
          });
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
        toast.success("Answer updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch(() => {
        toast.error("Error updating your answer!", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const validateData = (options, IdSession, questionId) => {
    if (!IdSession || typeof IdSession !== "string") {
      toast.error("Invalid session ID.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    if (!questionId || typeof questionId !== "string") {
      toast.error("Invalid question ID.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    if (!options || !Array.isArray(options) || options.length === 0) {
      toast.error("Invalid options selected.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  return null;
};

export default SaveJawaban;

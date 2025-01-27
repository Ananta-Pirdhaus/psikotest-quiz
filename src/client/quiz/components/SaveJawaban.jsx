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
  console.log("selectedAnswer: ", selectedAnswer);
  useEffect(() => {
    if (isSubmitting) {
      // Kirimkan semua jawaban hanya jika isSubmitting bernilai true
      submitAllAnswers(IdSession, selectedAnswer);
    } else if (selectedAnswer) {
      if (Array.isArray(selectedAnswer) && selectedAnswer.length > 0) {
        sendAnswerToServer(selectedAnswer); // Multiple options
      } else if (typeof selectedAnswer === "string") {
        sendAnswerToServer([selectedAnswer]); // Single option converted to array
      }
    }
  }, [isSubmitting, selectedAnswer]);

  const submitAllAnswers = async (idSession, answers) => {
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

    console.log("Submitting all answers with body:", bodyReq);

    try {
      const response = await axios.get(
        `${BASE_URL}jawaban/save/${IdSession}`,
        bodyReq
      );
      console.log("Submission response:", response.data);

      if (response.data?.status === "error") {
        toast.error(response.data?.message || "Submission failed!", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      toast.success("All answers submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate(`/survey/${IdSession}`);
    } catch (error) {
      console.error("Error submitting answers:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to submit answers. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });

      if (
        error.response?.data?.status === "error" &&
        error.response?.data?.message === "Sesi anda telah berakhir."
      ) {
        toast.error("Session expired. Please log in again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  const sendAnswerToServer = (options) => {
    if (!validateData(options, IdSession, questionId)) return;

    // Enforce exactly 3 answers for multiple-choice questions
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
        question: questionId, // Ensure it's the current question ID
        option: options, // Only the options for the current question
      },
    };

    // console.log(
    //   "Sending POST request with body:",
    //   JSON.stringify(bodyReq, null, 2)
    // );

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
        } else {
          toast.error("Error submitting your answer!", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      });
  };

  const updateAnswerToServer = (options) => {
    if (!validateData(options, IdSession, questionId)) return;

    // Make sure the new answer options are relevant to the current question
    const bodyReq = {
      session: IdSession,
      answer: {
        question: questionId, // Ensure it's the current question ID
        option: options, // Only the options for the current question
      },
    };

    // console.log(
    //   "Sending PUT request with body:",
    //   JSON.stringify(bodyReq, null, 2)
    // );

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
      console.error("Invalid session ID:", IdSession);
      toast.error("Invalid session ID.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    if (!questionId || typeof questionId !== "string") {
      console.error("Invalid question ID:", questionId);
      toast.error("Invalid question ID.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    if (!options || !Array.isArray(options) || options.length === 0) {
      console.error("Invalid options:", options);
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

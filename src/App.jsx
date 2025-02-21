import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./scroll-to-top";
import DynamicHead from "./DynamicHead";
import { HelmetProvider } from "react-helmet-async";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Lazy load pages
const HomePage = lazy(() => import("./client/main/pages/main"));
const TestPage = lazy(() => import("./client/quiz/pages/test"));
const UserPage = lazy(() => import("./client/users/index"));
const SurveyPage = lazy(() => import("./client/survei/index"));
const FinishQuizPage = lazy(() => import("./client/quiz/pages/finishTest"));
const ResultQuizPage = lazy(() => import("./client/quiz/result/index"));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Halaman Home - Dapat Diindeks */}
          <Route
            path="/"
            element={
              <>
                <DynamicHead />
                <HomePage />
              </>
            }
          />

          {/* Halaman lain - Tidak Diindeks */}
          <Route
            path="/test/:sessionId"
            element={
              <>
                <DynamicHead noIndex />
                <TestPage />
              </>
            }
          />
          <Route
            path="/peserta"
            element={
              <>
                <DynamicHead noIndex />
                <UserPage />
              </>
            }
          />
          <Route
            path="/finish-quiz"
            element={
              <>
                <DynamicHead noIndex />
                <FinishQuizPage />
              </>
            }
          />
          <Route
            path="/survey/:sessionId"
            element={
              <>
                <DynamicHead noIndex />
                <SurveyPage />
              </>
            }
          />
          <Route
            path="/hasil-quiz/:idSession"
            element={
              <>
                <DynamicHead noIndex />
                <ResultQuizPage />
              </>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

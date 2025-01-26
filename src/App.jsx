import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./scroll-to-top";
import "@fortawesome/fontawesome-free/css/all.min.css";


// Lazy load pages
const HomePage = lazy(() => import("./client/main/pages/main"));
const TestPage = lazy(() => import("./client/quiz/pages/test"));
const LoginPage = lazy(() => import("./client/auth/login"));
const UserPage = lazy(() => import("./client/users/index"));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test/:sessionId" element={<TestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/peserta" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

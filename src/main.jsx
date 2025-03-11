import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Banner from "./client/main/components/banner.jsx";
import Loading from "./loading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Banner />
      <App />
    </Suspense>
  </StrictMode>
);

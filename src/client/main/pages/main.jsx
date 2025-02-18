import React from "react";
import Hero from "../components/hero";
import Navbar from "../../../common/navbar";
import Footer from "../../../common/footer";
import MainSection from "../components/main";

export default function AboutPage() {
  return (
    <React.Fragment>
      <Navbar />
      <MainSection />
      <Hero />
      <Footer />
    </React.Fragment>
  );
}

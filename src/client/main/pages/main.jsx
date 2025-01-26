import React from "react";
import Hero from "../components/hero";
import Navbar from "../../../common/navbar";
import Footer from "../../../common/footer";
import MainSection from "../components/main";
import FeatureSection from "../components/features";
import VisiSection from "../components/visi-misi";

export default function AboutPage() {
  return (
    <React.Fragment>
      <Navbar />
      <MainSection />
      <Hero />
      <FeatureSection />
      <VisiSection />
      <Footer />
    </React.Fragment>
  );
}

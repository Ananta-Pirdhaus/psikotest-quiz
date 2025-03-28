import React from "react";
import Hero from "../components/hero";
import Navbar from "../../../common/navbar";
import Footer from "../../../common/footer";
import MainSection from "../components/main";
import Banner from "../components/banner";

export default function AboutPage() {
  return (
    <React.Fragment>
      <Banner />
      <Navbar />
      <MainSection />
      <Hero />
      <Footer />
    </React.Fragment>
  );
}

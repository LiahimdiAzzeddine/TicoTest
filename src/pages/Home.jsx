import React from "react";
import Transparence from "../components/sectionsHome/Transparence";
import Etap1 from "../components/sectionsHome/Etap1";
import HomeSection from "../Templates/HomeSection";
import HomeContent from "../components/sectionsHome/HomeContent";
import Etape2Et3 from "../components/sectionsHome/Etape2Et3";
import Etape4 from "../components/sectionsHome/Etape4";
import Etape5 from "../components/sectionsHome/Etape5";
import Bonus from "../components/sectionsHome/Bonus";
import TestimonialSlider from "../components/sectionsHome/TestimonialSlider";
import { CarouselLogos } from "../components/sectionsHome/CarouselLogos";
import CarouselTestimonials from "../components/sectionsHome/CarouselTestimonials";
export default function Home() {
  return (
    <>

      <HomeContent />
      <HomeSection>
        <Transparence />
      </HomeSection>

      <HomeSection pb={"pb-14"}>
        <Etap1 />
      </HomeSection>
      <div
        className="relative bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/images/visuels-site-web-V8.1-08-4.png')",
          backgroundSize: "130px 650px",
          backgroundPosition: "left bottom", // ⬅️ Positionnement à bas gauche
        }}
      >
        <div
          className="relative bg-no-repeat bg-right bg-contain"
          style={{
            backgroundImage: "url('/images/visuels-site-web-V8.1-08-3.png')",
            backgroundSize: "130px 650px",

          }}
        >
          <HomeSection pb={"pb-14"}>
            <Etape2Et3 />
          </HomeSection>
          <HomeSection pb={"pb-14"}>
            <Etape4 />
          </HomeSection></div>
        <HomeSection >
          <Etape5 />
        </HomeSection></div>
      <HomeSection>
        <Bonus />
      </HomeSection>
      <HomeSection>
        <TestimonialSlider />
      </HomeSection>
      <HomeSection>
        <CarouselLogos />
      </HomeSection>
      <HomeSection>
        <CarouselTestimonials />
      </HomeSection>
    </>

  );
}

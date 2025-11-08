import React from "react";
import HomeSection from "../Templates/HomeSection";
import ScanProducts from "../components/sectionsAppli/ScanProducts";
import TransparencyInfo from "../components/sectionsAppli/TransparencyInfo";
import RequestBrands from "../components/sectionsAppli/RequestBrands";
import Decryptages from "../components/sectionsAppli/Decryptages";
import CommittedTeam from "../components/sectionsAppli/CommittedTeam";
import Eengagement from "../components/sectionsAppli/Eengagement";
import MonthlyTips from "../components/sectionsAppli/MonthlyTips";
import TitRecipes from "../components/sectionsAppli/TitRecipes";
import StartSection from "../Templates/StartSection";
import StepTitle from "../components/ui/StepTitle";
import HomeContent from "../components/sectionsHome/HomeContent";
import Transparence from "../components/sectionsHome/Transparence";
import Etap1 from "../components/sectionsHome/Etap1";
import Etape2Et3 from "../components/sectionsHome/Etape2Et3";
import Etape4 from "../components/sectionsHome/Etape4";
import Etape5 from "../components/sectionsHome/Etape5";
import Bonus from "../components/sectionsHome/Bonus";
import TestimonialSlider from "../components/sectionsHome/TestimonialSlider";
import CarouselTestimonials from "../components/sectionsHome/CarouselTestimonials";
export default function Application() {
  return <>
        <HomeContent />
        <HomeSection>
        <Transparence />
      </HomeSection>


      <HomeSection >
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
          <HomeSection >
            <Etape2Et3 />
          </HomeSection>
          <HomeSection >
            <Etape4 />
          </HomeSection></div>
        <HomeSection >
          <Etape5 />
        </HomeSection></div>
      <HomeSection>
        <Bonus />
      </HomeSection>
      <HomeSection >
        <TestimonialSlider />
      </HomeSection>

      <HomeSection>
        <CarouselTestimonials />
      </HomeSection>
{/**/}
    <StartSection pb={'md:pb-20 pb-16'} id="scan">
      <ScanProducts />
    </StartSection>
    <HomeSection id="transparence">
      <TransparencyInfo />
    </HomeSection>
    <HomeSection  id="evaluation">
      <Decryptages />
    </HomeSection>
    <HomeSection>
      <CommittedTeam />
    </HomeSection>
      <HomeSection id="solliciter">
     <RequestBrands  />
    </HomeSection>
    {/* <div className="md:pb-40 pb-24">
      <div id="solliciter" className="flex flex-col md:flex-row items-center justify-center px-3 md:px-5 lg:px-6 max-w-screen-xl 2xl:max-w-screen-2xl mx-auto  mb-12 md:mb-0 ">
        <div className="max-w-6xl flex-col flex items-center justify-center w-full">
          <div className="w-full ">
            <StepTitle center={false}>
              <span className="text-[#50916e]">Solliciter les&nbsp;</span>
              <span className="text-[#ff8200] font-bold">marques</span>
            </StepTitle>
            </div>
            </div>
      </div>
      <div
        id="solliciter"
        className="flex flex-col md:flex-row items-center justify-around gap-y-5 md:gap-y-0 px-3 md:px-5 lg:px-6 pb-4 max-w-screen-xl 2xl:max-w-screen-2xl mx-auto md:min-h-[45rem] 2xl:min-h-[50rem] relative "
      >
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url("/images/site tico fond vert et blanc.png")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="absolute inset-0 md:hidden">
          <div className="absolute inset-0 bg-[#50916e]">
            <div className="absolute inset-x-4 inset-y-8 bg-white rounded-2xl shadow-lg"></div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <RequestBrands />
        </div>
      </div>
    </div> */}
    <HomeSection id="engagement">
      <Eengagement/>
    </HomeSection>
    <HomeSection   id="tips">
      <MonthlyTips />
    </HomeSection>
    <HomeSection  id="recipes">
      <TitRecipes />
    </HomeSection>

     <div className="mb-32"></div>

  </>;
}

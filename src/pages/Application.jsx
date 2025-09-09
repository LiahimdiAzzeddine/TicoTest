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
export default function Application() {
  return <>
    <StartSection pb={'md:pb-20 pb-16'}>
      <ScanProducts />
    </StartSection>
    <HomeSection >
      <TransparencyInfo />
    </HomeSection>
    <HomeSection  id="evaluation">
      <Decryptages />
    </HomeSection>
    <HomeSection>
      <CommittedTeam />
    </HomeSection>
      <HomeSection>
     <RequestBrands />
    </HomeSection>
    {/* <div className="md:pb-40 pb-24">
      <div id="solliciter" className="flex flex-col md:flex-row items-center justify-center px-3 md:px-5 lg:px-6 max-w-screen-xl 2xl:max-w-screen-2xl mx-auto  mb-12 md:mb-0 ">
        <div className="max-w-6xl flex-col flex items-center justify-center w-full">
          <div className="w-full ">
            <StepTitle center={false}>
              <span className="text-[#50916e]">Solliciter les&nbsp;</span>
              <span className="text-[#ff8300] font-bold">marques</span>
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
      <Eengagement  />
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

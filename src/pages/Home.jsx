import React from "react";
import HomeSection from "../Templates/HomeSection";
import TransparenceTri from "../components/TransparenceTri";
import Home2Content from "../components/sectionsHome/Home2Content.JSX";
export default function Home() {
  return (
    <>
      <Home2Content />
      <HomeSection>
      <TransparenceTri/>
      </HomeSection>
     <div className="mb-32"></div>
    </>

  );
}

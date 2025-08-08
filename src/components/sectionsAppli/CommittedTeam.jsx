import React from 'react'
import StepTitle from '../ui/stepTitle'

const CommittedTeam = () => {
  return (
    <div className="flex flex-col w-full max-w-6xl gap-8 md:gap-14">
      <StepTitle center={false}>
        <span className="text-[#0a548d]">Une équipe&nbsp;</span>
        <span className="text-[#ff8300] font-bold">engagée</span>{" "}
      </StepTitle>
      <div className="flex flex-col items-center justify-between w-full gap-8 md:gap-12 ">

        {/* Description */}
        <div className="max-w-4xl text-center">
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold">
            Derrière TiCO se cache l'équipe de Foodhea, 6 personnes passionnées qui souhaitent plus que
            tout faire bouger les choses.
          </p>
        </div>

        {/* Bouton */}
        <button
          className="text-xl bg-[#0a548d] text-white px-9 py-2 rounded-lg hover:bg-[#084b7a] transition ArchivoLight"
          onClick={() => {
            window.open("https://www.foodhea.com/origine#team", "_blank");
          }}
        >
          Découvrir l'équipe
        </button>


        {/* Image de l'équipe */}
        <div className="relative md:mt-3">
          <img
            src={"/images/coteconso2_1.png"}
            alt="Smartphone app"
            className="w-full h-44 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default CommittedTeam

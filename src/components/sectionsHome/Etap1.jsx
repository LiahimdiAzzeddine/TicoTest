import React from "react";
import StepTitle from "../ui/StepTitle";
import { useNavigate } from "react-router-dom";

export default function Etap1() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col lg:flex-row items-center md:justify-between gap-6 md:gap-11 w-full max-w-6xl">
        {/* Colonne gauche : texte */}
        <div className="flex flex-col max-w-md gap-6 text-center lg:text-left">
          <StepTitle>
            Étape 1 :<br />
            Téléchargez TiCO et<br />
            scannez vos produits
          </StepTitle>
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
            TiCO est le premier référentiel qui peut évaluer la transparence des marques
          </p>
        </div>

        {/* Image téléphone */}
        <div className="flex items-center justify-center">
          <img className="w-32 md:w-44" src="/images/4.png" alt="Téléphone TiCO" />
        </div>

        {/* Boutons de critères */}
        <div className="flex flex-col gap-4 justify-center items-center text-base w-full">
          {[
            [["Nutrition", "#4e8983"], ["Additifs", "#4e8983"]],
            [["Naturalité", "#7ab1ab"], ["Environnement", "#7ab1ab"]],
            [["Origines", "#add7d1"], ["Labels", "#add7d1"]],
            [["Emballage", "#c3e7e5"], ["Mentions", "#c3e7e5"]],
          ].map((row, i) => (
            <div key={i} className="flex flex-row gap-4 w-full sm:w-auto justify-center">
              {row.map(([label, color], j) => (
                <button
                  key={j}
                  className="text-white px-6 py-2 rounded w-full sm:w-44 ArchivoLight leading-normal font-bold"
                  style={{ backgroundColor: color }}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Jauge de transparence */}
      <div className="flex flex-col items-center justify-center mt-10 w-full max-w-6xl">
        <img src="/images/siteticoechelle.png" className="w-full max-w-6xl" alt="Jauge de transparence" />
        <div className="flex justify-between text-[#0a548d] font-semibold ClashDisplayBold text-xl w-full max-w-3xl px-4 -mt-1 md:-mt-5">
          <span>0%</span>
          <span>100%</span>
        </div>
        <div className="text-[#0a548d] mt-4 text-lg leading-snug relative flex flex-col items-center text-center  ArchivoLight font-bold">
          <img
            src="/images/petitefleche.png"
            className="w-10 absolute right-2 md:right-4 -top-5"
            alt="Illustration"
          />
          <div>Niveau de</div>
          <div>transparence de la marque</div>
        </div>
      </div>

      {/* Bouton En savoir plus */}
      <div className="mt-6">
      <button
      className="text-xl bg-[#0a548d] text-white px-8 py-3 rounded-lg hover:bg-[#084b7a] transition ArchivoLight font-bold"
      onClick={() => navigate("/application")}
    >
      En savoir plus
    </button>

      </div>
    </div>
  );
}

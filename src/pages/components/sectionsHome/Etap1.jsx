import React from "react";
import StepTitle from "../ui/StepTitle";
import { useNavigate } from "react-router-dom";
import { useSelectedIndex } from "../../contexts/SelectedIndexProvider";

export default function Etap1() {
  const navigate = useNavigate();
 const { selectedIndex, setSelectedIndex } = useSelectedIndex();
 const goTo=(index)=>{
    setSelectedIndex(index);
    navigate("/application#transparence")
 }


  return (
    <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 w-full max-w-7xl">
                {/* Colonne gauche : texte */}
                <div className="flex flex-col max-w-lg gap-6 text-center lg:text-left lg:flex-1">
                    <StepTitle>
                        <div>
                       <div className="text-[#ff8200] pb-2">Étape 1 :</div>
                        <div>Téléchargez TiCO</div>
                        <div>et scannez vos</div>
                        <div>produits</div>
                        </div>
                    </StepTitle>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-relaxed font-bold text-start lg:text-left">
                        TiCO est le premier référentiel à encadrer la
                        transparence sur les produits alimentaires.
                    </p>
                </div>

                {/* Image téléphone - centrée et responsive */}
                <div className="flex items-center justify-center lg:flex-shrink-0">
                    <img
                        className="w-40 h-auto md:w-32 lg:w-36 xl:w-36"
                        src="/images/4.png"
                        alt="Application mobile TiCO"
                    />
                </div>

                {/* Boutons de critères - mieux organisés */}
                <div className="flex flex-col gap-3 justify-start items-center lg:items-end text-base w-full lg:w-auto lg:flex-1">
                    {[
                        [
                            ["Nutrition", "#4e8983",7],
                            ["Additifs", "#4e8983",8],
                        ],
                        [
                            ["Naturalité", "#7ab1ab",10],
                            ["Environnement", "#7ab1ab",0],
                        ],
                        [
                            ["Origines", "#add7d1",2],
                            ["Labels", "#add7d1",4],
                        ],
                        [
                            ["Emballage", "#c3e7e5",3],
                            ["Mentions", "#c3e7e5",5],
                        ],
                    ].map((row, i) => (
                        <div
                            key={i}
                            className="flex flex-row gap-3 w-full sm:w-auto justify-center lg:justify-end"
                        >
                            {row.map(([label, color,index], j) => (
                                <button
                                    key={j}
                                    onClick={()=> goTo(index)}
                                    className="text-white px-4 py-2.5 rounded-lg w-full sm:w-40 lg:w-36 xl:w-40 ArchivoLight leading-normal font-bold text-sm lg:text-base transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
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
            className="w-8 md:w-10 absolute -right-2 md:-right-3 -top-3 md:-top-5"
            alt="Illustration"
          />
          <div>Niveau de</div>
          <div>transparence TiCO</div>
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

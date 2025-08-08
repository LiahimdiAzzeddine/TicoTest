import React from "react";
import StepTitle from "../ui/StepTitle";
import { useNavigate } from "react-router-dom";

export default function Etape5() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl">
            {/* Texte étape 5 */}
            <div className="text-[#0a548d] max-w-md text-center md:text-left flex flex-col  gap-6  md:gap-16 flex-1">

                <div className="flex flex-col justify-start items-start gap-6  ">
                    <StepTitle>
                        Étape 5 :<br />
                        Votre engagement est récompensé                    </StepTitle>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
                        Plus vous faites de demandes aux marques plus votre engagement dans la transparence est récompensé&nbsp;!
                    </p>
                    {/* Illustration + Statuts */}
            <div className="flex-1 flex md:hidden justify-center w-full items-center">
                {/* Image téléphone */}
                <img
                    src="/images/step5.png" // remplace par le bon chemin
                    alt="Suivi des demandes"
                    className="w-52 md:w-80 drop-shadow-md"
                />
            </div>
                </div>

                <div>
                    <button className="bg-[#0a548d] text-white shadow text-xl px-8 py-3 rounded-lg hover:bg-[#084b7a] transition ArchivoLight font-bold" onClick={() => navigate("/application#engagement")}>
                        En savoir plus
                    </button>
                </div>
            </div>
            {/* Illustration + Statuts */}
            <div className="flex-1 md:flex justify-center hidden">
                {/* Image téléphone */}
                <img
                    src="/images/step5.png" // remplace par le bon chemin
                    alt="Suivi des demandes"
                    className="w-52 md:w-80 drop-shadow-md"
                />
            </div>
        </div>
    );
}

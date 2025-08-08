import React from "react";
import StepTitle from "../ui/stepTitle";
import { useNavigate } from "react-router-dom";

export default function Etape4() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
            {/* Illustration + Statuts */}
            <div className="flex-1 md:flex justify-center hidden">
                {/* Image téléphone */}
                <img
                    src="/images/step4.png" 
                    alt="Suivi des demandes"
                    className="w-52 md:w-96 drop-shadow-md"
                />
            </div>
            {/* Texte étape 4 */}
            <div className="text-[#0a548d] max-w-md text-center md:text-left flex flex-col gap-6  md:gap-16 flex-1">
                <div className="flex flex-col justify-start items-start gap-6  ">
                    <StepTitle>
                        Étape 4 :<br />
                        Suivez vos demandes
                    </StepTitle>
                    
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
                        Restez informés, découvrez si les marques jouent le jeu et les informations renseignées.
                        Et insistez s’il le faut&nbsp;!
                    </p>
                    <div className="flex-1 flex justify-center md:hidden w-full items-center ">
                {/* Image téléphone */}
                <img
                    src="/images/step4.png" 
                    alt="Suivi des demandes"
                    className="w-52 md:w-96 drop-shadow-md"
                />
            </div>
                </div>

                <div>
                    <button className="bg-[#0a548d] text-white shadow text-xl px-8 py-3 rounded-lg hover:bg-[#084b7a] transition ArchivoLight font-bold" onClick={() => navigate("/application#solliciter")}>
                        En savoir plus
                    </button>
                </div>

            </div>

        </div>

    );
}

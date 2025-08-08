import React from "react";
import StepTitle from "../ui/stepTitle";
import { useNavigate } from "react-router-dom";

export default function Bonus() {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-14 md:gap-x-10 max-w-6xl w-full">
                {/* Illustration Étape 2 */}
                <div className="md:flex hidden items-center justify-center order-1 md:order-1">
                    <img
                        src="/images/bonus1.png"
                        alt="Discussion"
                        className="w-28 md:w-48"
                    />
                </div>
                {/* Texte Étape 2 */}
                <div className="flex flex-col justify-start items-start gap-4 md:gap-6 order-2 md:order-2 ">
                    <StepTitle>
                        Bonus n°1<br />
                        Découvrez et partagez des astuces pratiques
                    </StepTitle>
                    <p className="text-base md:text-lg text-[#0a548d] ArchivoLight leading-relaxed md:leading-tight font-bold text-start">
                        Tous les mois de nouveaux conseils sur des thèmes variés, santé, bien-être, antigaspi, conservation et utilisation des produits. Des astuces du quotidien pour une cuisine plus durable et plus saine !
                    </p>
                    <a className="text-[#0a548d] text-base md:text-xl leading-relaxed md:leading-tight max-w-md ArchivoLight underline" onClick={() => navigate("/application#tips")}>En savoir plus</a>
                       {/* Illustration Étape 2 */}
                <div className="flex justify-center md:hidden order-1 md:order-1 w-full items-center">
                    <img
                        src="/images/bonus1.png"
                        alt="Discussion"
                        className="w-36 md:w-48"
                    />
                </div>
                </div>
                
                {/* Texte Étape 3 */}
                <div className="flex flex-col justify-start items-start gap-4 md:gap-6 order-4 md:order-3 ">
                    <StepTitle>
                        Bonus n°2<br />
                        Découvrez et partagez des recettes
                    </StepTitle>
                    <p className="text-base md:text-lg text-[#0a548d] ArchivoLight leading-relaxed md:leading-tight font-bold text-start">
                        Une base de données de recettes liées aux produits que tout le monde peut enrichir !
                    </p>
                    <a className="text-[#0a548d] text-base md:text-xl leading-relaxed md:leading-tight max-w-md ArchivoLight underline"onClick={() => navigate("/application#recipes")}>En savoir plus</a>
                <div className="flex md:hidden items-center justify-center order-3 md:order-4 w-full">
                    <img
                        src="/images/bonus2.png"
                        alt="Discussion"
                        className="w-36 md:w-48"
                    />
                </div>
                </div>
                
                {/* Illustration Étape 3 */}
                <div className="md:flex hidden items-center justify-center order-3 md:order-4">
                    <img
                        src="/images/bonus2.png"
                        alt="Discussion"
                        className="w-28 md:w-48"
                    />
                </div>
            </div>
        </div>
    );
}
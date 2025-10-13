import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";
import StatsComponent from "./ui/StatsComponent";
import { useState } from "react";
import BoxPopup from "./ui/BoxPopup";

export default function Teambuilding() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const BLUE = "#0a548d";

    return (
        <div className="flex flex-col gap-14">

            <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-between gap-y-8 md:gap-x-16 w-full max-w-6xl ">
                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-10">
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">
                                Le
                            </span>
                            <span className="text-[#ff8300] font-bold">
                                Ti’Goûter entre collègue&nbsp;:
                            </span>
                            <span className="text-[#0a548d]">
                                atelier team building palpitant
                            </span>
                        </StepTitle>

                        {/* Image visible uniquement sur mobile */}
                        <img
                            src="/autravailatelier.png"
                            alt="Box Ti’Conso"
                            className="w-80 mx-auto md:hidden"
                        />
                        <div class="flex flex-col gap-4">
                            <ul class="flex flex-col gap-2 list-disc list-inside px-6">
                                <li>Team building d’1h, animé par un expert TiCO</li>
                                <li>Jeu d’enquête immersif donnant les clés du décryptage de l’information sur les
                                    produits alimentaires</li>
                                <li>Dégustations comparatives ingrédients simples VS ultra-transformation</li>

                            </ul>
                        </div>

                    </div>


                </div>

                {/* Illustration desktop uniquement */}
                <div className="hidden md:flex justify-center">
                    <img
                        src="/autravailatelier.png"
                        alt="Suivi des demandes"
                        className="w-52 md:w-96 lg:w-[23rem] 2xl:w-[26rem]"
                    />
                </div>
                <BoxPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                    <div>
                        Vous souhaitez plus d’informations ? Réservez un rendez-vous avec notre équipe !
                    </div>
                    <button
                        type="button"
                        onClick={() => window.open("https://calendar.app.google/fMrWg7TpUZwWJN7j8", "_blank")}
                        className="mx-auto mt-6 inline-flex items-center justify-center rounded-xl px-9 py-4 text-white font-semibold shadow-sm"
                        style={{ backgroundColor: BLUE }}
                    >
                        Prendre RDV
                    </button>

                </div>
            </div>
        </div>
    );
}

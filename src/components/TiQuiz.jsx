import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";
import StatsComponent from "./ui/StatsComponent";
import { useState } from "react";
import BoxPopup from "./ui/BoxPopup";
import DeuxBlocsActions from "./DeuxBlocsActions";

export default function TiQuiz() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="flex flex-col gap-14">
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                    <div>
                        Saviez-vous qu’une meilleure alimentation peut augmenter la concentration et réduire le stress au travail ?
                        Pour adopter de bonnes pratiques nous accompagnons vos équipes avec des ateliers et conférences ludiques et immersives.
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-between gap-y-8 md:gap-x-16 w-full max-w-6xl ">
                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-10">
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">
                                Le
                            </span>
                            <span className="text-[#ff8300] font-bold">
                                Ti’Quiz&nbsp;
                            </span>
                            <span className="text-[#0a548d]">
                                disponible sur
                                smartphone et ordinateur
                            </span>
                        </StepTitle>

                        {/* Image visible uniquement sur mobile */}
                        <img
                            src="/travailquiz.png"
                            alt="Box Ti’Conso"
                            className="w-80 mx-auto md:hidden"
                        />
                            <div className="text-lg leading-relaxed ArchivoLight space-y-4 text-start md:px-6 ">
                            <ul className="flex flex-col gap-2 list-disc list-inside">
                                <li>Quiz solo ou multi-joueurs</li>
                                <li className="whitespace-nowrap">Pouvant s’implémenter sur l’application de votre organisation</li>
                                <li className="whitespace-nowrap">Plus de 200 questions à choix multiples sur l’alimentation</li>
                                <li>Réponses, explications et fun facts</li>
                                <li>Organisation de challenges possible</li>
                            </ul>
                        </div>

                    </div>


                </div>

                {/* Illustration desktop uniquement */}
                <div className="hidden md:flex justify-center">
                    <img
                        src="/travailquiz.png"
                        alt="Suivi des demandes"
                        className="h-52 md:h-auto md:max-w-96 lg:max-w-[23rem] 2xl:max-w-[26rem]"
                    />
                </div>
                <BoxPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                />
            </div>

        </div>
    );
}

import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";

export default function JeuPage() {
    return (
        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-10 justify-between w-full max-w-6xl mx-auto " >
            
            {/* Image desktop à gauche */}
            <div className="hidden md:flex justify-center">
                <img
                    src="/images/info ou pipeau le jeu.png"
                    alt="Suivi des demandes"
                    className="w-96 lg:w-[25rem] 2xl:w-[26rem] drop-shadow-md"
                />
            </div>

            {/* Texte étape 4 */}
            <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                <div className="flex flex-col justify-start items-start gap-8 md:gap-14">
                    
                    {/* Titre */}
                    <StepTitle center={false}>
                        <span className="text-[#0a548d]">Info ou pipeau : le jeu de cartes pour&nbsp;</span>
                        <span className="text-[#ff8300] font-bold">pimper l’apéro &nbsp;​</span>
                        <span className="text-[#0a548d]">sur un sujet d’actualité (qui nous concerne tous)&nbsp;! ​</span>
                    </StepTitle>

                    {/* ✅ Image mobile au milieu */}
                    <div className="flex justify-center md:hidden w-full">
                        <img
                            src="/images/info ou pipeau le jeu.png"
                            alt="Suivi des demandes"
                            className="w-72 drop-shadow-md"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                    {/* Paragraphes */}
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Saurez-vous retrouver le vrai du faux&nbsp;?
                        <br />
                        Qui, autour de cette table, est un lobbyiste ou un influenceur ? Qui sera le prochain à se faire duper&nbsp;?
                        <br />
                        Un jeu d'ambiance et d’actualité qui vous demandera du bagou et de la perspicacité&nbsp;!
                        <br />
                        Que dites-vous ? Des scandales alimentaires&nbsp;?
                        <br />
                        Allons voir ça de plus près&nbsp;!
                    </p>

                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Recevez-le dans <span className="font-bold">votre boite aux lettres avec</span> notre guide « La vérité si J’mange » et de notre calendrier pour toute participation de 60€ à notre{" "}
                        <Link to="/crowdfunding" className="font-bold underline">crowdfunding</Link>.
                    </p>
                    </div>
                </div>

                {/* Bouton */}
                <div className="mt-1 flex flex-col items-center justify-center">
                    <button className="text-xl bg-[#0a548d] text-white px-8 py-2 rounded-lg hover:bg-[#084b7a] transition ArchivoLight font-bold"
                       onClick={() => {
                        window.open(
                            "https://app.mymoojo.com/project/tico",
                            "_blank"
                        );
                    }}
                    >
                        Il faut que je teste ce jeu&nbsp;!                    </button>
                </div>
            </div>
        </div>
    );
}

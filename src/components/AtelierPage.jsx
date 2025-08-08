import { Link } from "react-router-dom";
import StepTitle from "./ui/stepTitle";
import ProgrammePopup from "./ui/ProgrammePopup";
import { useState } from "react";

export default function AtelierPage() {
        const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    return (
        <>
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-y-8 md:gap-x-10 w-full max-w-6xl" >
            {/* Illustration desktop uniquement */}
            <div className="hidden md:flex justify-center">
                <img
                    src="/images/tigouter.png"
                    alt="Suivi des demandes"
                    className="w-52 md:w-96 lg:w-[25rem] 2xl:w-[26rem] drop-shadow-md"
                />
            </div>

            {/* Texte étape */}
            <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                <div className="flex flex-col justify-start items-start gap-8 md:gap-14">
                    <StepTitle center={false}>
                        <span className="text-[#0a548d]">Un&nbsp;</span>
                        <span className="text-[#ff8300] font-bold">Ti Goûter&nbsp;​</span>
                        <span className="text-[#0a548d]">entre collègues ou entre convives, ça vous branche ?</span>
                    </StepTitle>

                    {/* Image mobile uniquement */}
                    <img
                        src="/images/tigouter.png"
                        alt="Atelier Ti Goûter"
                        className="w-72 mx-auto md:hidden"
                    />
<div className="flex flex-col gap-4">
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Il pleut des scandales alimentaires, comment trouver des produits sains et durables dans ce contexte ?
                    </p>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Un atelier team building ludique et immersif donnant les clés pour mieux comprendre les enjeux de notre alimentation et mieux choisir en magasin sans se prendre la tête.
                    </p>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Entre collaborateurs ou lors d’un évènement, organisez ce moment de partage autour d’un sujet qui nous concerne tous : notre alimentation !
                    </p>
                     <div onClick={() => setIsPopupOpen(true)} className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline">
                        Voir le programme.​
                    </div>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Réservation possible en participant à notre <Link to={'/crowdfunding​'} className="font-bold underline"> crowdfunding</Link>.
                    </p></div>
                </div>

                <div className="mt-1">
                    <button className="text-xl bg-[#0a548d] text-white px-9 py-2 rounded-lg hover:bg-[#084b7a] transition ArchivoLight"
                       onClick={() => {
                        window.open(
                            "https://app.mymoojo.com/project/tico",
                            "_blank"
                        );
                    }}
                    >
                        J’en organise un !​
                    </button>
                </div>
            </div>
        </div>
         <ProgrammePopup
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
        </>
    );
}

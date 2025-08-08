import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";
import StatsComponent from "./ui/StatsComponent";
import { useState } from "react";
import BoxPopup from "./ui/BoxPopup";

export default function BoxPage() {
        const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-y-8 md:gap-x-10 w-full max-w-6xl md:mt-16">

            {/* Texte étape 4 */}
            <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                <div className="flex flex-col justify-start items-start gap-8 md:gap-14">
                    <StepTitle center={false}>
                        <span className="text-[#0a548d]">Graine de Ti’Conso,&nbsp;</span>
                        <span className="text-[#ff8300] font-bold">la box clé en mains&nbsp;​</span>
                        <span className="text-[#0a548d]">pour sensibiliser les plus jeunes dans la joie et la bonne humeur !</span>
                    </StepTitle>

                    {/* Image visible uniquement sur mobile */}
                    <img
                        src="/images/box.png"
                        alt="Box Ti’Conso"
                        className="w-80 mx-auto md:hidden"
                    />

                    <StatsComponent />
                    <div className="flex flex-col gap-4">
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Les enfants sont les cibles privilégiées du marketing alimentaire...
                    </p>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Proposez cette activité en temps scolaire ou périscolaire...
                    </p>
                    <div   onClick={() => setIsPopupOpen(true)} className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline">
                        Voir le contenu​
                    </div>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                        Recevez-la pour toute participation de 96€ à notre <Link to={'/crowdfunding​'} className="font-bold underline"> crowdfunding</Link>.
                    </p>
                    </div>
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
                        J’en veux une !
                    </button>
                </div>
            </div>

            {/* Illustration desktop uniquement */}
            <div className="hidden md:flex justify-center">
                <img
                    src="/images/box.png"
                    alt="Suivi des demandes"
                    className="w-52 md:w-96 lg:w-[25rem] 2xl:w-[26rem] drop-shadow-md"
                />
            </div>
              <BoxPopup
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
        </div>
    );
}

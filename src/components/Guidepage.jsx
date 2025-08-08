import { Link } from "react-router-dom";
import StepTitle from "./ui/stepTitle";
import { useState } from "react";
import SommairePopup from "./ui/SommairePopup";

export default function Guidepage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-y-8 md:gap-x-1 w-full max-w-6xl" >

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 flex-1">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-14">

                        {/* Titre */}
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">« La Vérité si J’mange » , apprendre à&nbsp;</span>
                            <span className="text-[#ff8300] font-bold">déjouer les pièges&nbsp;​​</span>
                            <span className="text-[#0a548d]">sur les produits alimentaires​</span>
                        </StepTitle>

                        {/* ✅ Image au milieu pour mobile */}
                        <div className="md:hidden w-full flex justify-center">
                            <img
                                src="/images/19.png"
                                alt="Suivi des demandes"
                                className="w-80 drop-shadow-md"
                            />
                        </div>

                        {/* Paragraphes */}
                        <div className="text-lg leading-relaxed ArchivoLight space-y-4 text-start">
                            <p>
                                Que vous soyez débutant ou averti, ce guide vous permettra rapidement de devenir un As en lecture d’étiquettes.
                                Grâce à un bon marketing, on peut nous vendre n’importe quoi. Choisir dans les rayons peut vite devenir un calvaire.
                                Avec ce guide, vous avez les clés pour choisir mieux sans vous prendre la tête.
                            </p>
                            <p>
                                En plus d’idées recettes, il contient des astuces et informations qu’il est bon de garder à l’œil, comme un comparatif des huiles de cuisine par exemple.
                            </p>
                            <p>
                                <span onClick={() => setIsPopupOpen(true)}
                                    className="text-[#0a548d] font-bold underline">Voir le sommaire</span>
                            </p>
                            <p>
                                Recevez-le dans votre boîte mail <span className="font-bold">en plus</span> de notre guide « La vérité si J’mange » pour toute participation de 20€ à notre{" "}
                                <a
                                    href="https://app.mymoojo.com/project/tico"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold underline"
                                >
                                    crowdfunding
                                </a>.
                            </p>
                        </div>
                    </div>

                    <div className="mt-1">
                        <button                         className="text-xl bg-[#0a548d] text-white px-9 py-2 rounded-lg hover:bg-[#084b7a] transition ArchivoLight"

                           onClick={() => {
                            window.open(
                                "https://app.mymoojo.com/project/tico",
                                "_blank"
                            );
                        }}
                        >
                            J’en profite !
                        </button>
                    </div>
                </div>

                {/* ✅ Image à droite pour desktop */}
                <div className="hidden md:flex justify-center w-full md:w-auto mt-8 md:mt-0">
                    <img
                        src="/images/19.png"
                        alt="Suivi des demandes"
                        className="w-96 lg:w-[25rem] 2xl:w-[26rem] drop-shadow-md"
                    />
                </div>

            </div>
            <SommairePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
}

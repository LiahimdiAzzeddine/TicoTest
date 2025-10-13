import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";

export default function CalendrierPage() {
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                    <div>
                        <span className="text-[#ff8300]">Changer l’alimentation</span>, ça commence par l’information. Pendant que la transparence se construit on s’est dit que vous aimeriez surement avoir des outils <span className="text-[#ff8300]">pour faire le tri dès maintenant</span> sur les produits alimentaires.
                    </div>
                    {/* <div>
                        C’est pourquoi <span className="text-[#ff8300]">nous vous proposons plusieurs solutions</span>, découvrez les box, ateliers et outils pratiques pour apprendre à reconnaître les bons produits et sensibiliser votre entourage pour donner plus de pouvoirs aux consommateurs de demain.

                    </div> */}
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >

                {/* Illustration affichée uniquement sur desktop */}
                <div className="hidden md:flex justify-center">
                    <img
                        src="/images/calendrier.png"
                        alt="Suivi des demandes"
                        className="w-60 md:w-96"
                    />
                </div>

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] md:flex-1 text-center md:text-left flex flex-col gap-8 md:gap-14 w-full">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-12">
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">
                                Calendrier perpétuel de fruits et légumes&nbsp;
                            </span>
                            <span className="text-[#ff8300] font-bold">
                                de saison
                            </span>
                        </StepTitle>

                        {/* Illustration affichée uniquement sur mobile (entre titre et description) */}
                        <div className="flex justify-center w-full md:hidden">
                            <img
                                src="/images/calendrier.png"
                                alt="Suivi des demandes"
                                className="w-96 sm:w-60"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                              Il est beau et surtout réutilisable d’année en année !
C’est un pense-bête idéal pour faciliter la consommation de fruits et légumes de
saison.
                            </p>

                            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                              En plus d’idées recettes, il contient des astuces et informations qu’il est bon de garder
à l’œil, comme un comparatif des huiles de cuisine par exemple.
                            </p>

                            {/* <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                Recevez-le dans votre boite mail{" "}
                                <span className="font-bold">en plus</span> de notre
                                guide « La vérité si J'mange » pour toute
                                participation de 20€ à notre{" "}
                                <a
                                    href="https://app.mymoojo.com/project/tico"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold underline"
                                >
                                    crowdfunding
                                </a>
                            </p> */}
                        </div>
                    </div>

                    {/* <div className="mt-1">
                        <button
                            className="text-xl bg-[#0a548d] text-white px-9 py-2 rounded-lg hover:bg-[#084b7a] transition ArchivoLight"
                            onClick={() => {
                                window.open(
                                    "https://app.mymoojo.com/project/tico",
                                    "_blank"
                                );
                            }}
                        >
                            J'en profite !
                        </button>
                    </div> */}
                </div>
            </div></div>
    );
}

import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";
import StatsComponent from "./ui/StatsComponent";
import { useState } from "react";
import BoxPopup from "./ui/BoxPopup";
import DeuxBlocsActions from "./DeuxBlocsActions";

export default function BoxPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="flex flex-col gap-14">
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                    <div>
                        Les enfants sont des cibles privilégiées du marketing alimentaire. L’éducation alimentaire est essentielle mais souvent très théorique.
                        Alors nous proposons aux enseignants qui le souhaitent de bénéficier d’un kit ludique et clé en main pour aborder le sujet !                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-between gap-y-8 md:gap-x-10 w-full max-w-6xl ">
                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-10">
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">
                                Graine de Ti’Conso,&nbsp;
                            </span>
                            <span className="text-[#ff8300] font-bold">
                                la box clé en mains&nbsp;
                            </span>
                            <span className="text-[#0a548d]">
                                pour sensibiliser les plus jeunes dans la joie et la
                                bonne humeur&nbsp;!
                            </span>
                        </StepTitle>

                        {/* Image visible uniquement sur mobile */}
                        <img
                            src="/images/box.png"
                            alt="Box Ti’Conso"
                            className="w-80 mx-auto md:hidden"
                        />
                        <div className="flex flex-col gap-4">
                            <StatsComponent />
                            <div className="flex flex-col gap-4">
                                <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                    Les enfants sont les cibles privilégiées du
                                    marketing alimentaire. Couleurs vives, jeux, fausses
                                    promesses santé… Notre rôle ? Les protéger, les
                                    accompagner pour qu’ils puissent grandir en
                                    connaissant l’impact de leur alimentation sur leur
                                    santé et l’environnement.
                                </p>
                                <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                    Proposez ces activités en temps scolaire ou
                                    périscolaire, tout est prévu pour vous guider pas à
                                    pas dans l’organisation et l’animation des activités
                                    et des dégustations. ​ Kit co-construit avec
                                    l’expertise de Kelly Frank, fondatrice de{" "}
                                    <span className="font-bold">Goûm</span>, spécialiste
                                    de la naturalité des ingrédients et du vrai goût des
                                    aliments.    <span
                                        onClick={() => setIsPopupOpen(true)}
                                        className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline"
                                    >
                                        Voir le contenu
                                    </span>
                                </p>

                                {/* <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                            Recevez-la pour toute participation de 96€ à notre{" "}
                            <Link
                                to={"/crowdfunding​"}
                                className="font-bold underline"
                            >
                                {" "}
                                crowdfunding
                            </Link>
                            .
                        </p> */}
                            </div></div>
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
                        J’en veux une !
                    </button>
                </div> */}
                </div>

                {/* Illustration desktop uniquement */}
                <div className="hidden md:flex justify-center">
                    <img
                        src="/images/box.png"
                        alt="Suivi des demandes"
                        className="w-52 md:w-96 lg:w-[23rem] 2xl:w-[26rem]"
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

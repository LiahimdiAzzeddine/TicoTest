import React from "react";
import StepTitle from "../ui/StepTitle";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Bonus() {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-32 md:gap-x-10 max-w-6xl w-full">
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
                        <div>
                            <div className="text-[#ff8200] pb-2">Bonus n°1</div>
                            <div>
                                {" "}
                                Découvrez et partagez des astuces pratiques{" "}
                            </div>
                        </div>
                    </StepTitle>
                    <p className="text-base md:text-lg text-[#0a548d] ArchivoLight leading-relaxed md:leading-tight font-bold text-start">
                        Tous les mois de nouveaux conseils sur des thèmes
                        variés, santé, bien-être, antigaspi, conservation et
                        utilisation des produits. Des astuces du quotidien pour
                        une cuisine plus durable et plus saine !
                    </p>

<HashLink
  smooth
  to="/application#tips"
  className="text-[#0a548d] text-base md:text-xl leading-relaxed md:leading-tight max-w-md ArchivoLight underline"
>
  En savoir plus
</HashLink>
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
                        <div>
                            <div className="text-[#ff8200] pb-2">Bonus n°2</div>
                            <div> Découvrez et partagez</div>
                            <div>des Tit’recettes</div>
                        </div>
                    </StepTitle>
                    <p className="text-base md:text-lg text-[#0a548d] ArchivoLight leading-relaxed md:leading-tight font-bold text-start">
                        Une base de données de recettes liées aux produits que tout le monde peut enrichir !
                    </p>


<HashLink
  smooth
  to="/application#recipes"
  className="text-[#0a548d] text-base md:text-xl leading-relaxed md:leading-tight max-w-md ArchivoLight underline"
>
  En savoir plus
</HashLink>
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

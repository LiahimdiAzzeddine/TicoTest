import React from "react";
import StepTitle from "../ui/StepTitle";
import { HashLink } from "react-router-hash-link";

export default function Etape2Et3() {
    return (
        <div className="relative flex flex-col items-center justify-center" >
            <div className="grid grid-cols-2  gap-y-12 md:gap-y-32 md:gap-x-10 max-w-6xl w-full">
                {/* Illustration Étape 2 */}
                <div className="flex items-center justify-center">
                    <img
                        src="/images/step2.png"
                        alt="Discussion"
                        className="w-28 md:w-48"
                    />
                </div>

                {/* Texte Étape 2 */}
                <div className="flex flex-col justify-start items-start gap-6  ">

                    <StepTitle>
                        <div>
                            <div className="text-[#ff8200] pb-2">Étape 2 :</div>
                            <div>                        Demandez la transparence</div>

                        </div>
                    </StepTitle>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
                        D’un clic demandez aux marques de faire la
transparence avec TiCO.
                    </p>
                    <HashLink
  smooth
  to="/application#scan"
  className="text-xl bg-[#0a548d] text-white px-8 py-3 rounded-lg hover:bg-[#084b7a] transition ArchivoLight font-bold"
>
  En savoir plus
</HashLink>

                </div>

                {/* Texte Étape 3 */}
                <div className="flex flex-col justify-start items-start gap-6">

                      <StepTitle>
                        <div>
                       <div className="text-[#ff8200] pb-2">Étape 3 :</div>
                        <div> Les marques délivrent les informations</div>

                        </div>
                    </StepTitle>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
                     Et des experts indépendants les décryptent.
                    </p> {/* Bouton En savoir plus */} <div className="mt-6">

<HashLink
  smooth
  to="/application#evaluation"
  className="text-xl bg-[#0a548d] text-white px-8 py-3 rounded-lg hover:bg-[#084b7a] transition ArchivoLight font-bold"
>
  En savoir plus
</HashLink>
</div>
                </div>




                {/* Illustration Étape 3 */}
                <div className="flex items-center justify-center">
                    <img
                        src="/images/step3.png"
                        alt="Discussion"
                        className="w-28 md:w-48"
                    />
                </div>
            </div>
        </div>
    );
}

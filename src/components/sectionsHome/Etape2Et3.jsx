import React from "react";
import StepTitle from "../ui/StepTitle";

export default function Etape2Et3() {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="grid grid-cols-2  gap-y-12 md:gap-y-14 md:gap-x-10 max-w-6xl w-full">
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
                        Étape 2 :<br />
                        Demander la transparence
                    </StepTitle>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
                        D’un clic demander à la marque de faire la transparence. Oui, vous avez ce pouvoir&nbsp;!
                    </p>
                </div>

                {/* Texte Étape 3 */}
                <div className="flex flex-col justify-start items-start gap-6">
                <StepTitle>
                        Étape 3 :<br />
                        Les marques délivrent les informations
                    </StepTitle>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
                        Pour qu’elles soient décryptées par des experts indépendants.
                    </p>
                </div>

                {/* Illustration Étape 3 */}
                <div className="flex items-center justify-center">
                    <img
                        src="/images/step3.png"
                        alt="Discussion"
                        className="w-28 md:w-44"
                    />
                </div>
      
            </div>
        </div>
    );
}

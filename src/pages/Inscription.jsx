import React from 'react'

import { useState } from "react";
import InscriptionOrganisationForm from '../components/InscriptionOrganisationForm';
import StepTitle from '../components/ui/StepTitle';
import StartSection from '../Templates/StartSection';
import ConfirmationInscription from '../components/ConfirmationInscription';


export default function Inscription() {
    const [isCompleted, setCompleted] = useState(false);


    return (
        <>
            <StartSection pb={'md:pb-20 pb-16'}>
                <div className="flex flex-col gap-14">
                    <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                        <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                            <div>
                                Vous êtes enseignants, animateurs dans un centre de loisir, une colonie de vacances, une maison des jeunes et de la culture, une
                                médiathèque ou tout autre acteur souhaitant bénéficier de la Box des Ti’Conso pour aborder le sujet de l’alimentation avec les enfants que

                                vous encadrez ?
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-between gap-y-8 md:gap-x-10 w-full max-w-6xl ">
                        {/* Texte étape 4 */}
                        <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                            <StepTitle center={true}>
                                <span className="text-[#0a548d]">
                                    Inscrivez votre structure pour qu’ellebénéficie d’une box&nbsp;
                                </span>
                                <span className="text-[#ff8300] font-bold">
                                    co-financées par des citoyens soucieux &nbsp;
                                </span>
                                <span className="text-[#0a548d]">
                                    de l’avenir des
                                    consommateurs de demain&nbsp;!
                                </span>
                            </StepTitle>
                            {!isCompleted?(
                               <InscriptionOrganisationForm onSubmit={()=>setCompleted(true)} />  
                            ):(
                                <ConfirmationInscription/>
                            )}
                           
                        </div>


                    </div>
                </div>
                </StartSection>
            <div className="mb-32"></div>
        </>

    );
}


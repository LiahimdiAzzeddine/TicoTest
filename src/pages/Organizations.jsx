import React from 'react'

import { useState } from "react";
import InscriptionOrganisationForm from '../components/InscriptionOrganisationForm';
import StepTitle from '../components/ui/StepTitle';
import StartSection from '../Templates/StartSection';
import ConfirmationInscription from '../components/ConfirmationInscription';
import HomeSection from '../Templates/HomeSection';
import OrganismesGrid from '../components/OrganismesGrid';


export default function Organizations() {
    const [isCompleted, setCompleted] = useState(false);


    return (
        <>
            <StartSection pb={'md:pb-20 pb-16'}>
                <div className="flex flex-col gap-14">
                    <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                        <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                            <div>
                                Vous souhaitez qu’une école, un centre aéré ou un autre organisme puisse bénéficier de la Box des Ti’Conso pour aborder de manière
                                ludique le sujet de l’alimentation avec les enfants qu’ils encadrent ?
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-between gap-y-8 md:gap-x-10 w-full max-w-6xl ">
                        {/* Texte étape 4 */}
                        <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
                            <StepTitle center={true}>
                                <span className="text-[#ff8200]">
                                    Participer au financement&nbsp;
                                </span>
                                <span className="text-[#0a548d] font-bold">
                                    d’un kit pédagogique clé en main pour l’organisme de votre choix!
                                </span>
                            </StepTitle>
                            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl" >
                                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                                    <div>
                                        Les organismes peuvent s’inscrire ici pour notifier leur volonté d’obtenir une ou plusieurs box. Nous vérifions l’identité des organismes à
                                        chaque demande avant publication. Toute somme versée constitue une contribution volontaire, non remboursable. Chaque box coûte
                                        120€, les collectes n’ont pas de limite dans le temps, une fois le montant atteint nous envoyons la box à l’organisme bénéficiaire en
                                        informant tous les participants. Si après 24 mois l’objectif n’est pas atteint et qu’aucune progression significative n’est constatée, nous
                                        nous réservons le droit de réaffecter les contributions à une autre structure similaire et/ou de la même zone géographique.
                                    </div>
                                </div>
                            </div>
                                <OrganismesGrid />
                        </div>
                    </div>
                </div>
            </StartSection>
            <div className="mb-32"></div>
        </>

    );
}


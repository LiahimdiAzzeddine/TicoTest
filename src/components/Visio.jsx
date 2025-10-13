import StepTitle from "./ui/StepTitle";

export default function Visio() {

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-y-8 md:gap-x-16 w-full max-w-6xl" >

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 flex-1">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-12">

                        {/* Titre */}
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">« La Vérité si J’mange » , apprendre à&nbsp;</span>
                            <span className="text-[#ff8300] font-bold">Sors tes couverts&nbsp;​​!</span>
                            <span className="text-[#0a548d]">La visio conférence pour tous​</span>
                        </StepTitle>

                        {/* ✅ Image au milieu pour mobile */}
                        <div className="md:hidden w-full flex justify-center">
                            <img
                                src="/Autravailwebinar.png"
                                alt="Suivi des demandes"
                                className="w-80"
                            />
                        </div>

                        {/* Paragraphes */}
                        <div class="text-lg leading-relaxed ArchivoLight space-y-4 text-start md:px-6">
                            <ul class="flex flex-col gap-2 list-disc list-inside">
                                <li>Webinar d’1h, animée par un expert TiCO</li>
                                <li>Objectif : sensibiliser au lien entre l’alimentation, la santé et le bien-être au travail</li>
                                <li>Quiz et sondages dynamiques favorisant l’engagement</li>
                                <li>Tips et pistes concrètes à mettre en place</li>
                                <li>Défis et suivis des participants</li>
                            </ul>
                        </div>

                    </div>


                </div>

                {/* ✅ Image à droite pour desktop */}
                <div className="hidden md:flex justify-center w-full md:w-auto mt-8 md:mt-0">
                    <img
                        src="/Autravailwebinar.png"
                        alt="Suivi des demandes"
                        className="w-52 md:w-96 lg:w-[23rem] 2xl:w-[26rem]"
                    />
                </div>

            </div>

        </>
    );
}

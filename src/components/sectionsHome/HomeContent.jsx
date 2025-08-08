import { FileText } from "lucide-react";
import StoreLinks from "../ui/StoreLinks";
import StartSection from "../../Templates/StartSection";

export default function HomeContent() {
    return (
        <StartSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-y-10 md:gap-x-8 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24 max-w-screen-lg 2xl:max-w-screen-xl mx-auto">

                {/* Texte à gauche */}
                <div className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 w-full md:w-1/2 lg:w-[52%] xl:w-[55%] 2xl:w-[58%]">

                    {/* Titre principal */}
                    <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[#0a548d] leading-snug ClashDisplayBold">
                        <span className="block mb-1 md:mb-2 bg-gradient-to-r from-[#0a548d] to-[#1e6ba8] bg-clip-text text-transparent leading-tight">La transparence</span>
                        <span className="block mb-1 md:mb-2 md:px-2 lg:px-3 xl:px-4 py-1 md:py-1.5 lg:py-2 bg-blue-50 rounded-lg inline-block leading-none">alimentaire à</span>
                        <span className="block text-[#ff8300] bg-orange-50 md:px-3 lg:px-4 xl:px-5 py-1.5 md:py-2 lg:py-2.5 rounded-full inline-block shadow-sm leading-none">portée de scan</span>
                    </h1>

                    {/* Image uniquement pour mobile */}
                    <div className="block md:hidden mt-2">
                        <div className="relative">
                            <div className="absolute opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-md animate-pulse"></div>
                            <div className="relative z-10">
                                <img
                                    src="/images/19.webp"
                                    alt="Smartphone avec l'application TiCO"
                                    className="w-9/12 mx-auto h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sous-titre */}
                    <div className="w-full flex justify-center items-center md:justify-start">
                        <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#0a548d] leading-relaxed px-3 py-2 md:px-0 md:py-0 bg-gray-50 rounded-xl md:bg-transparent border border-gray-200 md:border-none shadow-sm md:shadow-none">
                            Scannez, découvrez et choisissez en toute connaissance de cause avec TiCO,
                            votre compagnon pour une alimentation transparente.
                        </p>
                    </div>

                    {/* Store Links */}
                    <div className="w-full flex justify-center md:justify-start">
                        <StoreLinks />
                    </div>

                    {/* Lien dossier de presse */}
                    <div className="flex justify-center md:justify-start mt-2">
                        <a
                            href="/pdfs/TiCO_DP_2025.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#ff8300] hover:text-[#e6750a] font-bold transition-all duration-300 hover:scale-105"
                        >
                            <div className="p-1.5 md:p-2 lg:p-2.5 xl:p-3 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors duration-300">
                                <FileText className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
                            </div>
                            <span className="underline decoration-2 underline-offset-4 group-hover:underline-offset-8 transition-all duration-300">
                                Dossier de Presse
                            </span>
                        </a>
                    </div>
                </div>

                {/* Section image */}
                <div className="w-full md:w-1/2 lg:w-[48%] xl:w-[45%] 2xl:w-[42%] md:flex justify-center md:justify-end order-1 md:order-2 mb-4 md:mb-0 hidden">
                    <div className="relative">
                        <div className="absolute opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-md animate-pulse"></div>
                        <div className="relative z-10">
                            <img
                                src="/images/19.webp"
                                alt="Smartphone avec l'application TiCO"
                                className="w-64 md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem] h-auto mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section statistiques */}
            <div className="pt-4 md:pt-6 lg:pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 text-center">
                    <div className="bg-blue-50 p-3 md:p-4 lg:p-5 xl:p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                        <div className="text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#0a548d] ClashDisplayBold">50K+</div>
                        <div className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 mt-1">Produits scannés</div>
                    </div>
                    <div className="bg-orange-50 p-3 md:p-4 lg:p-5 xl:p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                        <div className="text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#ff8300] ClashDisplayBold">10K+</div>
                        <div className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 mt-1">Utilisateurs actifs</div>
                    </div>
                    <div className="bg-green-50 p-3 md:p-4 lg:p-5 xl:p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                        <div className="text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#0a548d] ClashDisplayBold">5K+</div>
                        <div className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 mt-1">D.transparence</div>
                    </div>
                    <div className="bg-[#f8dcd7] p-3 md:p-4 lg:p-5 xl:p-6 rounded-2xl border border-[#fad5cf] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                        <div className="text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#ff8300] ClashDisplayBold">100</div>
                        <div className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 mt-1">Recettes</div>
                    </div>
                </div>
            </div>
       </StartSection>
    );
}

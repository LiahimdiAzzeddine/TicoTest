import React from 'react';

const BoxPopup = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-3xl w-full flex justify-center">
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                   className="absolute top-4 md:top-10 md:right-40 right-4 w-12 h-14 z-10 hover:scale-110 transition-transform"

                >
                    <img
                        src="/images/fermeture_popup.png"
                        alt="Fermer"
                        className="w-full h-full object-contain"
                    />
                </button>

                {/* Desktop version */}
                <div
                    className={`
                        relative px-20 py-10 max-w-2xl flex w-full flex-col justify-center items-center
                        hidden md:flex
                    `}
                    style={{
                        backgroundImage: 'url("/images/Popup.png")',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <ContentSection2 isMobile={false} />
                </div>

                {/* Mobile version with background color only */}
                <div
                    className={`
                        relative px-6 py-8 max-w-xl w-full flex flex-col justify-center items-center
                        md:hidden bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]
                    `}
                    style={{
                        backgroundColor: '#f0f4f8'
                    }}
                >
                    <ContentSection2 isMobile={true} />
                </div>
            </div>
            
        </div>
    );
};

const ContentSection2 = ({ isMobile }) => (
    <div className={`w-full ${isMobile ? 'pt-10' : 'mt-6'} space-y-2 sm:space-y-3`}>
        {/* Titre principal */}
     <h2 className="text-[#0a548d] text-3xl font-bold text-center ClashDisplayBold">

            Contenu de la box
        </h2>

        {/* Poster */}
        <div className="text-center ArchivoLight">
            <span className={`text-[#ff8300] font-bold ArchivoLight ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                1 poster&nbsp;
            </span>
            <span className={`text-[#0a548d] ArchivoLight ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed`}>
            sur les grands enjeux de l'alimentation
            </span>
        </div>

        {/* 3 activités */}
        <div className="space-y-1">
            <div className={`text-[#ff8300] text-center font-bold ArchivoLight ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                3 activités :
            </div>
            
            <div className="space-y-1">
                {/* Recettes Secrètes */}
                <div className="text-center">
                    <span className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                        Recettes Secrètes :
                    </span>
                    <span className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                        retrouver les ingrédients des produits. Surprises garanties.
                    </span>
                </div>

                {/* Info ou Pipeau */}
                <div className="text-center">
                    <span className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                        Info ou Pipeau :
                    </span>
                    <span className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                         le grand jeu des experts qui démasquent les intox alimentaires.
                    </span>
                </div>

                {/* Pub & Vérité */}
                <div className="text-center">
                    <span className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                        Pub & Vérité : 
                    </span>
                    <span className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                   qu'avez-vous vu ? Un produit sain et durable ou une marque qui cherche à vous vendre un produit à tout prix ?
                    </span>
                </div>
            </div>
        </div>

        {/* 3 dégustations guidées */}
        <div className="space-y-1">
                        <div className={`text-[#ff8300] text-center font-bold ArchivoLight ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                3 dégustations guidées :
            </div>
            <div className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                Salé, sucré, à la découverte du vrai goût !
            </div>
        </div>

        {/* Indications */}
        <div className="text-center">
            <div className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                + Toutes les indications pour
            </div>
            <div className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                une mise en œuvre facile.
            </div>
        </div>

        {/* Bouton CTA */}
        <div className={`text-center`}>
            <button className={`bg-[#0a548d] text-white rounded-lg hover:bg-[#084b7a] transition-colors duration-300 font-semibold ${isMobile ? 'text-sm sm:text-lg px-6 py-3 sm:px-8 sm:py-3' : 'text-lg px-8 py-3'}`}
               onClick={() => {
                window.open(
                    "https://app.mymoojo.com/project/tico",
                    "_blank"
                );
            }}
            >
                J'en veux une !
            </button>
        </div>
    </div>
);


export default BoxPopup;

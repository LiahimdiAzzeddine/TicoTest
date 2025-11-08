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
export const BoxTPopup = ({
  isOpen,
  onClose,
  children,
  desktopBackground = "/images/Popup.png",
  mobileBackgroundColor = "#f0f4f8",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 md:top-10 md:right-40 right-4 w-12 h-14 z-10 hover:scale-110 transition-transform"
          aria-label="Fermer"
        >
          <img
            src="/images/fermeture_popup.png"
            alt="Fermer"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Version Desktop */}
        <div
          className={`relative px-20 py-16 w-full flex-col justify-center items-center hidden md:flex ${className}`}
          style={{
            backgroundImage: `url(${desktopBackground})`,
            backgroundSize: "contain", // Étire l'image pour couvrir tout le contenu
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "500px", // Hauteur minimale pour assurer une bonne apparence
          }}
        >
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Version Mobile */}
        <div
          className={`relative px-6 py-8 max-w-xl w-full flex flex-col justify-center items-center md:hidden rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] ${className}`}
          style={{
            backgroundColor: mobileBackgroundColor,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const ContentCalendrier = () => (
  <div className="w-full  md:mt-6 space-y-4 sm:space-y-5">
    {/* Titre principal */}
    <h2 className="text-[#ff8200] text-2xl sm:text-3xl font-bold text-center ClashDisplayBold mb-6">
      Ce qu'il contient
    </h2>

    {/* Liste des contenus */}
    <ul className="space-y-3 text-[#0a548d] font-bold leading-relaxed px-2 text-base sm:text-lg md:text-lg list-none">
      <li className="flex items-start gap-3">
        <span className="text-[#ff8200] text-xl mt-1">•</span>
        <span>Les fruits, légumes, céréales et légumineuses de saison.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-[#ff8200] text-xl mt-1">•</span>
        <span>De nombreuses astuces saines et durables faciles à mettre en pratique.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-[#ff8200] text-xl mt-1">•</span>
        <span>Un récapitulatif des huiles, leurs bénéfices et leurs usages.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-[#ff8200] text-xl mt-1">•</span>
        <span>Des recettes variées et gourmandes pour cuisiner les légumes différemment !</span>
      </li>
    </ul>
  </div>
);

export const ContentSection2 = ({ isMobile }) => (
    <div className={`w-full ${isMobile ? 'pt-10' : 'mt-6'} space-y-2 sm:space-y-3`}>
        {/* Titre principal */}
     <h2 className="text-[#0a548d] text-3xl font-bold text-center ClashDisplayBold">

            Contenu de la box
        </h2>

        {/* Poster */}
        <div className="text-center ArchivoLight">
            <span className={`text-[#ff8200] font-bold ArchivoLight ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                1 poster&nbsp;
            </span>
            <span className={`text-[#0a548d] ArchivoLight ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed`}>
            sur les grands enjeux de l'alimentation
            </span>
        </div>

        {/* 3 activités */}
        <div className="space-y-1">
            <div className={`text-[#ff8200] text-center font-bold ArchivoLight ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                3 activités :
            </div>

            <div className="space-y-1">
                {/* Recettes Secrètes */}
                <div className="text-center">
                    <span className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                       Mission 1 :
                    </span>
                    <span className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                       : Faites le ménage dans les ingrédients.

                    </span>
                </div>

                {/* Info ou Pipeau */}
                <div className="text-center">
                    <span className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                       Mission 2 :

                    </span>
                    <span className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                         le grand jeu des experts qui démasquent les intox alimentaires.
                    </span>
                </div>

                {/* Pub & Vérité */}
                <div className="text-center">
                    <span className={`text-[#0a548d] font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
                        Mission 3 :

                    </span>
                    <span className={`text-[#0a548d] ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
                  (Re) Découvrez le vrai goût des aliments.
                    </span>
                </div>
            </div>
        </div>

        {/* 3 dégustations guidées */}
        <div className="space-y-1">
                        <div className={`text-[#ff8200] text-center font-bold ArchivoLight ${isMobile ? 'text-base sm:text-lg' : 'text-lg'}`}>
               Et en bonus :
            </div>
            <div className={`text-[#0a548d] text-center ${isMobile ? 'text-xs sm:text-sm' : 'text-base'} leading-relaxed px-2`}>
               Devenez un reporter de transparence TV !
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
export const ContentGuide = () => (
  <div className="w-full md:mt-4 space-y-6">
    {/* Titre principal */}
    <h2 className="text-[#ff8200] text-3xl sm:text-4xl font-bold text-center ClashDisplayBold mb-8">
      Le sommaire
    </h2>

    {/* Liste numérotée principale */}
    <ol className="space-y-3 text-[#0a548d] font-bold text-lg sm:text-xl md:text-2xl px-2">
      <li className="flex items-start gap-3">
        <span>1.</span>
        <span>Listes des ingrédients</span>
      </li>
      <li className="flex items-start gap-3">
        <span>2.</span>
        <span>Informations nutritionnelles</span>
      </li>
      <li className="flex items-start gap-3">
        <span>3.</span>
        <span>Scores</span>
      </li>
      <li className="flex items-start gap-3">
        <span>4.</span>
        <span>Labels et certifications</span>
      </li>
      <li className="flex items-start gap-3">
        <span>5.</span>
        <span>Mentions marketing</span>
      </li>
    </ol>

    {/* Section Bonus */}
    <div className="pt-6 space-y-4">
      <h3 className="text-[#0a548d] text-2xl sm:text-3xl font-bold ClashDisplayBold">
        Bonus
      </h3>
      
      <ul className="space-y-2 text-[#0a548d] font-bold text-lg sm:text-xl md:text-xl px-2 list-none">
        <li className="flex items-start gap-3">
          <span className="text-[#0a548d] text-xl mt-1">•</span>
          <span>Choisir en moins d'une minute</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#0a548d] text-xl mt-1">•</span>
          <span>Les 10 produits à vérifier</span>
        </li>
      </ul>
    </div>
  </div>
);
export const ContentDetectiveBox = () => (
  <div className="w-full pt-10 md:mt-0 space-y-6">
    {/* Titre principal */}
    <h2 className="text-[#ff8200] text-2xl sm:text-3xl font-bold text-center ClashDisplayBold mb-6">
      Contenu de la Box
    </h2>

    {/* Sous-titre */}
    <p className="text-[#0a548d] text-lg sm:text-xl text-start mb-4 ArchivoLight">
      Un carnet par détective contenant 5 activités :
    </p>

    {/* Liste numérotée des activités */}
    <ol className="space-y-3 text-[#0a548d] font-bold text-base sm:text-lg md:text-xl px-6 mb-6 Archivo">
      <li className="flex items-start gap-3">
        <span>1.</span>
        <span>Le ménage dans les ingrédients</span>
      </li>
      <li className="flex items-start gap-3">
        <span>2.</span>
        <span>L'enquête dans les rayons</span>
      </li>
      <li className="flex items-start gap-3">
        <span>3.</span>
        <span>L'équilibre alimentaire</span>
      </li>
      <li className="flex items-start gap-3">
        <span>4.</span>
        <span>La recherche du vrai goût</span>
      </li>
      <li className="flex items-start gap-3">
        <span>5.</span>
        <span>Les reporterres de la transparence</span>
      </li>
    </ol>

    {/* Éléments additionnels avec "+" */}
    <div className="space-y-2 text-[#0a548d] Archivotext-base sm:text-lg md:text-xl ">
      <p className="flex items-start gap-2">
        <span className="text-[#0a548d]">+</span>
        <span>Un jeu de cartes ingrédients</span>
      </p>
      <p className="flex items-start gap-2">
        <span className="text-[#0a548d]">+</span>
        <span>Un set de pastilles scratch</span>
      </p>
      <p className="flex items-start gap-2">
        <span className="text-[#0a548d]">+</span>
        <span>Indications de mise en oeuvre</span>
      </p>
    </div>
  </div>
);
export default BoxPopup;

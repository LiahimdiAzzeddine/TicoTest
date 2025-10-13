import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

export default function Footer() {
  function handleClick(url) {
    window.open(url, "_blank");
  }

  function openPdf() {
    // Ajouter un timestamp pour éviter le cache
    var timestamp = new Date().getTime();
    var pdfUrl = "/pdfs/TiCO_DP_2025.pdf?t=" + timestamp;
    window.open(pdfUrl, "_blank");
  }

  return (
    <footer className="bg-white pt-16 pb-10 relative bg-no-repeat bg-contain"
      style={{
        backgroundImage: "url('/images/fond_footer.png')",
        backgroundPosition: "bottom",
        backgroundSize: "100% 150%",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Haut du footer */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          {/* Logo + boutons - Centré sur mobile */}
          <div className="w-full lg:flex-1 lg:max-w-xs flex flex-col items-center lg:items-start">
            {/* Logo centré */}
            <div className="flex justify-center w-full mb-8">
              <img src="/images/tico.webp" className="w-44 sm:w-52 lg:w-56" alt="TiCO logo" />
            </div>

            {/* Boutons sociaux centrés */}
            <div className="flex flex-col items-center gap-3 w-full">
              {/* Première ligne: App Store et Google Play côte à côte */}
              <div className="flex flex-row gap-3 justify-center ">
                {/* App Store */}
                <button
                  className="bg-[#165a99] text-white pr-2 pl-1 py-2 md:py-1 rounded-lg flex items-center justify-start gap-1 hover:bg-gray-800 transition-colors shadow-md"
                  onClick={() => handleClick("https://apps.apple.com/us/app/tico-scan/id6739306595")}
                >
                  <img className="w-6 h-6 2xl:w-7 2xl:h-7" src="/images/appstore.png" alt="App Store" />
                  <div className="text-left flex flex-col items-start justify-center">
                    <div className="2xl:text-xs text-[0.65rem] leading-none font-light">Télécharger sur</div>
                    <div className="2xl:text-sm text-xs leading-none font-bold">App Store</div>
                  </div>
                </button>

                {/* Google Play */}
                <button
                  className="bg-[#165a99] text-white pr-2 pl-1 py-2 md:py-1 rounded-lg flex items-center justify-start gap-1 hover:bg-gray-800 transition-colors shadow-md"
                  onClick={() => handleClick("https://play.google.com/store/apps/details?id=com.tico.foodhea.tico")}
                >
                  <img className="w-6 h-6 2xl:w-7 2xl:h-7" src="/images/googleplay.png" alt="Google Play" />
                  <div className="text-left flex flex-col items-start justify-center">
                    <div className="2xl:text-xs text-[0.65rem] leading-none font-light">Télécharger sur</div>
                    <div className="2xl:text-sm text-xs leading-none font-bold">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Deuxième ligne: Instagram centré */}
              <div className="flex justify-center w-full">
                <button
                  className="pr-2 pl-1 py-2  md:py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex justify-center items-center gap-1 hover:from-purple-600 hover:to-pink-600 transition-colors shadow-md"
                  onClick={() => handleClick("https://www.instagram.com/tico_scan/")}
                >
                  <img className="w-6 h-6 2xl:w-7 2xl:h-7" src="/images/instagram.png" alt="Instagram" />
                  <div className="text-left flex flex-col items-start justify-center">
                    <div className="2xl:text-xs text-[0.65rem] leading-none font-light">Nous suivre sur</div>
                    <div className="2xl:text-sm text-xs leading-none font-bold">Instagram</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 flex-1 w-full max-w-2xl mx-auto lg:mx-0">
            {/* Projet */}
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-orange-500 font-bold text-2xl md:text-lg mb-4 sm:mb-3">Projet</h3>
              <ul className="space-y-1 sm:space-y-2 text-lg md:text-sm">
                <li>
                  <a
                    onClick={() => handleClick("https://www.foodhea.com/origine#team")}
                    className="text-[#0a548d] hover:text-blue-950 cursor-pointer transition-colors duration-200 block py-1"
                  >
                    Équipe
                  </a>
                </li>
                <li>
                  <HashLink to="/application" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Transparence
                  </HashLink>
                </li>
                <li>
                  <HashLink to="/calendrier" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Calendrier
                  </HashLink>
                </li>
                <li>
                  <HashLink className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1" smooth to="/calendrier#guide">
                    Guide
                  </HashLink>
                </li>
              </ul>
            </div>

            {/* Application */}
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-orange-500 font-bold text-2xl md:text-lg  mb-4 sm:mb-3">Application</h3>
              <ul className="space-y-1 sm:space-y-2 text-lg md:text-sm">
                <li>
                  <HashLink to="/application#evaluation" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Évaluations
                  </HashLink>
                </li>
                <li>
                  <HashLink to="/application#tips" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Ti'Conseils
                  </HashLink>
                </li>
                <li>
                  <HashLink to="/application#recipes" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Tit'Recettes
                  </HashLink>
                </li>
                <li>
                  <Link to="/faqs" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Liens utiles */}
            <div className="space-y-3 col-span-2 md:col-span-1 text-center md:text-left">
              <h3 className="text-orange-500 font-bold text-2xl md:text-lg  mb-4 sm:mb-3">Liens utiles</h3>
              <ul className="space-y-1 sm:space-y-2 text-lg md:text-sm">
                <li>
                  <Link to="/contact" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/legalNotices" className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() => handleClick("/pdfs/TiCO_DP_2025.pdf")}
                    className="text-[#0a548d] hover:text-blue-950 transition-colors duration-200 block py-1 cursor-pointer"
                  >
                    Dossier de Presse
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

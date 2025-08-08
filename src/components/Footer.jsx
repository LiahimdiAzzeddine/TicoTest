import React from "react";
import StoreLinks from "./ui/StoreLinks";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-10 relative bg-no-repeat bg-contain"
    style={{
          backgroundImage: "url('/images/fond_footer.png')",
          backgroundPosition: "bottom",
                    backgroundSize: "100% 150%",

        }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Haut du footer */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          {/* Logo + boutons */}
          <div className="flex-1 max-w-xs">
            <div className="flex flex-col items-center">
              <img src="/images/tico.webp" className="w-40 sm:w-56 mb-6" alt="TiCO logo" />
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* Première ligne: App Store et Google Play côte à côte */}
              <div className="flex flex-row gap-2">
                {/* App Store */}
                <button
                  className="bg-[#165a99] text-white pr-2 pl-1 py-1 rounded-lg flex items-center justify-start gap-1 hover:bg-gray-800 transition-colors"
                  onClick={() => handleClick("https://apps.apple.com/us/app/tico-scan/id6739306595")}
                >
                  <img className="w-6 h-6 2xl:w-7 2xl:h-7" src="/images/appstore.png" alt="App Store" />
                  <div className="text-left flex flex-col items-start justify-center">
                    <div className="2xl:text-xs text-[0.65rem] leading-none ArchivoLight">Télécharger sur</div>
                    <div className="2xl:text-ms text-xs leading-none Archivolight font-bold">App Store</div>
                  </div>
                </button>

                {/* Google Play */}
                <button
                  className="bg-[#165a99] text-white pr-2 pl-1 py-1 rounded-lg flex items-center justify-start gap-1 hover:bg-gray-800 transition-colors"
                  onClick={() => handleClick("https://play.google.com/store/apps/details?id=com.tico.foodhea.tico")}
                >
                  <img className="w-6 h-6 2xl:w-7 2xl:h-7" src="/images/googleplay.png" alt="Google Play" />
                  <div className="text-left flex flex-col items-start justify-center">
                    <div className="2xl:text-xs text-[0.65rem] leading-none ArchivoLight">Télécharger sur</div>
                    <div className="2xl:text-ms text-xs leading-none Archivolight font-bold">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Deuxième ligne: Instagram centré */}
              <div className="flex justify-center">
                <button
                  className="pr-2 pl-1 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex justify-center items-center gap-1 hover:from-purple-600 hover:to-pink-600 transition-colors"
                  onClick={() => handleClick("https://www.instagram.com/tico_scan/")}
                >
                  <img className="w-6 h-6 2xl:w-7 2xl:h-7" src="/images/instagram.png" alt="Instagram" />
                  <div className="text-left flex flex-col items-start justify-center">
                    <div className="2xl:text-xs text-[0.65rem] leading-none ArchivoLight">Nous suivre sur</div>
                    <div className="2xl:text-ms text-xs leading-none Archivolight font-bold">Instagram</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 w-full max-w-xl">
            {/* Projet */}
            <div>
              <h3 className="text-orange-500 font-bold text-lg mb-2">Projet</h3>
              <ul className="space-y-2 text-sm">
                <li><a  onClick={() => {
            window.open("https://www.foodhea.com/origine#team", "_blank");
          }} className="text-blue-600 hover:text-blue-800">Équipe</a></li>
                <li><Link to="/application" className="text-blue-600 hover:text-blue-800">Transparence</Link></li>
                <li><Link to="/calendrier" className="text-blue-600 hover:text-blue-800">Calendrier</Link></li>
                <li><Link to="/calendrier#guide" className="text-blue-600 hover:text-blue-800">Guide</Link></li>
              </ul>
            </div>

            {/* Application */}
            <div>
              <h3 className="text-orange-500 font-bold text-lg mb-2">Application</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/application" className="text-blue-600 hover:text-blue-800">Descriptif</Link></li>
                <li><Link to="/application" className="text-blue-600 hover:text-blue-800">Évaluations</Link></li>
                <li><Link to="/application" className="text-blue-600 hover:text-blue-800">Ti'Conseils</Link></li>
                <li><Link to="/application" className="text-blue-600 hover:text-blue-800">Tit'Recettes</Link></li>
                <li><Link to="/faqs" className="text-blue-600 hover:text-blue-800">FAQ</Link></li>
              </ul>
            </div>

            {/* Liens utiles */}
            <div>
              <h3 className="text-orange-500 font-bold text-lg mb-2">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
                <li>  <Link to="/legalNotices" className="text-blue-600 hover:text-blue-800">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

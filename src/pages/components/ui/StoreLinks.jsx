import React from 'react';

const StoreLinks = () => {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 place-items-center md:place-items-start gap-3">
      {/* App Store */}
      <button
        className="bg-[#165a99] text-white pr-2 pl-1 py-1 rounded-lg flex items-center justify-start gap-1 hover:bg-gray-800 transition-colors "
        onClick={() =>
          handleClick(
            "https://apps.apple.com/us/app/tico-scan/id6739306595"
          )
        }
      >
        <img
          className="w-6 h-6 2xl:w-7 2xl:h-7"
          src="/images/appstore.png"
          alt="App Store"
        />
        <div className="text-left flex flex-col items-start justify-center">
          <div className="2xl:text-xs text-[0.65rem] leading-none ArchivoLight">
            Télécharger sur
          </div>
          <div className="2xl:text-ms text-xs leading-none Archivolight font-bold">
            App Store
          </div>
        </div>
      </button>

      {/* Google Play */}
      <button
        className="bg-[#165a99] text-white pr-2 pl-1 py-1 rounded-lg flex items-center justify-start gap-1 hover:bg-gray-800 transition-colors "
        onClick={() =>
          handleClick(
            "https://play.google.com/store/apps/details?id=com.tico.foodhea.tico"
          )
        }
      >
        <img
          className="w-6 h-6 2xl:w-7 2xl:h-7"
          src="/images/googleplay.png"
          alt="Google Play"
        />
        <div className="text-left flex flex-col items-start justify-center">
          <div className="2xl:text-xs text-[0.65rem] leading-none ArchivoLight">
            Télécharger sur
          </div>
          <div className="2xl:text-ms text-xs leading-none Archivolight font-bold">
            Google Play
          </div>
        </div>
      </button>

      {/* Instagram */}
      <button
        className="col-span-2 md:col-span-1 justify-self-center md:justify-self-start pr-2 pl-1 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex justify-center items-center gap-1 hover:from-purple-600 hover:to-pink-600 transition-colors text-center "
        onClick={() => handleClick("https://www.instagram.com/tico_scan/")}
      >
        <img
          className="w-6 h-6 2xl:w-7 2xl:h-7"
          src="/images/instagram.png"
          alt="Instagram"
        />
        <div className="text-left flex flex-col items-start justify-center">
          <div className="2xl:text-xs text-[0.65rem] leading-none ArchivoLight">
            Nous suivre sur
          </div>
          <div className="2xl:text-ms text-xs leading-none Archivolight font-bold">
            Instagram
          </div>
        </div>
      </button>
    </div>
  );
};

export default StoreLinks;

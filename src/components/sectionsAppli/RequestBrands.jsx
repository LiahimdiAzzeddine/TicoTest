import React from "react";
import StepTitle from "../ui/stepTitle";

const RequestBrands = () => {
  const statuses = [
    {
      icon: "/images/pending.png",
      text: "En attente de réponse de la marque",
      bg: "bg-[#d1fae5]",
    },
    {
      icon: "/images/processing.png",
      text: "La marque est en train de dévoiler les infos",
      bg: "bg-[#d1fae5]",
    },
    {
      icon: "/images/rejected.png",
      text: "La marque a refusé de dévoiler les infos",
      bg: "bg-[#d1fae5]",
    },
    {
      icon: "/images/addOutline.png",
      text: "Insister pour que la marque s'engage",
      bg: "bg-[#d1fae5]",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl px-4 lg:px-0 py-8 sm:py-12 mx-auto gap-6 sm:gap-8 lg:gap-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 sm:gap-10 lg:gap-12 w-full">

        {/* Bloc Gauche : texte + image */}
        <div className="flex flex-col items-center lg:items-start justify-start text-center lg:text-start w-full lg:w-3/5 xl:w-2/3 gap-4 sm:gap-6">
          <p className="text-[#50916e] max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg ArchivoLight font-bold text-base lg:text-lg leading-relaxed pt-4 md:pt-0">
            Pour demander aux marques de dévoiler toutes les informations sur les produits, un clic sur ce bouton suffit !
          </p>
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src="/images/image-removebg.png"
              alt="Smartphone"
              className="w-full h-auto drop-shadow-xl transform lg:translate-x-8 xl:translate-x-12"
            />
          </div>
        </div>

        {/* Bloc droit : titre + statuts */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-2/5 xl:w-1/3 gap-4 sm:gap-6">
          <div className="w-full">
            <StepTitle center={false}>
              <span className="text-[#50916e]">Suivre les&nbsp;</span>
              <span className="text-[#ff8300] font-bold">demandes</span>
            </StepTitle>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md lg:max-w-none">
            {statuses.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-3 ${item.bg} px-3 sm:px-3 py-2 sm:py-0 rounded-lg text-[#50916e] min-h-[48px] sm:min-h-[52px]`}
              >
                <img 
                  src={item.icon} 
                  alt="" 
                  className="w-10 h-10 flex-shrink-2 " 
                />
                <span className="text-xs md:text-sm ArchivoLight font-bold leading-tight ">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestBrands;
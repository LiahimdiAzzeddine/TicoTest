import React from "react";
import StepTitle from "../ui/stepTitle";

const ScanProducts = () => {
  return (
    <div className="flex flex-col justify-between w-full max-w-6xl gap-8 md:gap-14">
      <StepTitle center={false}>
        <span className="text-[#ff8300] font-bold">Scannez</span>{" "}
        <span className="text-[#0a548d]">vos produits alimentaires</span>
      </StepTitle>
      <div className="flex flex-col md:flex-row items-center justify-between w-full  ">
        {/* Left: Smartphone image */}
        <div className="flex flex-col items-center justify-center flex-[1]">
          <img
            src={"/images/4.png"}
            alt="Smartphone app"
            className="w-40 md:w-44 drop-shadow-2xl"
          />
        </div>

        {/* Right: Text content */}
        <div className="flex-[2] text-left">
          <div className="space-y-2 md:space-y-4 text-[#0a548d] text-base md:text-lg leading-relaxed Archivo">
            <p className="ArchivoLight font-bold">
              <span className="text-[#ff8300] ArchivoBold font-bold">Transparence</span> <br />
              <span className="font-semibold">TiCO</span> définit et évalue la
              transparence des marques en détaillant toutes les informations
              essentielles à connaître.
            </p>

            <p className="ArchivoLight font-bold">
              <span className="text-[#ff8300] ArchivoBold font-bold">Impact</span> <br />
              <span className="font-semibold">TiCO</span> vous donne la
              possibilité d’interpeller les marques pour qu’elles lèvent le voile
              sur leurs produits.
            </p>

            <p className="ArchivoLight font-bold">
              <span className="text-[#ff8300] ArchivoBold font-bold">Astuces</span> <br />
              Retrouvez tous les mois de nouveaux Ti’Conseils santé, cuisine,
              antigaspillage, conservation et bien d’autres.
            </p>

            <p className="ArchivoLight font-bold">
              <span className="text-[#ff8300] ArchivoBold font-bold">Recettes</span> <br />
              Découvrez et ajoutez vos recettes préférées pour les retrouver sur
              une interface pratique et sans publicité.
            </p>
          </div>
        </div>
        </div>
    </div>
  );
};

export default ScanProducts;

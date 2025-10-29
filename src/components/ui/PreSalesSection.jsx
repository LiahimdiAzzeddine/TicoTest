// components/PreSalesSection.jsx
import React from "react";

export function PreSalesSection() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="text-center">
        <h3 className="text-5xl font-black text-[#ff8300] mb-2 ClashDisplayBold">
          Pré-ventes !<br></br>
1000 box
        </h3>
        <p className="text-5xl font-black text-[#ff8300] mb-4 ClashDisplayBold">
          -20%
        </p>
        <p className="text-xl font-bold ClashDisplayBold">
          <span className="text-[#ff8300]">Réservez dès maintenant</span>{" "}
          <span className="text-[#0a548d]">votre</span>
        </p>
        <p className="text-lg font-bold text-[#0a548d] ClashDisplayBold">
          box Ti'Conso et recevez-la à
        </p>
        <p className="text-xl font-bold text-[#0a548d] mb-2 ClashDisplayBold">
          temps pour Noël !
        </p>

        {/* Gift icon */}
        <div className="flex justify-center">
          <img src="images/cadeau.svg" className="w-24" alt="Cadeau" />
        </div>

        {/* Countdown timer */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <img src="images/horloge.svg" className="w-16" alt="Horloge" />
          <div className="flex flex-col justify-start items-start">
            <p className="text-base ClashDisplayBold">
              <span className="font-bold text-[#0a548d]">Plus que : </span>
              <span className="font-bold text-[#ff8300]">45 jours 3 h et 10 min</span>
            </p>
            <p className="text-base text-[#0a548d] ClashDisplayBold">
              Pour réservez{" "}
              <span className="text-[#ff8300] font-bold">
                votre box à prix réduit !
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

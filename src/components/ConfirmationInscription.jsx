import React from "react";

const ORANGE_FROM = "#ff8200";
const ORANGE_TO = "#ff8200";

const BLUE = "#0a548d";
const PANEL = "#dff3f4";

/**
 * Panneau de confirmation après envoi du formulaire
 */
export default function ConfirmationInscription({
  className = "",
  // message découpé pour pouvoir colorer une partie en dégradé
  before = "Votre ",
  highlight = "inscription est bien prise en compte",
  after = ", un mail récapitulatif vient de vous être envoyé, dès la vérifications des éléments transmis notre équipe vous contactera pour démarrer le financement de votre commande !",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mx-auto max-w-5xl min-h-screen  ${className}`}
    >
      <div
        className="rounded-[24px] md:rounded-[28px] px-6 py-10 md:px-10 md:py-14"
        style={{ backgroundColor: PANEL }}
      >
        <p
          className="text-center font-extrabold leading-snug tracking-tight
                     text-[20px] md:text-[26px]"
          style={{ color: BLUE }}
        >
          {before}
          <span
            className="bg-gradient-to-b bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${ORANGE_FROM}, ${ORANGE_TO})`,
            }}
          >
            {highlight}
          </span>
          {after}
        </p>
      </div>
    </div>
  );
}

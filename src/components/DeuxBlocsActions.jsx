import React from "react";
import StepTitle from "./ui/StepTitle";
import { useNavigate } from "react-router-dom";

const BLUE = "#0a548d";

/* --- Carte avec fond image --- */
function BlobCard({
  bg = "/images/fondbeige.png",
  title,
  buttonText = "C’est par ici",
  onClick,
}) {
  return (
    <div
      className="relative w-full h-[310px] md:h-[500px] md:w-full grid place-items-center text-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="-mt-12 md:-mt-16">
        <h3
          className="ClashDisplayBold  leading-tight tracking-normal text-2xl"
          style={{ color: BLUE }}
        >
          {title}
        </h3>

        <button
          type="button"
          onClick={onClick}
          className="mx-auto mt-16 md:mt-24 inline-flex items-center justify-center rounded-xl px-5 py-3 text-white font-semibold shadow-sm text-xl"
          style={{ backgroundColor: BLUE }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}



/* --- Composant principal --- */
export default function DeuxBlocsActions({
  fondImg = "/images/fond11.png",
  fondImg2 = "/images/fond22.png",
  onOrgClick = () => { },
  onFundClick = () => { },
}) {
  return (
    <div className="flex flex-col justify-start items-center  gap-8 md:gap-10">
      <StepTitle center={true}>
        <span className="text-[#0a548d]">
          Achat participatif&nbsp;
        </span>
        <span className="text-[#ff8300] font-bold">
          pour aider des&nbsp;
        </span>
        <span className="text-[#0a548d]">
          organisations à bénéficier du kit TiCO
        </span>
      </StepTitle>
      <div className="ComicNeueBold text-xl text-center md:text-4xl">
        <span className="text-[#0a548d]">Déjà</span> <span className="text-[#ff8300] ">3 structures équipées</span> <span className="text-[#0a548d]">grâce à vous&nbsp;!</span>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-center gap-y-8 md:gap-x-11 w-full max-w-6xl ">

        <BlobCard
          bg={fondImg2}
          title={
            <>
              J’inscris mon
              <br />
              organisation pour
              <br />
            obtenir un kit
            </>
          }
          onClick={onOrgClick}
        />

        <BlobCard
          bg={fondImg}
          title={
            <>
            Je participeà
              <br />
             l’achat d’un kit pour
              <br />
            un groupe d’enfants
            </>
          }
          onClick={onFundClick}
        />
      </div>
    </div>
  );
}

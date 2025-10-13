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
      className="relative w-[320px] h-[285px] md:w-[360px] md:h-[300px] grid place-items-center text-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-8 -mt-28">
        <h3
          className="font-extrabold leading-tight tracking-tight text-2xl"
          style={{ color: BLUE }}
        >
          {title}
        </h3>

        <button
          type="button"
          onClick={onClick}
          className="mx-auto mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-white font-semibold shadow-sm"
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
  fondImg = "/images/fondbeige.png",
  onOrgClick = () => { },
  onFundClick = () => { },
}) {
  return (
    <div className="flex flex-col justify-start items-start gap-20 md:gap-16 lg:gap-20">
      <StepTitle center={true}>
        <span className="text-[#0a548d]">
          Déjà&nbsp;
        </span>
        <span className="text-[#ff8300] font-bold">
          3 structures équipées&nbsp;
        </span>
        <span className="text-[#0a548d]">
          grâce à vous&nbsp;!
        </span>
      </StepTitle>

      <div className=" grid place-items-center gap-14 md:grid-cols-2">
        <BlobCard
          bg={fondImg}
          title={
            <>
              J’inscris mon
              <br />
              organisation
              <br />
              pour recevoir
              <br />
              une box
            </>
          }
          onClick={onOrgClick}
        />

        <BlobCard
          bg={fondImg}
          title={
            <>
              J’aide à financer
              <br />
              une box pour
              <br />
              un groupe
              <br />
              d’enfants
            </>
          }
          onClick={onFundClick}
        />
      </div>
    </div>
  );
}

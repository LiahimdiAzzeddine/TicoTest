import React from "react";
import StepTitle from "./ui/StepTitle";
import { useNavigate } from "react-router-dom";

const BLUE = "#0a548d";

/* --- Carte avec fond image --- */
function BlobCard({
  bg = "/images/fondbeige.png",
  img,
  title,
  buttonText = "C’est par la",
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
          transform: "scale(1.1)",
      }}
    >
      <div className="relative sm:-mt-6 flex flex-col justify-center items-center text-center z-10 w-full max-w-[90%] md:max-w-[75%] lg:max-w-[65%]">
        <h3
          className="ClashDisplayBold leading-snug md:leading-tight tracking-normal text-lg sm:text-xl md:text-2xl 2xl:text-2xl "
          style={{ color: BLUE }}
        >
          {title}
        </h3>

        {img && (
          <img
            src={img}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain my-3"
          />
        )}

        <button
          type="button"
          onClick={onClick}
          className="mx-auto inline-flex items-center justify-center rounded-xl px-5 sm:px-6 py-2 sm:py-3 text-white font-semibold shadow-sm text-sm sm:text-base md:text-lg transition-transform active:scale-95"
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
  fondImg = "/images/fond11.jpeg",
  fondImg2 = "/images/fond22.jpeg",
  Img = "/images/fonnd111.png",
  Img2 = "/images/fond222.png",
  onOrgClick = () => { },
  onFundClick = () => { },
}) {
  return (
    <div className="flex flex-col justify-start items-center  gap-8 md:gap-10">
      <StepTitle center={true}>
        <span className="text-[#0a548d]">
          Achat participatif&nbsp;
        </span>
        <span className="text-[#ff8200] font-bold">
          pour aider des&nbsp;
        </span>
        <span className="text-[#0a548d]">
          organisations&nbsp;
        </span>
        <br></br>
        <span> à bénéficier du kit TiCO</span>
      </StepTitle>
      {/* <div className="ComicNeueBold text-xl text-center md:text-4xl">
        <span className="text-[#0a548d]">Déjà</span> <span className="text-[#ff8200] ">3 structures équipées</span> <span className="text-[#0a548d]">grâce à vous&nbsp;!</span>
      </div> */}

      <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-center gap-y-8 md:gap-x-11 w-full max-w-6xl ">

        <BlobCard
          bg={fondImg2}
          img={Img2}
          title={
            <>
            Je participe à
              <br />
             l’achat d’un kit pour
              <br />
            un groupe d’enfants
            </>
          }
         onClick={onFundClick}
        />

        <BlobCard
          bg={fondImg}
          img={Img}
          title={<>
              J’inscris mon
              <br />
              organisation pour
              <br />
            obtenir un kit
            </>

          }
          onClick={onOrgClick}

        />
      </div>
    </div>
  );
}

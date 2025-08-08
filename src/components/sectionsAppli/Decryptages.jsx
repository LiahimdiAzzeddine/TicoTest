import React from "react";
import StepTitle from "../ui/stepTitle";
import StoreLinks from "../ui/StoreLinks";

const Decryptages = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse w-full max-w-6xl mx-auto gap-8 md:gap-14">
      {/* Image block */}
      <div className="flex flex-col items-center md:items-start justify-start w-full md:w-5/12 gap-6">
        <img
          src="/images/aile-et-telephone.png"
          alt="Smartphone app"
          className="w-60 md:w-[26rem] drop-shadow-2xl"
        />
        <StoreLinks />
      </div>

      {/* Text block */}
      <div className="flex flex-col items-start justify-between gap-5 md:gap-10 flex-1">
        <StepTitle center={false}>
          <span className="text-[#0a548d]">Décryptages&nbsp;</span>
          <span className="text-[#ff8300] font-bold">indépendants</span>
        </StepTitle>

        <div className="space-y-4 text-[#0a548d] text-base md:text-lg leading-relaxed ArchivoLight font-bold w-full">
          <p>
            Notre équipe analyse les informations transmises par les marques
            pour vous offrir un maximum de détails. Ce travail demande du temps
            et de l’expertise, c’est pourquoi nous avons mis en place une{" "}
            <span className="text-[#ff8300] font-bold">
              méthodologie stricte
            </span>{" "}
            qui garantit notre indépendance - un élément clé pour assurer une
            transparence réelle.
          </p>
          <p>
            Les décryptages font partie de l’évaluation de la transparence : les
            marques qui souhaitent atteindre 100 % de transparence doivent
            s’engager à suivre notre méthodologie.
          </p>
          <p>
            Ainsi, la transparence est aux frais des marques et l’application
            reste entièrement gratuite pour vous, car la transparence est un
            droit qui doit être accessible à tous.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Decryptages;

import StepTitle from "../ui/StepTitle";

export default function TitRecipes() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-10">
      <div className="hidden md:flex flex-1 justify-center opacity-0 translate-x-[-30px] animate-[fadeInLeft_0.8s_ease-out_0.2s_forwards]">
        <img
          src="/images/recettes.png"
          alt="Recettes"
          className="2xl:w-[26rem] w-96 "
        />
      </div>

      <div className="text-[#0a548d] max-w-md text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
        <div className="opacity-0 translate-y-[-20px] animate-[fadeInDown_0.8s_ease-out_0.3s_forwards]">
          <StepTitle center={false}>
            <span className="text-[#0a548d]">Des Tit' recettes&nbsp;</span>
            <span className="text-[#c22823] font-bold">sans publicité</span>
          </StepTitle>
        </div>

        <div className="flex justify-center md:hidden w-full opacity-0 scale-90 animate-[fadeInScale_0.8s_ease-out_0.4s_forwards]">
          <img
            src="/images/recettes.png"
            alt="Recettes mobile"
            className="w-52 "
          />
        </div>

        <div className="flex flex-col gap-4 opacity-0 translate-y-[20px] animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start transition-colors duration-300 hover:text-[#c22823]">
            Tous les mois de nouvelles recettes garanties sans publicité !
          </p>
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start transition-colors duration-300 hover:text-[#c22823]">
            Découvrez l'interface de lecture la plus pratique pour suivre des
            recettes en toute simplicité.
          </p>
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start transition-colors duration-300 hover:text-[#c22823]">
            Partagez vos recettes préférées pour les faire connaître et les
            retrouver en un clic dans{" "}
            <span className="text-[#ff8200] font-bold ArchivoBold">TiCO</span>.
          </p>
          <img
            src="/images/Design1.png"
            className="p-4 h-40 w-40 mx-auto transition-opacity duration-500 hover:opacity-80"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

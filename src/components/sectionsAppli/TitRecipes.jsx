import StepTitle from "../ui/StepTitle";

export default function TitRecipes() {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-14"
     
    >
      {/* Image visible sur desktop uniquement */}
      <div className="hidden md:flex flex-1  justify-center">
        <img
          src="/images/recettes.png"
          alt="Recettes"
          className="2xl:w-[26rem] w-96 drop-shadow-md"
        />
      </div>

      {/* Texte avec image mobile insérée entre le titre et le texte */}
      <div className="text-[#0a548d] max-w-md text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
    
          <StepTitle center={false}>
            <span className="text-[#0a548d]">Des Tit’ recettes&nbsp;</span>
            <span className="text-[#ff8300] font-bold">sans publicité</span>
          </StepTitle>

          {/* Image visible uniquement sur mobile */}
          <div className="flex justify-center md:hidden w-full">
            <img
              src="/images/recettes.png"
              alt="Recettes mobile"
              className="w-52 drop-shadow-md"
            />
          </div>
          <div className="flex flex-col gap-4">
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
            Tous les mois de nouvelles recettes garanties sans publicité !
          </p>
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
            Découvrez l’interface de lecture la plus pratique pour suivre des
            recettes en toute simplicité.
          </p>
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
            Partagez vos recettes préférées pour les faire connaître et les
            retrouver en un clic dans{" "}
            <span className="text-[#ff8300] font-bold ArchivoBold">TiCO</span>.
          </p>
          </div>

      </div>
    </div>
  );
}

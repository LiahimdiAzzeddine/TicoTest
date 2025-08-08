import StepTitle from "../ui/stepTitle";

export default function MonthlyTips() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-14">
      {/* Texte étape 4 */}
      <div
        className="text-[#0a548d] max-w-md text-center md:text-left flex flex-col gap-10 flex-1"
      
      >
        <div className="flex flex-col justify-start items-start gap-8 md:gap-14">
          <StepTitle center={false}>
            <span className="text-[#0a548d]">Des Ti’conseils&nbsp;</span>
            <span className="text-[#ff8300] font-bold">réguliers</span>
          </StepTitle>

          {/* Image visible sur mobile uniquement */}
          <div className="flex justify-center w-full md:hidden">
            <img
              src="/images/conseils.png"
              alt="Ti’conseils"
              className="w-52 drop-shadow-md"
            />
          </div>
<div className="flex flex-col gap-4">
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
            Tous les mois de nouveaux Ti’Conseils pour apprendre des astuces
            pratiques sur l’utilisation, la conservation ou les intérêts santé
            des produits.
          </p>
          <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start">
            Mais aussi des conseils antigaspi, techniques culinaires, cuisine
            durable, pour se faire plaisir ou encore pour comprendre le dessous
            des étiquettes.
          </p></div>
        </div>
      </div>

      {/* Image visible sur desktop uniquement */}
      <div className="hidden md:flex flex-1 justify-center">
        <img
          src="/images/conseils.png"
          alt="Ti’conseils"
          className="2xl:w-[26rem] w-96 drop-shadow-md"
        />
      </div>
    </div>
  );
}

import StepTitle from "../ui/StepTitle";

export default function MonthlyTips() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-10">
      <div className="text-[#0a548d] max-w-md text-center md:text-left flex flex-col gap-10 flex-1">
        <div className="flex flex-col justify-start items-start gap-8 md:gap-14">
          <div className="opacity-0 translate-y-[-20px] animate-[fadeInDown_0.8s_ease-out_0.3s_forwards]">
            <StepTitle center={false}>
              <span className="text-[#0a548d]">Des Ti'conseils&nbsp;</span>
              <span className="text-[#ff8300] font-bold">réguliers</span>
            </StepTitle>
          </div>

          <div className="flex justify-center w-full md:hidden opacity-0 scale-90 animate-[fadeInScale_0.8s_ease-out_0.4s_forwards]">
            <img
              src="/images/conseils.png"
              alt="Ti'conseils"
              className="w-52 "
            />
          </div>

          <div className="flex flex-col gap-4 opacity-0 translate-y-[20px] animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start transition-colors duration-300 hover:text-[#ff8300]">
              Tous les mois de nouveaux Ti'Conseils pour apprendre des astuces
              pratiques sur l'utilisation, la conservation ou les intérêts santé
              des produits.
            </p>
            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold text-start transition-colors duration-300 hover:text-[#ff8300]">
              Mais aussi des conseils antigaspi, techniques culinaires, cuisine
              durable, pour se faire plaisir ou encore pour comprendre le dessous
              des étiquettes.
            </p>
               <img
            src="/images/Design2.png"
            className="p-4 h-40 w-40 mx-auto transition-opacity duration-500 hover:opacity-80"
          />
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 justify-center opacity-0 translate-x-[30px] animate-[fadeInRight_0.8s_ease-out_0.2s_forwards]">
        <img
          src="/images/conseils.png"
          alt="Ti'conseils"
          className="2xl:w-[26rem] w-96 "
        />
      </div>

      <style>{`
        @keyframes fadeInRight {
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

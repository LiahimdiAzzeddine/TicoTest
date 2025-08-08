import StepTitle from "../ui/StepTitle";

const Eengagement = () => {
  return (
    <div className="flex flex-col w-full max-w-6xl gap-8 md:gap-14">
      {/* Titre */}
      <StepTitle center={false}>
        <span className="text-[#50916e]">Votre engagement est&nbsp;</span>
        <span className="text-[#ff8300] font-bold">récompensé</span>{" "}
      </StepTitle>

      {/* Image visible sur mobile seulement (entre titre et texte) */}
      <div className="flex md:hidden items-center justify-center">
        <img
          src={"/images/cadeaux.png"}
          alt="Cadeaux"
          className="w-60 drop-shadow-2xl"
        />
      </div>

      {/* Bloc principal (desktop: texte + image) */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-14">
        {/* Texte */}
        <div className="flex-1 text-left">
          <div
            className="space-y-4 text-[#50916e] text-base md:text-lg leading-relaxed ArchivoLight"
            
          >
            <p>
              Des stories stylées pour les réseaux, un calendrier de fruits
              et légumes de saison, un guide pour déjouer les pièges sur
              les produits alimentaires, des box découvertes avec de
              super produits et bien d'autres surprises vous attendent !
            </p>

            <p>
              Parce que votre participation est essentielle pour faire
              bouger les marques,{" "}
              <span className="font-bold">
                rejoignez la communauté des consommateurs engagés !
              </span>
            </p>
          </div>
        </div>

        {/* Image (desktop only) */}
        <div className="hidden md:flex flex-col items-center justify-center ">
          <img
            src={"/images/cadeaux.png"}
            alt="Smartphone app"
            className="2xl:w-[26rem] lg:w-[25rem] w-96 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Eengagement;

import TitleSection from "../ui/TitleSection";

function Transparence() {
  return (
    <div className="max-w-6xl flex flex-col md:flex-col items-center justify-start gap-12 lg:gap-28 2xl:gap-32">
      {/* Titre principal */}
      <TitleSection center={true}>
      <div className="leading-none md:leading-tight">
        La transparence, pour l'avoir il faut la<br></br>
        demander
        </div>
      </TitleSection>

      {/* Section avec les trois éléments */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* 1. Ampoule */}
        <div className="flex flex-col items-center text-center max-w-xs gap-1 md:mt-28">
          <div className="relative mb-2">
            <img className="2xl:w-48 2xl:h-48 md:w-40 md:h-40 w-32 h-32" src="/images/20.png" alt="Ampoule" />
          </div>
          <p className="text-base 2xl:text-xl text-[#0a548d] leading-4 ArchivoLight ">
            Seules les marques ont<br />les informations sur<br />leurs produits
          </p>
        </div>

        {/* Flèche 1 (affichée seulement à partir de lg) */}
        <div className="hidden lg:block rotate-[20deg] lg:-mt-24">
          <img className="2xl:w-16 2xl:h-16 w-14 h-14" src="/images/fleche1.jpg" alt="Flèche 1" />
        </div>

        {/* 2. Bulles de dialogue */}
        <div className="flex flex-col items-center text-center max-w-xs gap-1 md:-mt-16 ">
          <div className="relative mb-2">
            <img className="2xl:w-48 2xl:h-48 md:w-40 md:h-40 w-32 h-32" src="/images/22.png" alt="Bulles" />
          </div>
          <p className="text-base 2xl:text-xl text-[#0a548d] leading-4 ArchivoLight ">
            Demandons-leur de<br />toutes les dévoiler<br />selon un cadre établi
          </p>
        </div>

        {/* Flèche 2 (affichée seulement à partir de lg) */}
        <div className="hidden lg:block -rotate-[25deg] lg:-mt-24">
          <img className=" 2xl:w-16 2xl:h-16 w-14 h-14" src="/images/fleche2.jpg" alt="Flèche 2" />
        </div>

        {/* 3. Loupe */}
        <div className="flex flex-col items-center text-center max-w-xs gap-1 md:mt-28">
          <div className="relative mb-2">
            <img className="2xl:w-48 2xl:h-48 md:w-40 md:h-40 w-32 h-32" src="/images/24.png" alt="Loupe" />
          </div>
          <p className="text-base 2xl:text-xl text-[#0a548d] leading-4 ArchivoLight  ">
            Et de les faire décrypter<br />par des experts<br />indépendants
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transparence;

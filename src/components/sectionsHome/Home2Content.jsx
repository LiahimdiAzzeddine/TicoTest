import StartSection from "../../Templates/StartSection";
import BigTitle from "../ui/BigTitle";

export default function Home2Content() {
  return (
    <StartSection pb="pb-8 md:pb-12 lg:pb-16">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 max-w-screen-xl mx-auto">
        {/* --- Version mobile --- */}
        <BigTitle center={true} className="w-full block md:hidden">
          <span className="text-[#ff8300]">Démarche citoyenne </span>
          <span className="text-[#0a548d]">pour&nbsp;une&nbsp;alimentation </span>
          <br />
          <span className="text-[#0a548d]">
            plus&nbsp;claire,&nbsp;plus&nbsp;juste
          </span>
          <br />
          <span className="text-[#0a548d]">et plus consciente.</span>
        </BigTitle>

        {/* --- Version desktop --- */}
        <BigTitle center={true} className="w-full hidden md:block">
          <span className="text-[#ff8300]">Démarche citoyenne </span>
          <span className="text-[#0a548d]">pour&nbsp;une</span>
          <br />
          <span className="text-[#0a548d]">
            alimentation plus claire,&nbsp;plus
          </span>
          <br />
          <span className="text-[#0a548d]">juste et plus consciente.</span>
        </BigTitle>


        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <img
            src="/images/Design.webp"
            alt="Caddie avec ampoule symbolisant une démarche éclairée"
            className="w-full h-auto"
          />
        </div>
      </div>
    </StartSection>
  );
}

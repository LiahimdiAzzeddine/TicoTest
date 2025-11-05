
import CalendrierPage from "../components/CalendrierPage";
import CommandeGrid from "../components/CommandeGrid";
import DetectiveBox from "../components/DetectiveBox";
import Guidepage from "../components/Guidepage";
import JeuPage from "../components/JeuPage";
import OffresSpeciales from "../components/OffresSpeciales";
import HomeSection from "../Templates/HomeSection";
import StartSection from "../Templates/StartSection";


export default function AtHome() {
    const handleAdd = (title, qty) => {
        // intègre ton panier ici
        console.log("Ajout:", title, qty);
    };
    return (
        <>
            <StartSection pb={'md:pb-32 pb-16'} id="calendrier">
                <CalendrierPage />
            </StartSection>
            <HomeSection id="guide">
                <Guidepage />
            </HomeSection>
            {/*  */}
             <div className="flex justify-center items-center mb-12 w-full">
          <div className="bg-[#FFECA7] px-6 py-6 flex justify-center items-center w-full">
            <h2 className="ml-0 text-3xl lg:text-2xl xl:text-3xl 2xl:text-5xl leading-none md:leading-tight ClashDisplayBold text-[#0a548d]">Les packs</h2>
          </div>
        </div>
            {/* <HomeSection >
                <CommandeGrid
                    calendrierImg="/images/calendrier.png"
                    guideImg="/images/guide.png"       // remplace par ton image
                    jeuImg="/images/jeu.png"
                    onAddProduct={handleAdd}
                /></HomeSection> */}

            <HomeSection >
                <OffresSpeciales />
            </HomeSection>

            <div className="mb-32"></div>

        </>

    );
}


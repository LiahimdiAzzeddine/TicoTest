
import CalendrierPage from "../components/CalendrierPage";
import CommandeGrid from "../components/CommandeGrid";
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
            <HomeSection id="jeu">
                <JeuPage />
            </HomeSection>
            <HomeSection >
                <CommandeGrid
                    calendrierImg="/images/calendrier.png"
                    guideImg="/images/guide.png"       // remplace par ton image
                    jeuImg="/images/jeu.png"
                    onAddProduct={handleAdd}
                /></HomeSection>
            <HomeSection >
                <OffresSpeciales />
            </HomeSection>

            <div className="mb-32"></div>

        </>

    );
}


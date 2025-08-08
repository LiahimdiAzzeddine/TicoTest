
import AtelierPage from "../components/AtelierPage";
import BoxPage from "../components/BoxPage";
import CalendrierPage from "../components/CalendrierPage";
import Guidepage from "../components/Guidepage";
import JeuPage from "../components/JeuPage";
import HomeSection from "../Templates/HomeSection";
import StartSection from "../Templates/StartSection";


export default function Calendrier() {
    return (
        <>
            <StartSection id="calendrier">
                <CalendrierPage />
            </StartSection>
            <HomeSection id="guide">
                <Guidepage />
            </HomeSection>
            <HomeSection id="jeu">
                <JeuPage />
            </HomeSection>
            <HomeSection  id="box">
                <BoxPage />
            </HomeSection>
            <HomeSection id="atelier">
                <AtelierPage />
            </HomeSection>
        </>

    );
}

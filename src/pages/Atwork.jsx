
import DetectiveBox from "../components/DetectiveBox";
import Teambuilding from "../components/Teambuilding";
import TiQuiz from "../components/TiQuiz";
import Visio from "../components/Visio";
import HomeSection from "../Templates/HomeSection";
import StartSection from "../Templates/StartSection";


export default function Atwork() {

    return (
        <>
        <StartSection id="jeu">
                <DetectiveBox />
            </StartSection>
            <HomeSection pb={'md:pb-32 pb-16'} id="calendrier">
                <TiQuiz />
            </HomeSection>
            <HomeSection id="guide">
                <Visio />
            </HomeSection>
           <HomeSection id="guide">
                <Teambuilding />
            </HomeSection>

            <div className="mb-32"></div>

        </>

    );
}


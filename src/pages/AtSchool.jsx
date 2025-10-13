
import { useNavigate } from "react-router-dom";
import BoxPage from "../components/BoxPage";
import DeuxBlocsActions from "../components/DeuxBlocsActions";
import OrganismesGrid from "../components/OrganismesGrid";
import HomeSection from "../Templates/HomeSection";
import StartSection from "../Templates/StartSection";


export default function AtSchool() {
    const navigate = useNavigate();

    return (
        <>
            <StartSection pb={'md:pb-32 pb-16'} id="box">
                <BoxPage />
            </StartSection>

            <HomeSection>
                 <div className="flex flex-col gap-14 w-full max-w-6xl">
                    <DeuxBlocsActions onFundClick={() => navigate('/organizations')} onOrgClick={() => navigate('/inscription')} />
                </div>
            </HomeSection>


            <div className="mb-32"></div>

        </>

    );
}

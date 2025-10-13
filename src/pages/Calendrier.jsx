
import AtelierPage from "../components/AtelierPage";
import BoxPage from "../components/BoxPage";
import CalendrierPage from "../components/CalendrierPage";
import CommandeGrid from "../components/CommandeGrid";
import Guidepage from "../components/Guidepage";
import JeuPage from "../components/JeuPage";
import OffresSpeciales from "../components/OffresSpeciales";
import OrganismesGrid from "../components/OrganismesGrid";
import RecapCommande from "../components/RecapCommande";
import HomeSection from "../Templates/HomeSection";
import StartSection from "../Templates/StartSection";


export default function Calendrier() {
      const handleAdd = (title, qty) => {
    // intègre ton panier ici
    console.log("Ajout:", title, qty);
  };
    return (
        <>
            <StartSection  pb={'md:pb-32 pb-16'} id="calendrier">
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
    <OffresSpeciales/>
    </HomeSection>
            <HomeSection  id="box">
                <BoxPage />
            </HomeSection>
            <HomeSection>
            <OrganismesGrid/></HomeSection>
<HomeSection>
            <RecapCommande
  orgName="École du Puit"
  qty={4}
  onQtyChange={()=>{}}
  unitPrice={4}
  onPay={(payload)=>console.log(payload)}
  boxImg="/images/box-tico.png"
/></HomeSection>
            <HomeSection id="atelier">
                <AtelierPage />
            </HomeSection>
                 <div className="mb-32"></div>

        </>

    );
}

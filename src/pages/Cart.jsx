
import RecapCommande from "../components/RecapCommande";
import StartSection from "../Templates/StartSection";


export default function Cart() {

    return (
        <>

            <StartSection pb={'md:pb-32 pb-16'}>
                <RecapCommande
                    orgName="École du Puit"
                    qty={4}
                    onQtyChange={() => { }}
                    unitPrice={4}
                    onPay={(payload) => console.log(payload)}
                    boxImg="/images/box-tico.png"
                /></StartSection>

            <div className="mb-32"></div>

        </>

    );
}

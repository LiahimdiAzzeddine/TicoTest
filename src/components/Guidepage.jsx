import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";
import { useState } from "react";
import SommairePopup from "./ui/SommairePopup";
import { ProductCard } from "./ui/ProductCard";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";
import { BoxTPopup, ContentGuide } from "./ui/BoxPopup";

export default function Guidepage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addMaison } = useCart();

    const products = [
        {
            id: 0,
            idname: "guide-pdf",
            name: "La vérité si J’mange",
            subname: "Le guide PDF",
            price: 14.99,
            image: "/images/guide_PDF-removebg-preview.png",
             poids:0,
        },
        {
            id: 1,
            idname: "guide-imprime",
            name: "La vérité si J’mange",
            subname: "Guide imprimé",
            price: 20.99,
            image: "/images/guide_imprimé-removebg-preview.png",
            frais: 0,
             poids:200,
        },

    ];

    const increaseQuantity = () => setQuantity(q => q + 1);
    const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
    const setSelected = (value) => {
        setSelectedProduct(value)
        setQuantity(1);
    }

    const showNotification = (message) => {
        toast.success(message, {
            duration: 3000,
            position: 'top-right',
            style: {
                background: '#0a548d',
                color: '#fff',
                fontWeight: '600',
                padding: '16px',
                borderRadius: '10px',
            },
            iconTheme: {
                primary: '#FFECA7',
                secondary: '#0a548d',
            },
        });
    };
    const HandelCommand = () => {
        if (selectedProduct === null || selectedProduct === undefined) return;

        const product = products[selectedProduct];
        if (!product) return;

        addMaison(product.idname, product.name, product.price, product.image, quantity, 0,null,product.subname,product.poids);
        showNotification(`${quantity}x ${product.subname} ajouté au panier\u00A0\u00A0!`);
        setQuantity(1);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-y-8 md:gap-x-12 w-full max-w-6xl" >

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 flex-[3]">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-12">

                        {/* Titre */}
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">« La Vérité si J’mange » , apprendre à&nbsp;</span>
                            <span className="text-[#ff8300] font-bold">déjouer les pièges&nbsp;​​</span>
                            <span className="text-[#0a548d]">sur les produits alimentaires​</span>
                        </StepTitle>

                        {/* ✅ Image au milieu pour mobile */}
                        <div className="md:hidden w-full flex justify-center">
                            <img
                                src="/images/guide.png"
                                alt="Suivi des demandes"
                                className="w-full md:w-80 lg:w-[23rem] 2xl:w-[26rem]"
                            />
                        </div>

                        {/* Paragraphes */}
                        <div className="text-lg leading-relaxed ArchivoLight space-y-4 text-start">
                            <p>
                                Que vous soyez débutant ou averti, ce guide vous permettra rapidement de devenir un As en lecture d’étiquettes.
                                Grâce à un bon marketing, on peut nous vendre n’importe quoi. Choisir dans les rayons peut vite devenir un calvaire.<br></br>
                                ce guide, vous avez les clés pour choisir mieux sans vous prendre la tête. <span
                                        onClick={() => setIsPopupOpen(true)}
                                        className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline"
                                    >
                                        Voir le contenu
                                    </span>
                            </p>

                        </div>


                    </div>
                    {/* Section produits */}
                    <div className="flex flex-col gap-4 mt-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelected}
                                quantity={quantity}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                            />
                        ))}
                        {/* Bouton Commander */}
                        <button
                            className="w-3/4 bg-[#FFECA7] text-[#0a548d] font-bold text-lg py-4 rounded-2xl hover:bg-[#fde99b] transition-colors flex items-center justify-center gap-2 mt-4 mx-auto  shadow-md"
                            onClick={HandelCommand}
                        >
                            <img src="images/caddie orange.png" className="w-9" />
                            Commander - {(products[selectedProduct]?.price * quantity).toFixed(2)}€
                        </button>

                    </div>

                </div>

                {/* ✅ Image à droite pour desktop */}
                <div className="hidden md:flex justify-center w-full md:w-auto mt-8 md:mt-0 flex-[2]">
                    <img
                        src="/images/guide.png"
                        alt="Suivi des demandes"
                        className="w-96 md:w-full m-auto"
                    />
                </div>

            </div>
              <BoxTPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
  <ContentGuide />
</BoxTPopup>
        </>
    );
}

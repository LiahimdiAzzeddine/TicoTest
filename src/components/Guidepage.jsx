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
    const { addMaison, cart } = useCart();

    const products = [
        {
            id: 0,
            idname: "guide-pdf",
            name: "La vérité si J’mange",
            description: "Le guide PDF",
            price: 11.99,
            image: "/images/guide_PDF-removebg-preview.png",
            poids: 0,
        },
        {
            id: 1,
            idname: "guide-imprime",
            name: "La vérité si J’mange",
            description: "Guide imprimé",
            price: 15.99,
            image: "/images/guide_imprimé-removebg-preview.png",
            frais: 0,
            poids: 200,
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

        // ⚠️ Vérifie si le guide PDF est déjà dans le panier
        const alreadyInCart = cart.maison.some(
            (item) => item.id === "guide-pdf" && product.idname === "guide-pdf"
        );

        if (alreadyInCart) {
            toast.error("Le guide PDF est déjà dans votre panier.", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#B00020",
                    color: "#fff",
                    fontWeight: "600",
                    padding: "16px",
                    borderRadius: "10px",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#B00020",
                },
            });
            return;
        }

        // ✅ Si pas encore dans le panier, on ajoute normalement
        addMaison(
            product.idname,
            product.name,
            product.price,
            product.image,
            quantity,
            0,
            null,
            product.description,
            product.poids
        );

        showNotification(
            `${quantity}x ${product.description} ajouté au panier\u00A0\u00A0!`
        );

        setQuantity(1);
    };


    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-y-8 md:gap-x-12 w-full max-w-6xl" >

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 flex-[3]">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-8">

                        {/* Titre */}
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">« La Vérité si J’mange » , apprendre à&nbsp;</span>
                            <span className="text-[#ff8200] font-bold">déjouer les pièges&nbsp;​​</span>
                            <span className="text-[#0a548d]">sur les produits alimentaires​</span>
                        </StepTitle>

                        {/* ✅ Image au milieu pour mobile */}
                        <div className="md:hidden w-full flex flex-col justify-center gap-8">
                            <img
                                src="/images/guide.png"
                                alt="Suivi des demandes"
                                className="w-72 m-auto"
                            />
                            <div className="ClashDisplayBold text-[#0a548d] text-2xl lg:text-2xl  text-center">
                                Dont         <span className=" font-black text-[#ff8200] mb-2 ClashDisplayBold">
                                    4€ financent</span> un
                                kit pédagogique
                                pour une école
                            </div>

                        </div>

                        {/* Paragraphes */}
                        <div className="text-lg leading-relaxed ArchivoLight space-y-4 text-start">
                            <p>
                                Que vous soyez débutant ou averti, ce guide vous permettra rapidement de devenir un As en lecture d’étiquettes.
                                Grâce à un bon marketing, on peut nous vendre n’importe quoi. Choisir dans les rayons peut vite devenir un calvaire.<br></br>
                                Avec ce guide, vous avez les clés pour mieux choisir sans vous prendre la tête.<br/> <span
                                    onClick={() => setIsPopupOpen(true)}
                                    className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline"
                                >
                                 Voir&nbsp;ce&nbsp;qu’il&nbsp;contient.
                                </span>
                            </p>

                        </div>


                    </div>
                    {/* Section produits */}
                    <div className="flex flex-col gap-4 mt-4">
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
                <div className="hidden md:flex flex-col justify-center w-full md:w-auto mt-8 md:mt-0 flex-[2] gap-16">
                    <img
                        src="/images/guide.png"
                        alt="Suivi des demandes"
                        className="w-96 m-auto"
                    />
                    <div className="ClashDisplayBold text-[#0a548d] text-2xl lg:text-2xl xl:text-3xl text-center">
                        Dont         <span className=" font-black text-[#ff8200] mb-2 ClashDisplayBold">
                            4€ financent</span> un
                        kit pédagogique
                        pour une école
                    </div>
                </div>

            </div>
            <BoxTPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <ContentGuide />
            </BoxTPopup>
        </>
    );
}

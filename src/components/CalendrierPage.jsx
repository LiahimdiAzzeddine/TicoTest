import { Link } from "react-router-dom";
import StepTitle from "./ui/StepTitle";
import { ProductCard } from "./ui/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { BoxTPopup, ContentCalendrier, ContentSection2 } from "./ui/BoxPopup";

export default function CalendrierPage() {
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addMaison, cart } = useCart();
    const products = [
        {
            id: 0,
            idname: "calendrier-pdf",
            name: "La vérité si J’mange",
            price: 9.99,
            image: "/images/calendrier_PDF-removebg-preview.png",
            description: "Le calendrier PDF",
            poids: 0,
        },
        {
            id: 1,
            idname: "calendrier-imprime",
            name: "La vérité si J’mange",
            price: 12.99,
            image: "/images/Calendrier_imprimé-removebg-preview.png",
            frais: 0,
            description: "Calendrier imprimé",
            poids: 200,
        },
    ];
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const increaseQuantity = () => setQuantity((q) => q + 1);
    const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
    const setSelected = (value) => {
        setSelectedProduct(value);
        setQuantity(1);
    };

    const showNotification = (message) => {
        toast.success(message, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "#0a548d",
                color: "#fff",
                fontWeight: "600",
                padding: "16px",
                borderRadius: "10px",
            },
            iconTheme: {
                primary: "#FFECA7",
                secondary: "#0a548d",
            },
        });
    };
    const HandelCommand = () => {
        if (selectedProduct === null || selectedProduct === undefined) return;

        const product = products[selectedProduct];
        if (!product) return;

        // Vérifie si le produit PDF est déjà dans le panier
        const alreadyInCart = cart.maison.some(
            (item) =>
                item.id === "calendrier-pdf" &&
                product.idname === "calendrier-pdf"
        );

        if (alreadyInCart) {
            toast.error("Le calendrier PDF est déjà dans votre panier.", {
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
            `${quantity}x ${product.name} ajouté au panier\u00A0\u00A0!`
        );
        setQuantity(1);
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl">
                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                    <div>
                        Découvrez le Ti’Calendrier et le guide “La vérité si
                        J’mange“ pour mieux choisir sans vous prendre la tête <br/>et
                        financer l’envoi de Kits pédagogiques dans les écoles&nbsp;!
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-12 w-full max-w-6xl h-full">
                {/* Illustration affichée uniquement sur desktop */}
                <div className="hidden md:flex flex-col justify-around items-center w-full flex-[2] gap-y-16">
                    <img
                        src="/images/calendrier.png"
                        alt="Suivi des demandes"
                        className="w-96 md:w-full"
                    />
                    <div className="ClashDisplayBold text-[#0a548d] text-2xl lg:text-2xl xl:text-3xl text-center">
                        Dont{" "}
                        <span className=" font-black text-[#ff8200] mb-2 ClashDisplayBold">
                            2€ financent
                        </span>{" "}
                        un kit pédagogique pour une école
                    </div>
                </div>

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] md:flex-[3] text-center md:text-left flex flex-col gap-8 md:gap-8 w-full ">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-8">
                        <StepTitle center={false}>
                            {/* Version desktop */}
                            <span className="hidden md:inline text-[#0a548d]">
                                Calendrier perpétuel de fruits <br /> et
                                légumes&nbsp;
                            </span>
                            <span className="hidden md:inline text-[#ff8200] font-bold">
                                de saison
                            </span>

                            {/* Version mobile */}
                            <span className="inline md:hidden text-[#0a548d]">
                               Calendrier perpétuel de fruits et
                                légumes&nbsp;
                            </span>
                            <span className="inline md:hidden text-[#ff8200] font-bold">
                             de saison
                            </span>
                        </StepTitle>

                        {/* Illustration affichée uniquement sur mobile (entre titre et description) */}
                        <div className="flex flex-col justify-center w-full md:hidden gap-8">
                            <img
                                src="/images/calendrier.png"
                                alt="Suivi des demandes"
                                className="w-96 sm:w-60"
                            />
                            <div className="ClashDisplayBold text-[#0a548d] text-2xl lg:text-2xl  text-center">
                                Dont{" "}
                                <span className=" font-black text-[#ff8200] mb-2 ClashDisplayBold">
                                    2€ financent
                                </span>{" "}
                                un kit pédagogique pour une école
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                Réutilisable d’année en année, c’est un
                                pense-bête idéal pour faciliter la consommation
                                de fruits et légumes de saison.
                            </p>

                            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                Il contient des d’idées recettes, des astuces et
                                des informations qu’il est bon de garder à
                                l’œil, comme un comparatif des huiles de cuisine
                                par&nbsp;exemple.<br/>
                                <span
                                    onClick={() => setIsPopupOpen(true)}
                                    className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline"
                                >
                                Voir&nbsp;ce&nbsp;qu’il&nbsp;contient.
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Section produits */}
                    <div className="flex flex-col gap-4 mt-2">
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
                            <img
                                src="images/caddie orange.png"
                                className="w-9"
                            />
                            Commander -{" "}
                            {(
                                products[selectedProduct]?.price * quantity
                            ).toFixed(2)}
                            €
                        </button>
                    </div>
                </div>
                <BoxTPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                >
                    <ContentCalendrier />
                </BoxTPopup>
            </div>
        </div>
    );
}

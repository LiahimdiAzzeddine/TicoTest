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
    const { addMaison } = useCart();
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
            price: 15.99,
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
            `${quantity}x ${product.subname} ajouté au panier\u00A0\u00A0!`
        );
        setQuantity(1);
    };
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-10 w-full max-w-6xl">
                <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
                    <div>
                        <span className="text-[#ff8300]">
                            Changer l’alimentation
                        </span>
                        , ça commence par l’information. Pendant que la
                        transparence se construit on s’est dit que vous aimeriez
                        surement avoir des outils{" "}
                        <span className="text-[#ff8300]">
                            pour faire le tri dès maintenant
                        </span>{" "}
                        sur les produits alimentaires.
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-8 md:gap-x-12 w-full max-w-6xl">
                {/* Illustration affichée uniquement sur desktop */}
                <div className="hidden md:flex justify-center flex-[2]">
                    <img
                        src="/images/calendrier.png"
                        alt="Suivi des demandes"
                        className="w-96 md:w-full m-auto"
                    />
                </div>

                {/* Texte étape 4 */}
                <div className="text-[#0a548d] md:flex-[3] text-center md:text-left flex flex-col gap-8 md:gap-14 w-full ">
                    <div className="flex flex-col justify-start items-start gap-8 md:gap-12">
                        <StepTitle center={false}>
                            <span className="text-[#0a548d]">
                                Calendrier perpétuel de fruits <br></br>et
                                légumes&nbsp;
                            </span>
                            <span className="text-[#ff8300] font-bold">
                                de saison
                            </span>
                        </StepTitle>

                        {/* Illustration affichée uniquement sur mobile (entre titre et description) */}
                        <div className="flex justify-center w-full md:hidden">
                            <img
                                src="/images/calendrier.png"
                                alt="Suivi des demandes"
                                className="w-96 sm:w-60"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                Il est beau et surtout réutilisable d’année en
                                année !<br></br>
                                C’est un pense-bête idéal pour faciliter la
                                consommation de fruits et légumes de saison.
                            </p>

                            <p className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start">
                                En plus d’idées recettes, il contient des
                                astuces et informations qu’il est bon de garder
                                à l’œil, comme un comparatif des huiles de
                                cuisine par exemple.{" "}
                                <span
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

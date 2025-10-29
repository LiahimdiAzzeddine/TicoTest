import { useState, useRef } from "react";
import StepTitle from "./ui/StepTitle";
import { BoxTPopup, ContentDetectiveBox } from "./ui/BoxPopup";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

export default function Kit() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeAudio, setActiveAudio] = useState(null);
    const audioRef = useRef(0);
    const [selectedProduct, setSelectedProduct] = useState(0);

    const [quantity, setQuantity] = useState(1);
    const { addMaison } = useCart();
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

    const audioSamples = [
        { src: "/audio/Extrait 1.mp3", label: "Extrait 1" },
        { src: "/audio/Extrait 2.mp3", label: "Extrait 2" },
    ];

    const products = [
        {
            id: 0,
            idname: "detective_kit",
            name: "Pour 1 détective",
            price: 59.99,
            image: "/images/1_detective-removebg-preview.png",
        },

    ];

    const increaseQuantity = () => setQuantity((q) => q + 1);
    const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const playAudio = (src) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        if (activeAudio === src) {
            setActiveAudio(null);
            audioRef.current = null;
            return;
        }

        const audio = new Audio(src);
        audioRef.current = audio;
        setActiveAudio(src);
        audio.play();

        audio.onended = () => {
            setActiveAudio(null);
            audioRef.current = null;
        };
    };

    const HandelCommand = () => {
        if (selectedProduct === null || selectedProduct === undefined) return;

        const product = products[selectedProduct];
        if (!product) return;

        addMaison(
            product.idname,
            "Box " + product.name,
            product.price,
            product.image,
            quantity,
            0
        );
        showNotification(`${quantity}x ${product.name} ajouté au panier`);
        setQuantity(1);
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Layout principal avec 2 colonnes sur desktop */}
            <div className="flex flex-col lg:flex-row gap-2 md:gap-8 lg:gap-12 items-start">
                {/* COLONNE GAUCHE - Image Box + Pré-ventes */}
                <div className="w-full lg:w-auto flex flex-col items-center gap-8 md:gap-0 flex-[3]">
                    {/* Image de la box */}
                    <div className="flex justify-center">
                        <img
                            src="/images/Boxmaison.png"
                            alt="Box Ti'Conso"
                            className="w-full md:w-80 lg:w-[23rem] 2xl:w-[26rem]"
                        />
                    </div>
                </div>

                {/* COLONNE DROITE - Contenu principal */}
                <div className="flex-[3] w-full">
                    <div className="flex flex-col gap-6">
                        {/* Titre */}
                        <div className="flex flex-col gap-2">
                            <div className="text-[#0a548d] text-2xl font-bold">
                                Commander le kit - 4 activités
                            </div>
                            <div className="text-[#0a548d] text-2xl">
                                Durée : environ 5h
                            </div>
                        </div>

                        {/* Bouton Commander */}
                        <button className="w-3/4 bg-[#FFECA7] text-[#0a548d] font-bold text-lg py-4 rounded-2xl hover:bg-[#fde99b] transition-colors flex items-center justify-center gap-2 mt-4 mx-auto  shadow-md">
                            <img
                                src="images/caddie orange.png"
                                className="w-9"
                            />
                            Commander - 300€HT
                        </button>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-[#0a548d] leading-relaxed">
                            Ce kit est conçu pour une seule structure
                            utilisatrice (école, association, entreprise...).
                            Chaque exemplaire est personnalisé afin de préserver
                            la qualité pédagogique et la valeur du travail
                            réalisé. Le partage et la reproduction des documents
                            est interdit sans accord préalable — cela nous aide
                            à continuer de créer des outils de sensibilisation
                            accessibles à tous&nbsp;!&nbsp;&nbsp;
                            <span
                                onClick={() => setIsPopupOpen(true)}
                                className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline"
                            >
                                Voir le contenu
                            </span>
                        </p>

                        {/* Audio extraits */}
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-lg text-[#ff8300]  text-center">
                                Écoutez comme les enfants se prennent au jeu !
                            </p>

                            <div className="flex flex-row flex-wrap justify-center gap-10 sm:gap-16">
                                {audioSamples.map((sample, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => playAudio(sample.src)}
                                        className="flex flex-col justify-center items-center cursor-pointer focus:outline-none transition-transform"
                                    >
                                        <img
                                            src={
                                                activeAudio === sample.src
                                                    ? "/images/son actif.svg"
                                                    : "/images/son inactif.svg"
                                            }
                                            alt="écouter"
                                            className="w-16 h-16"
                                        />
                                        <span
                                            className={`font-bold underline underline-offset-2 ${
                                                activeAudio === sample.src
                                                    ? "text-[#0a548d]"
                                                    : "text-[#ff8300]"
                                            }`}
                                        >
                                            {sample.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BoxTPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            >
                <ContentDetectiveBox />
            </BoxTPopup>
        </div>
    );
}

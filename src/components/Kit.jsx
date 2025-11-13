import { useState, useRef } from "react";
import StepTitle from "./ui/StepTitle";
import { BoxTPopup, ContentDetectiveBox } from "./ui/BoxPopup";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";
import AddOrganisationPopup from "./AddOrganisationPopup";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Kit() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isOrgPopupOpen, setIsOrgPopupOpen] = useState(false);
    const [activeAudio, setActiveAudio] = useState(null);
    const audioRef = useRef(0);
    const [selectedProduct, setSelectedProduct] = useState(0);

    const { addEcole, cart } = useCart();
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
            idname: "detective_kit_4",
            name: "Kit pédagogique TiCO",
            price: 250,
            image: "/images/Boxmaison.png",
        },

    ];


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



const handleOrganisationCreated = (orgId) => {
  if (selectedProduct === null || selectedProduct === undefined) return;

  const product = products[selectedProduct];
  if (!product) return;


  addEcole(
    orgId,
    product.name,
    product.idname,
    product.price,
    product.image,
''
  );

  // Notification locale classique
  showNotification(`${product.name} ajouté au panier`);

  // Puis affichage du dialog de choix
  confirmAlert({
    title: 'Produit ajouté au panier 🛒',
    message: `Souhaitez-vous passer au paiement ou continuer votre découverte ?`,
    buttons: [
      {
        label: 'Passer commande',
        onClick: () => {
          // Par exemple : rediriger vers la page de paiement
          window.location.href = '/checkoutEcole';
        },
      },
      {
        label: 'Continuer la découverte',
        onClick: () => {
          // Rien, l’utilisateur reste sur la page
        },
      },
    ],
  });
};


    const HandelCommand = (orgId = undefined) => {
        if (selectedProduct === null || selectedProduct === undefined) return;

        const product = products[selectedProduct];
        if (!product) return;

        const alreadyExists = cart.ecole?.some((item) => item.productId === 'detective_kit_4');
        if (alreadyExists) {
            toast.error("Ce kit a déjà été commandé, complétez les informations d'organisation avant de continuer.", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#ff4d4d",
                    color: "#fff",
                    fontWeight: "600",
                    padding: "16px",
                    borderRadius: "10px",
                },
            });
            return;
        }

        if (!orgId) {
            setIsOrgPopupOpen(true);
            return;
        }

        addEcole(
            orgId,
            product.name,
            product.idname,
            product.price,
            product.image,
            ''
        );

        showNotification(`${product.name} ajouté au panier`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-2 md:gap-8 lg:gap-12 items-start">
                <div className="w-full lg:w-auto flex flex-col items-center gap-8 md:gap-0 flex-[3]">
                    <div className="flex justify-center">
                        <img
                            src="/images/Boxmaison.png"
                            alt="Box Ti'Conso"
                            className="w-full md:w-80 lg:w-[23rem] 2xl:w-[26rem]"
                        />
                    </div>
                </div>

                <div className="flex-[3] w-full">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-[#0a548d] text-2xl  ">
                                Commander <span className="font-bold ArchivoBold">le kit pédagogique</span>
                            </div>
                            <div className="text-[#0a548d] text-2xl">
                                Durée : <span className="font-bold ArchivoBold">environ 5h</span>
                            </div>
                        </div>

                        <button
                            onClick={() => HandelCommand(undefined)}
                            className="w-3/4 bg-[#FFECA7] text-[#0a548d] font-bold text-lg py-4 rounded-2xl hover:bg-[#fde99b] transition-colors flex items-center justify-center gap-2 mt-4 mx-auto shadow-md"
                        >
                            <img src="images/caddie orange.png" className="w-9" alt="Panier" />
                            Commander - 250€ TTC
                        </button>

                        <p className="text-base sm:text-lg text-[#0a548d] leading-relaxed">
                            Ce kit est conçu pour une seule structure
                            utilisatrice (école, association, entreprise...).
                            Chaque exemplaire est identifié par watermark afin de préserver la valeur du travail réalisé. Le partage et la reproduction des documents
                            est interdit sans accord préalable cela nous aide
                            à continuer de créer des outils de sensibilisation
                            pour tous&nbsp;!&nbsp;&nbsp;
                            <span
                                onClick={() => setIsPopupOpen(true)}
                                className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline cursor-pointer"
                            >
                                Voir le contenu
                            </span>
                        </p>

                        <div className="flex flex-col items-center gap-4">
                            <p className="text-lg text-[#ff8200]  text-center">
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
                                                    : "/images/son inactif.png"
                                            }
                                            alt="écouter"
                                            className="w-16 h-16"
                                        />
                                        <span
                                            className={`font-bold underline underline-offset-2 ${activeAudio === sample.src
                                                    ? "text-[#0a548d]"
                                                    : "text-[#ff8200]"
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

            <AddOrganisationPopup
                isOpen={isOrgPopupOpen}
                onClose={() => setIsOrgPopupOpen(false)}
                onSuccess={handleOrganisationCreated}
                isForBuy={true}
            />
        </div>
    );
}

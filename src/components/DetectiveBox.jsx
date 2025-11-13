import { useState, useRef } from "react";
import StepTitle from "./ui/StepTitle";
import StatComponent from "./ui/StatComponent";
import BoxPopup, { BoxTPopup, ContentDetectiveBox } from "./ui/BoxPopup";
import { PreSalesSection } from "./ui/PreSalesSection";
import { ProductCard } from "./ui/ProductCard";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

export default function DetectiveBox() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRef = useRef(0);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const setSelected = (value) => {
    setSelectedProduct(value)
    setQuantity(20);
  }
  const [quantity, setQuantity] = useState(20);
  const { addMaison } = useCart();
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

  const audioSamples = [
    { src: "/audio/Extrait 1.mp3", label: "Extrait 1" },
    { src: "/audio/Extrait 2.mp3", label: "Extrait 2" },
  ];

  const products = [
    { id: 0, idname: "detective_1", name: "Pour 1 détective", price: 59.99, image: "/images/1_detective-removebg-preview.png", poids: 950,minQt:20 },
    { id: 1, idname: "detective_2", name: "Pour 2 détectives", price: 67.99, image: "/images/2_detectives-removebg-preview.png", poids: 950,minQt:20 },
    { id: 2, idname: "detective_3", name: "Pour 3 détectives", price: 75.99, image: "/images/3_detectives-removebg-preview.png", poids: 950,minQt:20 },
  ];

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 20 ? q - 1 : 20));

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

    addMaison(product.idname, "Box " + product.name, product.price, product.image, quantity, 0, null, '', product.poids,product.minQt);
    showNotification(`${quantity}x ${product.name} ajouté au panier`);
    setQuantity(20);
  };


  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12 ">
      <div className="text-[#0a548d] text-center ArchivoBold flex flex-col gap-4">
        Saviez-vous qu’une meilleure alimentation peut augmenter la concentration et réduire le stress au travail ?
        Pour adopter de bonnes pratiques nous accompagnons vos équipes avec des jeux à faire avec leurs enfants, des ateliers et
        conférences ludiques et immersives
      </div>
      {/* Layout principal avec 2 colonnes sur desktop */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* COLONNE GAUCHE - Image Box + Pré-ventes */}
        <div className="w-full lg:w-auto flex flex-col items-center gap-0 md:gap-0">
          {/* Image de la box */}
          <div className="flex justify-center">
            <img
              src="/images/Boxmaison.png"
              alt="Box Ti'Conso"
              className="w-full md:w-80 lg:w-[23rem] 2xl:w-[26rem]"
            />
          </div>

          {/* Section Pré-ventes avec flèche */}
          <PreSalesSection />
        </div>

        {/* COLONNE DROITE - Contenu principal */}
        <div className="flex-1 w-full">
          <div className="flex flex-col gap-6">
            {/* Titre */}
            <StepTitle center={false}>
              <span className="text-[#0a548d]">
                La box de détective gourmand pour&nbsp;
              </span>
              <span className="text-[#ff8200] font-bold">
                sensibiliser les 8-12 ans
              </span>
            </StepTitle>

            {/* Stats */}
            <StatComponent />

            {/* Description */}
            <p className="text-base sm:text-lg text-[#0a548d] leading-relaxed">
              Offrez à vos collaborateurs une aventure gourmande et éducative à vivre avec leurs
              enfants. Des jeux d’enquête pour apprendre à faire le tri dans les produits en
              magasin; découvrir les secrets des ingrédients, déjouer les pièges du marketing et
              devenir des détectives du vrai goût en famille !  <span
                onClick={() => setIsPopupOpen(true)}
                className="text-lg text-[#0a548d] ArchivoLight leading-tight text-start underline"
              >
                Voir le contenu
              </span>
            </p>

            {/* Audio extraits */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-[#ff8200] font-bold text-center">
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
                  minQuantity={20}
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
        </div>
      </div>

      <BoxTPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <ContentDetectiveBox />
      </BoxTPopup>
    </div>
  );
}

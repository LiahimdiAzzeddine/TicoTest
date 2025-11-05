import { useState } from "react";
import Title from "./Title";
import { Minus, Plus } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export default function ContributionPopupContent({ isOpen, setIsOpen, organization }) {
    const { addEcole, cart } = useCart();
    const [amount, setAmount] = useState(10);
    const [selectedProduct] = useState(0);

    const products = [
        {
            id: 0,
            idname: "detective_kit_5",
            name: "kit - 5 activités 'Contribution'",
            price: 250,
            image: "/images/Boxmaison.png",
        },

    ];

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

  if (!organization) return null;

  const target = 250;
  const current = Number(organization.total_collected) ?? 0;
  const progress = (current / target) * 100;

  const handleIncrement = () => setAmount((prev) => prev + 1);
  const handleDecrement = () => setAmount((prev) => Math.max(1, prev - 1));

    const handleContribution = () => {
        if (selectedProduct === null || selectedProduct === undefined) return;

        const product = products[selectedProduct];
        if (!product) return;

        const alreadyExists = cart.ecole?.some((item) => item.orgId === organization.id);
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

        addEcole(
            organization.id,
            product.name,
            product.idname,
            amount,
            product.image
        );

        showNotification(`${product.name} ajouté au panier`);
        setIsOpen(false);
    };


  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-4 md:p-6">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl p-5 sm:p-6 md:p-10 border-1 border-gray-200">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-5 p-1 sm:p-2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center"
          >
           <img src="images/fermeture_popup.png" alt="Fermer" className="w-full h-full object-contain"/>
          </button>

          {/* Main Title */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <Title size="sm">
              <span className="text-[#ff8300]">Contribuez</span>
              <span className="text-[#0a548d]"> à l'achat participatif pour :</span>
            </Title>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch">
            {/* Left: Book Image */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="rounded-xl p-3 sm:p-4 w-full max-w-[200px] sm:max-w-xs md:w-56 mx-auto md:mx-0">
                <div className="rounded-lg p-1 mb-1">
                    <img src="images/Boxmaison.png" alt="Box maison" className="w-full h-auto"/>
                </div>
                <div className="text-[10px] sm:text-xs text-[#0a548d] text-start font-semibold space-y-0.5 sm:space-y-1">
                  <div>• 5 activités inédites</div>
                  <div>• Durée : 5h</div>
                  <div>• 2 dégustations</div>
                  <div>• Utilisable d'année en année</div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-grow flex flex-col w-full min-w-0">
              {/* Organization Name */}
              <h3 className="text-[#ff8300] font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 ClashDisplayBold truncate">
                {organization.orgName}
              </h3>

              {/* Price and Progress */}
              <p className="text-[#0a548d] font-bold text-base sm:text-lg md:text-xl mb-2 Arcivo">
                {current}€ / {target}€ TTC
              </p>

              {/* Progress Bar */}
              <div className="flex flex-row items-center mb-4 sm:mb-5">
                <div className="relative w-full bg-[#c8f0db] rounded-full h-3 sm:h-4 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#4f976d] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
               
                <div className="pl-2 text-[10px] sm:text-xs font-bold text-[#4f976d] flex-shrink-0">
                  <span className="bg-[#c8f0db] rounded-lg p-1 whitespace-nowrap">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Add Amount Section */}
              <div className="mb-4 sm:mb-6">
                <p className="text-[#0a548d] text-sm sm:text-base mb-2 sm:mb-4 Archivo font-bold">
                  Ajouter :
                </p>
         <div className="flex items-center justify-center gap-2 sm:gap-3">
  <button
    onClick={handleDecrement}
    className="bg-[#0a548d] text-white rounded w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#073d66] transition-colors font-bold text-lg flex-shrink-0"
    type="button"
  >
    <Minus size={16}/>
  </button>
<div className="flex items-center gap-1">
  <input
    type="number"
    value={amount}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (!isNaN(value) && value > 0) {
        setAmount(value);
      } else if (e.target.value === "") {
        setAmount(""); // autorise la saisie vide temporairement
      }
    }}
    onBlur={() => {
      if (!amount || amount <= 0) setAmount(1); // valeur par défaut si vide ou <= 0
    }}
    className="border-2 border-[#0a548d] rounded px-1 text-center font-bold text-[#0a548d] bg-white w-20 sm:w-24 text-sm sm:text-base"
  />
<span className="text-[#0a548d] font-bold">€</span></div>
  <button
    onClick={handleIncrement}
    className="bg-[#0a548d] text-white rounded w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#073d66] transition-colors font-bold text-lg flex-shrink-0"
    type="button"
  >
    <Plus size={16}/>
  </button>
</div>

              </div>

              {/* Contribute Button */}
              <button
                className="w-full ArchivoBold bg-[#FFECA7] text-[#0a548d] font-bold text-sm sm:text-base md:text-lg py-2.5 sm:py-3 rounded-2xl flex items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 hover:bg-[#fde99b] transition-all shadow-md mt-auto"
                type="button"
                onClick={handleContribution}
              >
                <img className="w-6 sm:w-7 md:w-9 flex-shrink-0" src="images/caddie orange.png" alt="Panier"/>
                <span className="whitespace-nowrap">Contribuer - {amount}€</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
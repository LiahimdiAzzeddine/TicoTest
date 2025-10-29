import React, { useMemo, useState } from "react";
import { Info, Minus, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { AddButton } from "./TesComposants";
import BoxPopup from "./ui/BoxPopup";
import toast from 'react-hot-toast';

const currencyNoCents = (v) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(v);

export default function SelectableDonationBox({
  orgName = "Nom de l'organisme",
  orgId="0",
  wishLabel = "X box Ti'Conso",
  collectedEuro = 0,
  targetEuro = 120,
  unitEuro = 4,
  initialChildrenCount = 1,
  boxImageSrc = "/images/box.png",
  selected: forcedSelected,
  onSelectChange,
  className = "",
}) {
  const { addEcole } = useCart();
  const [internalSelected, setInternalSelected] = useState(!!forcedSelected);
  const [childrenCount, setChildrenCount] = useState(Math.max(1, initialChildrenCount));
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const selected =
    typeof forcedSelected === "boolean" ? forcedSelected : internalSelected;

  const totalEuro = useMemo(() => childrenCount * unitEuro, [childrenCount, unitEuro]);

  const toggleSelected = () => {
    const next = !selected;
    setInternalSelected(next);
    onSelectChange?.(next);
  };

  const dec = () => setChildrenCount((c) => Math.max(1, c - 1));
  const inc = () => setChildrenCount((c) => Math.min(500, c + 1));

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

  const handleAdd = () => {
    addEcole(orgId, orgName, unitEuro, "/images/box.png", childrenCount);
    showNotification(
      `${currencyNoCents(totalEuro)} ajouté pour ${orgName} (${childrenCount} enfant${childrenCount > 1 ? 's' : ''}) !`
    );
  };

  return (
    <>

      <div
        className={[
          "grid gap-6 md:grid-cols-[1fr_2fr]",
          "bg-white rounded-xl p-4 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
          className,
        ].join(" ")}
      >
        {/* IMAGE GAUCHE */}
        <div className="flex items-center justify-center w-full">
          <img
            src={boxImageSrc}
            alt="Box ouverte"
            className="w-full md:max-w-[260px] object-contain drop-shadow-lg"
          />
        </div>


        {/* TEXTE + CONTROLES */}
        <div className="flex flex-col justify-between gap-5">
          {/* Titre */}
          <h3 className="text-2xl md:text-[28px] text-orange-500 ClashDisplayBold">
            {orgName}
          </h3>

          {/* Infos */}
          <div className="space-y-2 text-[15px] leading-relaxed">
            <p className="text-slate-700">
              <span className="text-[#0a548d]">Souhait :</span>{" "}
              <span className="font-medium">{wishLabel}</span>
            </p>

            <p className="text-[#0a548d] font-extrabold">
              {currencyNoCents(collectedEuro)}
              <span className="font-semibold">
                /{currencyNoCents(targetEuro)}
              </span>{" "}
              déjà collectés.
            </p>

            <a
              onClick={() => setIsPopupOpen(true)}
              className="inline-flex items-center gap-1 text-[#0a548d] underline underline-offset-2 hover:text-[#ff8300] transition cursor-pointer"
            >
              <Info className="w-4 h-4" />
              voir le contenu de la box
            </a>
          </div>

          {/* Contrôles */}
     <div className="flex flex-col sm:flex-row items-center gap-4">
  <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 shadow-md">

    {/* Bouton - */}
    <button
      type="button"
      aria-label="Diminuer la quantité"
      onClick={dec}
      className="w-9 h-9 rounded-lg bg-[#0a548d] text-white flex items-center justify-center
                 font-bold hover:bg-[#073f69] active:scale-95 transition-all shadow"
    >
      <Minus className="w-4 h-4" />
    </button>

    {/* Zone infos */}
    <div className="w-28 flex flex-col items-center justify-center text-center">
      <div className="text-base font-semibold text-[#0a548d]">
        {childrenCount} enfant{childrenCount > 1 ? "s" : ""}
      </div>
      <div className="text-sm text-slate-600 font-medium">
        {currencyNoCents(totalEuro)}
      </div>
    </div>

    {/* Bouton + */}
    <button
      type="button"
      aria-label="Augmenter la quantité"
      onClick={inc}
      className="w-9 h-9 rounded-lg bg-[#0a548d] text-white flex items-center justify-center
                 font-bold hover:bg-[#073f69]  active:scale-95 transition-all shadow"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>

  <AddButton amount={totalEuro} onClick={handleAdd} />
</div>

          {/* Aide */}
          <p className="text-[#0a548d] text-sm italic">
            4 euros = 1 box pour 1 enfant
          </p>
        </div>
      </div>


      <BoxPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}

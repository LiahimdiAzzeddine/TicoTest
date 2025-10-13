import React, { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { AddButton, QtyControlEuro } from "./TesComposants";
import BoxPopup from "./ui/BoxPopup";
import toast, { Toaster } from 'react-hot-toast';

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
  contentUrl = "#",
  unitEuro = 4,
  initialQty = 4,
  childrenPerUnit = 1 / 4,
  boxImageSrc = "/images/box.png",
  selected: forcedSelected,
  onSelectChange,
  className = "",
}) {
  const { addEcole } = useCart();
  const [internalSelected, setInternalSelected] = useState(!!forcedSelected);
  const [qty, setQty] = useState(Math.max(1, initialQty));
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const selected =
    typeof forcedSelected === "boolean" ? forcedSelected : internalSelected;

  const totalEuro = useMemo(() => qty * unitEuro, [qty, unitEuro]);
  const childrenCount = useMemo(
    () => qty * childrenPerUnit,
    [qty, childrenPerUnit]
  );

  const toggleSelected = () => {
    const next = !selected;
    setInternalSelected(next);
    onSelectChange?.(next);
  };

  const dec = () => setQty((q) => Math.max(4, q - 4));
  const inc = () => setQty((q) => Math.min(2000, q + 4));

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
    addEcole(orgId, orgName, totalEuro, "/images/box.png", childrenCount);
    showNotification(
      `${currencyNoCents(totalEuro)} ajouté pour ${orgName} (${childrenCount} enfant${childrenCount > 1 ? 's' : ''}) !`
    );
  };

  return (
    <>
      <Toaster />

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
            <QtyControlEuro
              title={orgName}
              qty={qty}
              unitEuro={unitEuro}
              dec={dec}
              inc={inc}
            />

            <AddButton amount={totalEuro} onClick={handleAdd} />
          </div>

          {/* Aide */}
          <p className="text-[#0a548d] text-sm italic">
            Cette participation correspond à{" "}
            <span className="font-semibold">{childrenCount}</span>{" "}
            enfant{childrenCount > 1 ? "s" : ""}.
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
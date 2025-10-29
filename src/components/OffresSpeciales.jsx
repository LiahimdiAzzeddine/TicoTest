import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import toast from 'react-hot-toast';
import { AddButton, QtyControl } from "./TesComposants";

/* ---------- Styles communs ---------- */

const BLUE = "#0a548d";
const CREAM = "#fff1b8";
const YELLOW = "#FFECA7";


/* Bloc visuels pack : img + + + img */
function BundleVisuals({ url }) {
  return (
    <div className="flex items-center">
      <img
              src={url}
              className="w-full md:max-h-40 max-w-full object-contain"
              loading="lazy"
            />
    </div>
  );
}

/* Une ligne d'offre */
function BundleRow({
  visual,
  id,
  title,
  lines = [],
  oldPrice,
  newPrice,
  shippingNote,
  onAdd,
}) {
  const [qty, setQty] = useState(1);
  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <div className="w-full flex flex-col gap-4 py-8 md:flex-row items-center md:items-center md:justify-between border-b border-slate-200">
      {/* Visuels */}
      <BundleVisuals url={visual} />

      {/* Texte */}
      <div className="flex-1 md:px-4 text-center md:text-start">
        <h3 className="font-bold text-lg" style={{ color: BLUE }}>
          {title}
        </h3>
        {lines.map((t, idx) => (
          <p key={idx} className="text-[#0a548d] text-base ">
            {t}
          </p>
        ))}
        {(oldPrice || newPrice) && (
          <div className="mt-1 text-slate-800">
            {oldPrice && (
              <span className="line-through text-[#0a548d] text-base mr-2">
                {oldPrice}
              </span>
            )}
            {newPrice && <span className="font-semibold text-[#0a548d] text-base">{newPrice}</span>}
          </div>
        )}
        {shippingNote && (
          <p className="text-[#0a548d] text-sm mt-0.5 ">{shippingNote}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 self-center md:self-auto">
        <QtyControl id={id} title={title} qty={qty} inc={inc} dec={dec} />
        <AddButton onClick={() => onAdd?.(qty)} />
      </div>
    </div>
  );
}

const BUNDLES = {
  tiPackPdf: {
    id: "tipack-pdf",
    name: "Le Ti'Pack (PDF)",
    price: 19.99,
    image:"/images/packpdfcarre.webp",
    frais:0,
    originalPrice:24.90,
    description:"Calendrier et guide",
    poids:0
  },
  starterPackPrint: {
    id: "starterpack-print",
    name: "Le Starter Pack Ti'Conso (Imprimé)",
    price: 49.99,
    image:"/images/Packimprime.webp",
    frais:0,
    originalPrice:59.97,
    description:"Calendrier, guide et jeu",
    poids:700
  },
};

export default function OffresSpeciales({
  calImg = "/images/calendrierp.webp",
  guideImg = "/images/guidep.webp",
  jeuImg = "/images/jeup.webp",
}) {
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

  const handleAddTiPack = (qty) => {
    addMaison(BUNDLES.tiPackPdf.id, BUNDLES.tiPackPdf.name, BUNDLES.tiPackPdf.price,BUNDLES.tiPackPdf.image,qty,BUNDLES.tiPackPdf.frais,BUNDLES.tiPackPdf.originalPrice,BUNDLES.tiPackPdf.description,BUNDLES.tiPackPdf.poids);
    showNotification(`${qty}x Le Ti'Pack (PDF) ajouté au panier !`);
  };

  const handleAddStarterPack = (qty) => {
    addMaison(BUNDLES.starterPackPrint.id, BUNDLES.starterPackPrint.name, BUNDLES.starterPackPrint.price,BUNDLES.starterPackPrint.image,qty,BUNDLES.starterPackPrint.frais,BUNDLES.starterPackPrint.originalPrice,BUNDLES.starterPackPrint.description,BUNDLES.starterPackPrint.poids);
    showNotification(`${qty}x Le Starter Pack Ti'Conso (Imprimé) ajouté au panier !`);
  };

  return (
    <>
      <div className="max-w-6xl flex flex-col md:flex-col items-center justify-end gap-4 md:gap-14 lg:gap-14 2xl:gap-16 md:mt-8">
        {/* <div className="flex justify-center mb-12">
          <div className="bg-[#FFECA7] px-6 py-2 rounded-xl">
            <h2 className="ml-0 text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:leading-tight ClashDisplayBold text-[#0a548d]">Offre spéciale</h2>
          </div>
        </div> */}

        <div className=" space-y-0 md:space-y-4">
          <BundleRow
            visual={"/images/packpdfcarre.webp"}
            title="Le Ti'Pack"
            id={"tipack-pdf"}
            lines={["Calendrier et guide", "Version PDF"]}
            oldPrice="24,90€"
            newPrice="19,99€"
            onAdd={handleAddTiPack}
          />

          <BundleRow
            visual={"/images/Packimprime.webp"}
            title="Le Starter Pack Ti'Conso"
            id={"starterpack-print"}
            lines={["Calendrier, guide et jeu", "Version imprimé"]}
            oldPrice="59,97€"
            newPrice="49,99€"
            shippingNote="+ frais de port"
            onAdd={handleAddStarterPack}
          />
        </div>
      </div>
    </>
  );
}

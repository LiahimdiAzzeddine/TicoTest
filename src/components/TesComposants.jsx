import { Minus, Plus } from "lucide-react";


export function QtyControl({ id, qty, inc, dec, minQt }) {
  const isPdfProduct = id.includes("-pdf"); // ✅ vérifie si l'id contient "-pdf"
  const disableMinus = isPdfProduct || (minQt !== undefined && qty <= minQt);

  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
      <button
        type="button"
        aria-label={`Diminuer la quantité de ${id}`}
        onClick={!disableMinus ? dec : undefined}
        disabled={disableMinus}
        style={{ backgroundColor: disableMinus ? "#ccc" : "#0a548d" }}
        className={`w-8 h-6 rounded-lg text-white flex items-center justify-center font-bold shadow-2xl p-1 transition-all ${
          disableMinus
            ? "cursor-not-allowed opacity-60"
            : "hover:bg-blue-400 active:scale-95"
        }`}
      >
        <Minus className="w-4 h-4 text-white" />
      </button>

      <div className="w-12 h-6 border bg-gray-50 rounded-lg border-gray-300 flex items-center justify-center shadow-2xl">
        <span className="text-[#0a548d] font-semibold text-sm">{qty}</span>
      </div>

      <button
        type="button"
        aria-label={`Augmenter la quantité de ${id}`}
        onClick={!isPdfProduct ? inc : undefined}
        disabled={isPdfProduct}
        style={{ backgroundColor: isPdfProduct ? "#ccc" : "#0a548d" }}
        className={`w-8 h-6 rounded-lg text-white flex items-center justify-center font-bold shadow-2xl transition-all ${
          isPdfProduct
            ? "cursor-not-allowed opacity-60"
            : "hover:bg-blue-400 active:scale-95"
        }`}
      >
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}

export function QtyControlEuro({ title, qty, inc, dec }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
      <button
        type="button"
        aria-label={`Diminuer la quantité de ${title}`}
        onClick={dec}
        style={{ backgroundColor: "#0a548d" }}
        className="w-8 h-6 rounded-lg bg-[#0a548d] text-white flex items-center justify-center font-bold hover:bg-blue-400 active:scale-95 shadow-2xl p-1"
      >
        <Minus className="w-4 h-4 text-white" />
      </button>

      <div className="w-16 h-6 border bg-gray-50 rounded-lg border-gray-300 flex items-center justify-center shadow-2xl px-1">
        <span className="text-[#0a548d] font-semibold text-sm">
          {qty} €
        </span>
      </div>

      <button
        type="button"
        aria-label={`Augmenter la quantité de ${title}`}
        onClick={inc}
        style={{ backgroundColor: "#0a548d" }}
        className="w-8 h-6 rounded-lg bg-[#0a548d] text-white flex items-center justify-center font-bold hover:bg-blue-400 active:scale-95 shadow-2xl"
      >
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}

export function CartIcon() {
  return (
    <img className="w-8 h-8" src="/images/caddie orange.png" alt="Panier"/>
  );
}

/* Bouton jaune avec caddie + libellé */
export function AddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        bg-gradient-to-b from-[#FFECA7] to-[#f4de8f]
        hover:from-[#f4de8f] hover:to-[#e8d180]
        active:from-[#e8d180] active:to-[#dcc670]
        rounded-lg
        px-4 py-1
        flex items-center justify-center flex-col gap-1
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(0,0,0,0.1)]
        hover:shadow-[0_6px_8px_-1px_rgba(0,0,0,0.15),0_3px_5px_-1px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(0,0,0,0.1)]
        active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.05)]
        border-2 border-[#0a548d]
        active:scale-[.97]
        transition-all duration-150
        relative
        overflow-hidden
        before:absolute before:inset-0 before:bg-white before:opacity-0
        hover:before:opacity-10
        active:translate-y-[1px]
      "
    >
      <CartIcon />
      <span className="text-[#0a548d] font-semibold text-sm">Ajouter</span>
    </button>
  );
}

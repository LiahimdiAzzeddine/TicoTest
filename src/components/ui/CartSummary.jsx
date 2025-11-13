import { Minus, Plus, Trash2 } from "lucide-react";

export function CartSummary({ cart, updateQty, removeItem }) {
     // Calcul du financement total en fonction des produits
  const financement = cart.maison.reduce((total, item) => {
    const qty = item.qty ?? 0;
    switch (item.id) {
      case "calendrier-pdf":
      case "calendrier-imprime":
        return total + 2 * qty;
      case "guide-pdf":
      case "guide-imprime":
        return total + 4 * qty;
      case "pack-pdf":
        return total + 6 * qty;
      default:
        return total;
    }
  }, 0);
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#0a548d] p-3 sm:p-4 space-y-2">
            {cart.maison.map((item) => {
                const isPdf = item.id.includes("-pdf"); // Vérifie si id contient "-pdf"

                return (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-xl relative "
                    >
                        <div className="absolute text-red-500 right-2 top-2">
                            <button
                                onClick={() => updateQty("maison", item.id, 0)}
                                className={`hover:bg-gray-300 rounded-full p-1 transition-colors text-red-500 `}
                            >
                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                        {/* Image + description */}
                        <div className="flex items-start gap-3 flex-1">
                            <img
                                src={item.image}
                                alt="Calendrier"
                                className="w-16 h-16 sm:w-auto sm:h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0 static">
                                <h3 className="font-bold text-[#0a548d] text-sm sm:text-base mb-1">
                                    {item.name}
                                </h3>
                                {item.description && (
                                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5 line-clamp-2">
                                        {item.description}
                                    </p>
                                )}
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {item.originalPrice && (
                                        <span className="line-through">
                                            {(item.originalPrice ?? 0).toFixed(
                                                2
                                            )}
                                            €
                                        </span>
                                    )}
                                    <span className="ml-1">
                                        {item.price.toFixed(2)}€
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Quantité + prix */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full border-2 border-[#0a548d] px-3 sm:px-4 py-1.5 sm:py-2">
                                {/* Minus remplacé par Trash si PDF */}

                                <button
                                    onClick={() =>
                                        updateQty(
                                            "maison",
                                            item.id,
                                            item.qty - 1
                                        )
                                    }
                                    disabled={
                                        isPdf ||
                                        (item.minQt !== undefined &&
                                            item.qty <= item.minQt)
                                    }
                                    className={`text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors ${
                                        isPdf ||
                                        (item.minQt !== undefined &&
                                            item.qty <= item.minQt)
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>

                                <span className="font-bold text-[#0a548d] w-6 sm:w-8 text-center text-sm sm:text-base">
                                    {item.qty}
                                </span>

                                {/* Plus désactivé si PDF */}
                                <button
                                    onClick={() =>
                                        updateQty(
                                            "maison",
                                            item.id,
                                            item.qty + 1
                                        )
                                    }
                                    disabled={isPdf}
                                    className={`text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors ${
                                        isPdf
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            <span className="text-lg sm:text-2xl font-bold text-[#0a548d] min-w-[80px] sm:min-w-[100px] text-right">
                                {(item.price * item.qty).toFixed(2)}€
                            </span>
                        </div>
                    </div>
                );
            })}
<br/>
          {financement > 0 && (
  <div className="w-full text-center">
    <p
      className="text-orange-500 font-bold leading-snug"
      style={{
        fontFamily: "'ClashDisplay', sans-serif",
        fontSize: "clamp(0.5rem, 1.5vw, 1.2rem)", // responsive: min 16px, max 24px
      }}
    >
      Cette commande permet d’aider le financement de Kit Pédagogique pour les écoles à hauteur de <span className="text-orange-600">{financement}€</span>
    </p>
  </div>
)}

        </div>
    );
}

import React from "react";

export function ProductCard({
  product,
  selectedProduct,
  setSelectedProduct,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  const isSelected = selectedProduct === product.id;
  const isPdfProduct = product.idname?.includes("-pdf"); // ✅ vérifie si le produit est un PDF

  return (
    <div
      onClick={() => setSelectedProduct(product.id)}
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 sm:py-1 px-3 sm:px-4 rounded-3xl border-2 cursor-pointer transition-all ${
        isSelected ? "border-[#0a548d] bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      {/* Ligne supérieure mobile: Radio + Image + Nom */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Radio */}
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected ? "border-[#0a548d]" : "border-gray-400"
          }`}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0a548d]" />
          )}
        </div>

        {/* Image produit */}
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
        />

        {/* Nom produit */}
        <div className="flex-1 text-[#0a548d] min-w-0">
          <span className="font-bold text-base sm:text-lg ClashDisplayBold block truncate sm:whitespace-normal">
            {product.name}
          </span>
          {product.subname && (
            <span className="ArchivoLight text-sm block truncate sm:whitespace-normal">
              {product.subname}
            </span>
          )}
        </div>
      </div>

      {/* Ligne inférieure mobile: Quantité + Prix */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-4 sm:ml-auto">
        {/* Sélecteur de quantité */}
        {isSelected && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-lg border border-[#0a548d] px-1 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isPdfProduct) decreaseQuantity();
              }}
              disabled={isPdfProduct}
              className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded font-bold text-lg sm:text-xl transition-colors ${
                isPdfProduct
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "text-white bg-[#0a548d] hover:bg-[#084070]"
              }`}
            >
              −
            </button>

            <span className="w-8 sm:w-11 text-center font-bold text-[#0a548d] text-base sm:text-lg">
              {quantity}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isPdfProduct) increaseQuantity();
              }}
              disabled={isPdfProduct}
              className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded font-bold text-lg sm:text-xl transition-colors ${
                isPdfProduct
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "text-white bg-[#0a548d] hover:bg-[#084070]"
              }`}
            >
              +
            </button>
          </div>
        )}

        {/* Prix */}
        <span className="text-[#0a548d] font-bold text-lg sm:text-xl flex-shrink-0 ClashDisplayBold">
          {(product.price * (isSelected ? quantity : 1)).toFixed(2)}€
        </span>
      </div>
    </div>
  );
}

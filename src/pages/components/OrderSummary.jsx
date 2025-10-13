import React from "react";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { QtyControl } from "./TesComposants";

export default function OrderSummary({ isOpen, onClose }) {
  const { cart, updateQty, removeItem, clearCart, totalMaison, totalEcole } = useCart();
  const navigate = useNavigate();
  if (!isOpen) return null;

  const totalItems = cart.maison.reduce((acc, item) => acc + item.qty, 0) +
    cart.ecole.reduce((acc, item) => acc + item.qty, 0);

  const handleOrderMaison = () => {
    //console.log("Commande maison:", cart.maison);
    navigate("checkoutMaison")
    onClose()
  };

  const handleOrderEcole = () => {
    //console.log("Commande école:", cart.ecole);
    navigate("checkoutEcole")
    onClose()
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#ff8300]" />
            <h2 className="text-2xl font-bold text-[#0a548d]">Mon Panier</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
              <p className="text-lg text-gray-500 mb-2">Votre panier est vide</p>
              <p className="text-sm text-gray-400">Ajoutez des produits pour commencer</p>
            </div>
          ) : (
            <>
              {cart.maison.length > 0 && (
                <div className="mb-8 bg-orange-50/50 rounded-xl p-4 border-2 border-orange-200">
                  <h3 className="text-lg font-bold text-[#0a548d] mb-3 flex items-center gap-2">
                    À la maison
                    <span className="text-sm font-normal text-gray-500">
                      ({cart.maison.length} {cart.maison.length > 1 ? 'produits' : 'produit'})
                    </span>
                  </h3>
                  <div className="space-y-2 mb-4">
                    {cart.maison.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3 flex-1">
                            {/* Image du produit */}
                            <img
                              src={(item.image).replace('Packimprime.webp','packimprimecarre.png')}
                              alt={item.name}
                              className="w-auto h-16 object-cover rounded-md border"
                            />
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          </div>

                          <button
                            onClick={() => removeItem("maison", item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <QtyControl
                            qty={item.qty}
                            inc={() => updateQty("maison", item.id, item.qty + 1)}
                            dec={() => updateQty("maison", item.id, item.qty - 1)}
                          />
                          <p className="text-lg font-bold text-[#ff8300]">
                            {(item.price * item.qty).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>


                  <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-[#0a548d]">Total maison:</span>
                      <span className="text-2xl font-bold text-[#ff8300]">{totalMaison.toFixed(2)} €</span>
                    </div>
                    <button
                      onClick={handleOrderMaison}
                      className="w-full bg-gradient-to-r from-[#ff8300] to-[#ff9933] text-white py-3 rounded-lg font-bold text-base hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                    >
                      Commander (Maison)
                    </button>
                  </div>
                </div>
              )}

              {cart.ecole.length > 0 && (
                <div className="mb-8 bg-blue-50/50 rounded-xl p-4 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-[#0a548d] mb-3 flex items-center gap-2">
                    À l'école
                    <span className="text-sm font-normal text-gray-500">
                      ({cart.ecole.length} {cart.ecole.length > 1 ? 'organisations' : 'organisation'})
                    </span>
                  </h3>
                  <div className="space-y-4 mb-2">
                    {cart.ecole.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3 flex-1">
                            {/* Image du produit */}
                            <img
                              src={item.image}
                              alt={item.orgName}
                              className="w-auto h-16 object-cover rounded-md border"
                            />
                            <h4 className="font-semibold text-gray-800">{item.orgName}</h4>
                          </div>

                          <button
                            onClick={() => removeItem('ecole', item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">

                          <QtyControl qty={item.qty} inc={() => updateQty('ecole', item.id, item.qty + 1)} dec={() => updateQty('ecole', item.id, item.qty - 1)} />
                          <p className="text-lg font-bold text-[#ff8300]">
                            {(item.unitPrice * item.qty).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-[#0a548d]">Total école:</span>
                      <span className="text-2xl font-bold text-[#ff8300]">{totalEcole.toFixed(2)} €</span>
                    </div>
                    <button
                      onClick={handleOrderEcole}
                      className="w-full bg-gradient-to-r from-[#0a548d] to-[#0d6ab8] text-white py-3 rounded-lg font-bold text-base hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                    >
                      Commander (École)
                    </button>
                  </div>
                </div>
              )}

              {totalItems > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200 font-medium"
                >
                  Vider le panier
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </>
  );
}

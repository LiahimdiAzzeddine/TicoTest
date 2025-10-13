import React from "react";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, School } from "lucide-react";
import StartSection from "../Templates/StartSection";

const currencyFormat = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(v);

export default function CartSummary({ onNavigateToMaison, onNavigateToEcole }) {
  const { cart, totalMaison, totalEcole } = useCart();

  const maisonItemCount = cart.maison.reduce((acc, item) => acc + item.qty, 0);
  const ecoleItemCount = cart.ecole.reduce((acc, item) => acc + item.qty, 0);

  return (
    <StartSection pb={"md:pb-20 pb-16"}>
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-3xl font-bold text-[#0a548d] mb-8 text-center">
        Récapitulatif de vos commandes
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={onNavigateToMaison}
          className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#FFECA7] hover:shadow-lg transition-all duration-200 text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#FFECA7] p-3 rounded-xl group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-8 h-8 text-[#0a548d]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0a548d] mb-2">
                Commande Maison
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Produits et offres pour la maison
              </p>
              <div className="space-y-1">
                <p className="text-slate-700">
                  <span className="font-semibold">{maisonItemCount}</span>{" "}
                  article{maisonItemCount > 1 ? "s" : ""}
                </p>
                <p className="text-2xl font-bold text-[#0a548d]">
                  {currencyFormat(totalMaison)}
                </p>
              </div>
            </div>
          </div>
          {maisonItemCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Cliquez pour voir le détail et procéder au paiement
              </p>
            </div>
          )}
          {maisonItemCount === 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500 italic">
                Votre panier maison est vide
              </p>
            </div>
          )}
        </button>

        <button
          onClick={onNavigateToEcole}
          className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#FFECA7] hover:shadow-lg transition-all duration-200 text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#FFECA7] p-3 rounded-xl group-hover:scale-110 transition-transform">
              <School className="w-8 h-8 text-[#0a548d]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0a548d] mb-2">
                Commande École
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Dons pour les établissements scolaires
              </p>
              <div className="space-y-1">
                <p className="text-slate-700">
                  <span className="font-semibold">{ecoleItemCount}</span>{" "}
                  enfant{ecoleItemCount > 1 ? "s" : ""}
                </p>
                <p className="text-2xl font-bold text-[#0a548d]">
                  {currencyFormat(totalEcole)}
                </p>
              </div>
            </div>
          </div>
          {ecoleItemCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Cliquez pour voir le détail et procéder au paiement
              </p>
            </div>
          )}
          {ecoleItemCount === 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500 italic">
                Votre panier école est vide
              </p>
            </div>
          )}
        </button>
      </div>
    </div></StartSection>
  );
}

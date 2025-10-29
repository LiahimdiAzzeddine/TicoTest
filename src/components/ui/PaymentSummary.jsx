import { useEffect, useState } from "react";
import { AlertCircle, Shield, Lock } from "lucide-react";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";

export default function PaymentSummary({
  mode, // "relais" ou "domicile"
  cart,
  totalMaison,
  shippingCost,
  setShippingCost,
  handleSubmit,
  isFormValid,
  loading,
  error,
}) {
  const [totalWithShipping, setTotalWithShipping] = useState(totalMaison);
  const [tva, setTva] = useState(0);

  // 🔹 Calcul des frais de port automatiquement
useEffect(() => {
  if (!cart?.maison?.length || !mode) return;

  // On ne garde que les colis avec un poids > 0 et on intègre la quantité
  const colis = cart.maison
    .map((item) => ({ poids: (item.poids || 0) * (item.qty || 1) }))
    .filter((item) => item.poids > 0);

  // Si aucun colis n'a de poids, on ne fait pas de requête
  if (colis.length === 0) {
    setShippingCost(0);
    return;
  }

  const fetchShippingCost = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/api/calculate-shipping`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, colis }),
        }
      );

      const data = await res.json();

      if (res.ok && data.tarif) {
        setShippingCost(data.tarif);
      } else {
        console.error("Erreur du serveur:", data);
        setShippingCost(0);
      }
    } catch (err) {
      console.error("Erreur lors du calcul des frais de port:", err);
      setShippingCost(0);
    }
  };

  fetchShippingCost();
}, [cart, mode]);


  // 🔹 Met à jour le total et la TVA
  useEffect(() => {
    const total = totalMaison + shippingCost;
    setTotalWithShipping(total);
    setTva(total * 0.2); // exemple : 20 %
  }, [totalMaison, shippingCost]);

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-8">
        <div className="space-y-4 sm:space-y-6">
          {/* ======================= */}
          {/* Montant de la commande */}
          {/* ======================= */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base lg:text-lg font-bold text-[#0a548d]">
                Montant de la commande
              </span>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-[#0a548d]">
                {totalMaison.toFixed(2)}€
              </span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#ff7a00] to-transparent mx-4 sm:mx-10"></div>

            {/* ======================= */}
            {/* Frais de port */}
            {/* ======================= */}
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base lg:text-lg font-bold text-[#0a548d]">
                Frais de port ({mode === "domicile" ? "Domicile" : "Point relais"})
              </span>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-[#0a548d]">
                {shippingCost.toFixed(2)}€
              </span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#ff7a00] to-transparent mx-4 sm:mx-10"></div>

            {/* ======================= */}
            {/* Total à payer */}
            {/* ======================= */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-[#0a548d]">
                Total à payer
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0a548d]">
                {totalWithShipping.toFixed(2)}€
              </span>
            </div>

            {/* ======================= */}
            {/* TVA */}
            {/* ======================= */}
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">
                Dont TVA (20%)
              </span>
              <span className="text-xs sm:text-sm text-gray-600 font-semibold">
                {tva.toFixed(2)}€
              </span>
            </div>
          </div>

          {/* ======================= */}
          {/* Bouton paiement */}
          {/* ======================= */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || loading}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 shadow-md ${
              isFormValid() && !loading
                ? "bg-[#0a548d] hover:bg-[#083d6b] text-white hover:shadow-lg active:scale-95 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
            }`}
          >
            {loading ? "Redirection..." : "Payer"}
          </button>

          {/* ======================= */}
          {/* Gestion des erreurs */}
          {/* ======================= */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* ======================= */}
          {/* Paiement sécurisé */}
          {/* ======================= */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff8300] flex-shrink-0" />
            <span className="font-semibold text-[#0a548d]">
              Paiement sécurisé via STRIPE
            </span>
          </div>

          {/* Logos moyens de paiement */}
          <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm border border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["visa", "mastercard", "amex", "jcb", "unionpay"].map((type) => (
                <div
                  key={type}
                  className="bg-gradient-to-br from-gray-50 to-white px-2 py-1 rounded border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <PaymentIcon type={type} format="flatRounded" width={30} />
                </div>
              ))}
            </div>
          </div>

          {/* ======================= */}
          {/* Badge de sécurité */}
          {/* ======================= */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-green-800 font-semibold">
                Cryptage SSL 256 bits
              </span>
            </div>
            <p className="text-xs text-green-700 text-center mt-1">
              Vos données de paiement sont protégées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

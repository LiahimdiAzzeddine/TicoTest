import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import StartSection from '../Templates/StartSection';
import { useStripeOrgCheckout } from '../services/useStripeOrgCheckout';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

export default function CheckoutEcole() {
  const { cart, updateChildrenCount, totalEcole } = useCart();
  const { createCheckoutOrgSession, loading, error } = useStripeOrgCheckout();

  const tva = totalEcole * 0.20;

  const handleSubmit = () => {
    if (cart.ecole.length === 0) return;

    const item = cart.ecole[0];
    console.log("🚀 ~ handleSubmit ~ item:", item)
    const orderData = {
      organisation_id: item.id,
      product_name: item.orgName,
      product_price: item.unitPrice,
      quantity: item.childrenCount,
      shipping_cost: item.frais ?? 0,
    };

    createCheckoutOrgSession(orderData);
  };

  if (cart.ecole.length === 0) {
    return (
      <StartSection>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a548d] mb-4">Votre panier école est vide</h1>
            <p className="text-gray-600">Ajoutez des contributions pour continuer</p>
          </div>
        </div>
      </StartSection>
    );
  }


  return (
    <>
      <StartSection>
        <div className=' flex flex-col items-center justify-center'>
          <div className=" max-w-3xl ">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a548d] mb-4 sm:mb-6 lg:mb-8 ClashDisplayBold">
              Récapitulatif de votre commande
            </h1>
            <div>

              <div className="space-y-6 flex flex-col items-center justify-center">
                {/* Liste des contributions */}
                {/* Résumé produits */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#0a548d] p-3 sm:p-4 space-y-2">
                  {cart.ecole.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-xl">
                      {/* Images et description */}
                      <div className="flex items-start gap-3 flex-1">
                        <img
                          src={item.image}
                          alt="Calendrier"
                          className="w-16 h-16 sm:w-auto sm:h-20 object-cover rounded-lg flex-shrink-0"
                        />

                        {/* Description du produit */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#0a548d] text-sm sm:text-base mb-1">Contribution à la box Ti'Conso pour</h3>

                          <h4 className="font-bold text-[#ff8300] text-xl mb-2">
                            {item.orgName}
                          </h4>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mb-0.5 line-clamp-2">{item.description}</p>
                          )}

                          <p className="text-xs sm:text-sm text-gray-500">

                            {item.price && (
                              <span className="ml-1">{item.price.toFixed(2)}€</span>
                            )}

                          </p>
                          {item.frais != null && (
                            <p className="text-xs text-[#0a548d]">
                              {item.frais === 0 ? "+frais de port" : item.frais}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Contrôle quantité et prix */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full border-2 border-[#0a548d] px-3 sm:px-4 py-1.5 sm:py-2">
                          <button
                            onClick={() => updateChildrenCount('ecole', item.id, item.childrenCount - 1)}
                            className="text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors"
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <div className="text-center w-20 sm:w-24">
                            <span className="font-bold text-[#0a548d] text-sm sm:text-base">{item.childrenCount} enfant{item.childrenCount > 1 ? 's' : ''}</span>
                          </div>
                          <button
                            onClick={() => updateChildrenCount('ecole', item.id, item.childrenCount + 1)}
                            className="text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                        <span className="text-lg sm:text-2xl font-bold text-[#0a548d] min-w-[80px] sm:min-w-[100px] text-right">
                          {(item.unitPrice * item.childrenCount).toFixed(0)}€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>


                {/* Récapitulatif paiement */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-8 max-w-xl">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4">
                      <span className="text-xl font-bold text-[#0a548d]">Montant de la contribution</span>
                      <span className="text-2xl font-bold text-[#0a548d]">{totalEcole.toFixed(0)}€</span>
                    </div>

                                                            <div className="h-px bg-gradient-to-r from-transparent bg-[#ff7a00] to-transparent mx-4 sm:mx-10"></div>


                    <div className="flex justify-between items-center pt-2">
                      <span className="text-2xl font-bold text-[#0a548d]">Total à payer</span>
                      <span className="text-3xl font-bold text-[#0a548d]">{totalEcole.toFixed(0)}€</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#0a548d] font-medium">Dont TVA</span>
                      <span className="text-[#0a548d] font-semibold">{tva.toFixed(1)}€</span>
                    </div>

                     {/* Bouton de paiement */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#0a548d] to-[#0d6ab8] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 mt-4"
      >
        {loading ? 'Chargement...' : 'Payer'}
      </button>

      {error && (
        <p className="text-red-500 mt-2 text-center">{error}</p>
      )}
              {/* Payment methods logos */}
                                   <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm border border-gray-100">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Visa */}
        <div className="bg-gradient-to-br from-gray-50 to-white px-2 py-1 rounded border border-gray-200 hover:shadow-sm transition-shadow">
           <PaymentIcon type="visa" format="flatRounded" width={30} />
        </div>
 <div className="bg-gradient-to-br from-gray-50 to-white px-2 py-1 rounded border border-gray-200 hover:shadow-sm transition-shadow">
           <PaymentIcon type="mastercard" format="flatRounded" width={30} />
        </div>
       <div className="bg-gradient-to-br from-gray-50 to-white px-2 py-1 rounded border border-gray-200 hover:shadow-sm transition-shadow">
           <PaymentIcon type="amex" format="flatRounded" width={30} />
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white px-2 py-1 rounded border border-gray-200 hover:shadow-sm transition-shadow">
           <PaymentIcon type="jcb" format="flatRounded" width={30} />
        </div>
<div className="bg-gradient-to-br from-gray-50 to-white px-2 py-1 rounded border border-gray-200 hover:shadow-sm transition-shadow">
           <PaymentIcon type="unionpay" format="flatRounded" width={30} />
        </div>

      </div>
    </div>

                    {/* Informations de sécurité et garanties */}
                    <div className="space-y-3 mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-sm text-[#0a548d] font-medium">
                          Paiement sécurisé via STRIPE
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-sm text-[#0a548d] font-medium">
                          Durée de collecte illimitée, réaffectation possible au bout de 24 mois à un autre organisme similaire si l'objectif n'est pas atteint (voir CGV)
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-sm text-[#0a548d] font-medium">
                          Organisme vérifié par Ti'CO
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
      </StartSection>
    </>
  );
}

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, ShieldCheck, Clock, CheckCircle2, User, Mail } from 'lucide-react';
import StartSection from '../Templates/StartSection';
import { useStripeOrgCheckout } from '../services/useStripeOrgCheckout';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

export default function CheckoutEcole() {
  const { cart, totalEcole, updateEcoleAmount } = useCart();
  const { createCheckoutOrgSession, loading, error } = useStripeOrgCheckout();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const tva = 0;

  const handleDecrement = (id, currentAmount) => {
    const newAmount = Math.max(1, currentAmount - 1);
    updateEcoleAmount(id, newAmount);
  };

  const handleIncrement = (id, currentAmount) => {
    updateEcoleAmount(id, currentAmount + 1);
  };

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!userInfo.firstName.trim()) {
      errors.firstName = 'Le prénom est requis';
    }

    if (!userInfo.lastName.trim()) {
      errors.lastName = 'Le nom est requis';
    }

    if (!userInfo.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      errors.email = 'Email invalide';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (cart.ecole.length === 0) return;

    if (!validateForm()) {
      return;
    }

    const orderData = {
      items: cart.ecole.map(item => ({
        organisation_id: item.id,
        organisation_name: item.name,
        product_id: item.productId,
        product_price: item.amount,
        shipping_cost: 0,
      })),
      total: totalEcole,
      customer: {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email
      }
    };

    console.log("🚀 ~ handleSubmit ~ orderData:", orderData)

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
const handleAmountChange = (id, newAmount) => {
 updateEcoleAmount(id,newAmount)
};


  return (
    <>
      <StartSection>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a548d] mb-4 sm:mb-6 lg:mb-8 ClashDisplayBold">
              Récapitulatif de votre commande
            </h1>
            <div>

              <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                <div className="flex-1 space-y-6">
                {/* Formulaire informations utilisateur */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#0a548d] p-4 sm:p-6">

                  <div className="flex items-start gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a548d]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0a548d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0a548d] mb-1">
                         Vos informations
                    </h3>
                    <p className="text-sm text-gray-600">
                      Renseignez vos coordonnées pour recevoir l'email de confirmation
                    </p>
                </div>
            </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0a548d] mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => handleUserInfoChange('firstName', e.target.value)}

                        className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                formErrors.firstName
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                            }`}
                        placeholder="Jean"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0a548d] mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => handleUserInfoChange('lastName', e.target.value)}

                        className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                formErrors.lastName
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                            }`}
                        placeholder="Dupont"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#0a548d] mb-1 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleUserInfoChange('email', e.target.value)}

                        className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                formErrors.email
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                            }`}
                        placeholder="jean.dupont@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

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
                          <h4 className="font-bold text-[#ff8300] text-xl mb-2">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mb-0.5 line-clamp-2">{item.description}</p>
                          )}

                          <p className="text-xs sm:text-sm text-gray-500">

                            {item.amount && (
                              <span className="ml-1">{item.amount.toFixed(2)}€</span>
                            )}

                          </p>

                        </div>
                      </div>

                      {/* Contrôle quantité et prix */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
  <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full border-2 border-[#0a548d] px-3 sm:px-4 py-1.5 sm:py-2">
  <button
    onClick={() => handleDecrement(item.id, item.amount)}
    className="text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={item.amount <= 1 || item.productId === 'detective_kit_4'}
  >
    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>

  <div className="flex items-center text-center w-20 sm:w-24 justify-center">
    <input
      type="number"
      value={item.amount}
      onChange={(e) => {
        if (item.productId === 'detective_kit_4') return; // désactive modification
        const value = Number(e.target.value);
        if (!isNaN(value) && value > 0) {
          handleAmountChange(item.id, value);
        } else if (e.target.value === "") {
          handleAmountChange(item.id, ""); 
        }
      }}
      onBlur={() => {
        if (item.productId === 'detective_kit_4') return; // désactive modification
        if (!item.amount || item.amount <= 0) {
          handleAmountChange(item.id, 1);
        }
      }}
      className="font-bold text-[#0a548d] text-sm sm:text-base text-center w-full outline-none"
      disabled={item.productId === 'detective_kit_4'} // désactive la saisie
    />
    <span className="ml-1 font-bold text-[#0a548d] text-sm sm:text-base">€</span>
  </div>

  <button
    onClick={() => handleIncrement(item.id, item.amount)}
     className="text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={item.amount <= 1 || item.productId === 'detective_kit_4'}
  >
    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
</div>


  <span className="text-lg sm:text-2xl font-bold text-[#0a548d] min-w-[80px] sm:min-w-[100px] text-right">
    {(item.amount).toFixed(0)}€
  </span>
</div>

                    </div>
                  ))}
                </div>


                </div>

                {/* Récapitulatif paiement */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-8 w-full lg:w-96">
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

      </StartSection>
    </>
  );
}

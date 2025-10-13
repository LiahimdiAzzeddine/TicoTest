import React, { useState } from 'react';
import { Minus, Plus, Shield, AlertCircle, Lock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import StartSection from '../Templates/StartSection';
import { useStripeCheckout } from '../services/useStripeCheckout';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';
import {validateField} from '../services/methods'

export default function CheckoutMaison() {
    const { cart, updateQty, totalMaison, removeItem } = useCart();
    const { createCheckoutSession, loading, error } = useStripeCheckout();
    const [formData, setFormData] = useState({
        email: '',
        nom: '',
        prenom: '',
        adresse: '',
        ville: '',
        codePostal: '',
        livraison: 'domicile'
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const shippingCost = 0;
    const totalWithShipping = totalMaison + shippingCost;
    const tva = totalWithShipping * 0.20;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleDeliveryChange = (method) => {
        setFormData(prev => ({
            ...prev,
            livraison: method
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const fields = ['email', 'nom', 'prenom', 'adresse', 'ville', 'codePostal'];

        fields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });
        return newErrors;
    };

    const isFormValid = () => {
        const validationErrors = validateForm();
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async () => {
        const newTouched = {
            email: true,
            nom: true,
            prenom: true,
            adresse: true,
            ville: true,
            codePostal: true
        };
        setTouched(newTouched);

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const orderData = {
                customer: {
                    email: formData.email,
                    nom: formData.nom,
                    prenom: formData.prenom,
                    adresse: formData.adresse,
                    ville: formData.ville,
                    codePostal: formData.codePostal,
                    livraison: formData.livraison
                },
                items: cart.maison.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.qty,
                    image: item.image
                })),
                total: totalWithShipping,
                shippingCost: shippingCost
            };

            createCheckoutSession(orderData);

        } else {
            const firstErrorField = Object.keys(validationErrors)[0];
            const element = document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
        }
    };


    if (cart.maison.length === 0) {
        return (
            <StartSection>
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0a548d] mb-4">Votre panier maison est vide</h1>
                        <p className="text-gray-600">Ajoutez des produits pour continuer</p>
                    </div>
                </div>
                </StartSection>
        );
    }

    return (
        <>
            <StartSection>
                <div className=" ">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a548d] mb-4 sm:mb-6 lg:mb-8 ClashDisplayBold">
                        Récapitulatif de votre commande
                    </h1>
                    <div>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>

                    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 sm:gap-6">
                        {/* Colonne gauche - Produits et formulaire */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Résumé produits */}
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#0a548d] p-3 sm:p-4 space-y-2">
                                {cart.maison.map((item) => (
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
                                                <h3 className="font-bold text-[#0a548d] text-sm sm:text-base mb-1">{item.name}</h3>
                                                {item.description && (
                                                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5 line-clamp-2">{item.description}</p>
                                                )}

                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {item.originalPrice && (
                                                        <span className="line-through">{(item.originalPrice ? item.originalPrice : 0).toFixed(2)}€</span>
                                                    )}
                                                    <span className="ml-1">{item.price.toFixed(2)}€</span>
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
                                                    onClick={() => updateQty('maison', item.id, item.qty - 1)}
                                                    className="text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <span className="font-bold text-[#0a548d] w-6 sm:w-8 text-center text-sm sm:text-base">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQty('maison', item.id, item.qty + 1)}
                                                    className="text-[#0a548d] hover:bg-gray-100 rounded-full p-1 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                            <span className="text-lg sm:text-2xl font-bold text-[#0a548d] min-w-[80px] sm:min-w-[100px] text-right">
                                                {(item.price * item.qty).toFixed(2)}€
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Formulaire de livraison */}
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#0a548d] p-4 sm:p-6">
                                <p className="text-xs sm:text-sm text-[#0a548d] font-semibold mb-3 sm:mb-4">
                                    Afin de vous délivrer votre commande merci de renseigner les éléments suivants :
                                </p>

                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-1.5 sm:mb-2">Mail*</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="nomprenom@mail.fr"
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#d9f2f2] border-2 rounded-lg focus:outline-none transition-colors ${errors.email && touched.email
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-cyan-100 focus:border-[#0a548d]'
                                                }`}
                                            required
                                        />
                                        {errors.email && touched.email && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-1.5 sm:mb-2">Nom*</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="nom"
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#d9f2f2] border-2 rounded-lg focus:outline-none transition-colors ${errors.nom && touched.nom
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-cyan-100 focus:border-[#0a548d]'
                                                }`}
                                            required
                                        />
                                        {errors.nom && touched.nom && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.nom}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-1.5 sm:mb-2">Prénom*</label>
                                        <input
                                            type="text"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="prénom"
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#d9f2f2] border-2 rounded-lg focus:outline-none transition-colors ${errors.prenom && touched.prenom
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-cyan-100 focus:border-[#0a548d]'
                                                }`}
                                            required
                                        />
                                        {errors.prenom && touched.prenom && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.prenom}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-1.5 sm:mb-2">Adresse*</label>
                                        <input
                                            type="text"
                                            name="adresse"
                                            value={formData.adresse}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="123 Rue de la Paix"
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#d9f2f2] border-2 rounded-lg focus:outline-none transition-colors ${errors.adresse && touched.adresse
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-cyan-100 focus:border-[#0a548d]'
                                                }`}
                                            required
                                        />
                                        {errors.adresse && touched.adresse && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.adresse}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-1.5 sm:mb-2">Ville*</label>
                                            <input
                                                type="text"
                                                name="ville"
                                                value={formData.ville}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                placeholder="Grenoble"
                                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#d9f2f2] border-2 rounded-lg focus:outline-none transition-colors ${errors.ville && touched.ville
                                                    ? 'border-red-500 focus:border-red-600'
                                                    : 'border-cyan-100 focus:border-[#0a548d]'
                                                    }`}
                                                required
                                            />
                                            {errors.ville && touched.ville && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.ville}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-1.5 sm:mb-2">Code postal*</label>
                                            <input
                                                type="text"
                                                name="codePostal"
                                                value={formData.codePostal}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                placeholder="38014"
                                                maxLength="5"
                                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#d9f2f2] border-2 rounded-lg focus:outline-none transition-colors ${errors.codePostal && touched.codePostal
                                                    ? 'border-red-500 focus:border-red-600'
                                                    : 'border-cyan-100 focus:border-[#0a548d]'
                                                    }`}
                                                required
                                            />
                                            {errors.codePostal && touched.codePostal && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.codePostal}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Choix de livraison */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-[#0a548d] mb-3 sm:mb-4">
                                            Choix de la livraison :
                                        </label>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-6">
                                            {/* Livraison à domicile */}
                                            <button
                                                type="button"
                                                onClick={() => handleDeliveryChange('domicile')}
                                                className={`flex flex-col items-center justify-center p-2 sm:p-0 rounded-xl border-2 transition-all ${formData.livraison === 'domicile'
                                                    ? 'bg-[#d9f2f2] border-[#0a548d] shadow-md'
                                                    : 'bg-[#d9f2f2] border-cyan-200 hover:border-cyan-300'
                                                    }`}
                                            >
                                                <img className='w-auto h-16 sm:h-24' src='/images/livraison domicile.png' alt="Livraison à domicile" />
                                            </button>

                                            {/* Point relais */}
                                            <button
                                                type="button"
                                                onClick={() => handleDeliveryChange('relais')}
                                                className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${formData.livraison === 'relais'
                                                    ? 'bg-[#d9f2f2] border-[#0a548d] shadow-md'
                                                    : 'bg-[#d9f2f2] border-cyan-200 hover:border-cyan-300'
                                                    }`}
                                            >
                                                <img className='w-auto h-16 sm:h-24' src='/images/Livraison point relais.png' alt="Point relais" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Colonne droite - Récapitulatif de paiement */}
                        <div>
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-8">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm sm:text-base lg:text-lg font-bold text-[#0a548d]">Montant de la commande</span>
                                            <span className="text-base sm:text-lg lg:text-xl font-bold text-[#0a548d]">{totalMaison.toFixed(2)}€</span>
                                        </div>

                                        <div className="h-px bg-gradient-to-r from-transparent bg-[#ff7a00] to-transparent mx-4 sm:mx-10"></div>


                                        <div className="flex justify-between items-center">
                                            <span className="text-sm sm:text-base lg:text-lg font-bold text-[#0a548d]">Frais de port</span>
                                            <span className="text-base sm:text-lg lg:text-xl font-bold text-[#0a548d]">{shippingCost.toFixed(2)}€</span>
                                        </div>

                                        <div className="h-px bg-gradient-to-r from-transparent bg-[#ff7a00] to-transparent mx-4 sm:mx-10"></div>


                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-base sm:text-lg lg:text-xl font-bold text-[#0a548d]">Total à payer</span>
                                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0a548d]">{totalWithShipping.toFixed(2)}€</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-gray-600">Dont TVA (20%)</span>
                                            <span className="text-xs sm:text-sm text-gray-600 font-semibold">{tva.toFixed(2)}€</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!isFormValid() || loading}
                                        className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 shadow-md ${isFormValid() && !loading
                                            ? 'bg-[#0a548d] hover:bg-[#083d6b] text-white hover:shadow-lg active:scale-95 cursor-pointer'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                                            }`}
                                    >
                                        {loading ? 'Redirection...' : 'Payer'}
                                    </button>

                                    {error && (
                                        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 flex items-start gap-2">
                                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff8300] flex-shrink-0" />
                                        <span className="font-semibold text-[#0a548d]">Paiement sécurisé via STRIPE</span>
                                    </div>

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

                                    {/* Security badge */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
                                        <div className="flex items-center justify-center gap-2">
                                            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-green-800 font-semibold">Cryptage SSL 256 bits</span>
                                        </div>
                                        <p className="text-xs text-green-700 text-center mt-1">Vos données de Payment sont protégées</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </StartSection>
            <div className="mb-32"></div></>
    );
}

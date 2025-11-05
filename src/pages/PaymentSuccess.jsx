import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function PaymentSuccess() {
  const { clearMaison, clearEcole } = useCart();
  const location = useLocation();
  const [type, setType] = useState();
  const [hasPdf, setHasPdf] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('type'); // home ou org
    const pdf = params.get('pdf'); // 1 ou 0

    setType(t);
    setHasPdf(pdf === '1');

    if (t === 'home') {
      clearMaison();
    } else if (t === 'org') {
      clearEcole();
    }
  },[type,hasPdf]);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Paiement réussi
        </h1>

        <p className="text-gray-600 mb-4 text-lg">
          {type === 'org'
            ? "Merci pour votre contribution  !"
            : "Merci pour votre commande ! Nous avons bien reçu votre paiement et nous préparons votre commande."}
        </p>

        {type !== 'org' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-green-800">
              Vous recevrez un e-mail de confirmation avec les détails de votre commande dans quelques instants.
            </p>

            {hasPdf && (
              <p className="text-sm text-green-800 mt-2 font-medium">
                ⚠️ Votre commande contient des fichiers PDF. Vérifiez votre email pour les télécharger.
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>

          <Link
            to="/athome"
            className="flex items-center justify-center gap-2 w-full bg-white text-blue-600 border-2 border-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <ShoppingBag className="w-5 h-5" />
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}

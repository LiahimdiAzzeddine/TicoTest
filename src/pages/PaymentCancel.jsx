import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ShoppingCart, Home, ArrowLeft } from 'lucide-react';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 rounded-full p-4">
            <XCircle className="w-16 h-16 text-orange-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Paiement annulé
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-orange-800">
            Vous pouvez retourner à votre panier pour finaliser votre commande quand vous le souhaitez.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            Retour au panier
          </Link>

          <Link
            to="/athome"
            className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 border-2 border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Continuer mes achats
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-white text-gray-600 py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

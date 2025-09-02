import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, Mail, Loader, ArrowLeft } from 'lucide-react';
import SubTitle from '../components/ui/SubTitle';

const EmailValidation = () => {
  const { token } = useParams();
  const [validationState, setValidationState] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    if (token) {
      validateEmail(token);
    } else {
      setValidationState('error');
      setMessage('Token de validation manquant.');
      setIsValidating(false);
    }
  }, [token]);

  const validateEmail = async (validationToken) => {
    try {
      setIsValidating(true);

      const response = await fetch(`https://tico.foodhea.com/api/validate-email/${validationToken}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log("🚀 ~ validateEmail ~ data:", data, response.ok);

      if (response.ok && data.success) {
        setValidationState('success');
        setMessage(data.message || 'Email validé avec succès.');
      } else {
        setValidationState('error');
        setMessage(data.message || 'Une erreur est survenue lors de la validation.');
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      setValidationState('error');
      setMessage('Une erreur de connexion est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsValidating(false);
    }
  };

  const retryValidation = () => {
    if (token) {
      setValidationState('loading');
      validateEmail(token);
    }
  };

  const getStatusIcon = () => {
    switch (validationState) {
      case 'loading':
        return <Loader className="w-16 h-16 text-[#ff8300] animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-16 h-16 text-red-600" />;
      default:
        return <Mail className="w-16 h-16 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (validationState) {
      case 'success':
        return 'from-green-50 to-blue-50 border-green-200';
      case 'error':
        return 'from-red-50 to-orange-50 border-red-200';
      default:
        return 'from-blue-50 to-orange-50 border-blue-200';
    }
  };

  const getMessageColor = () => {
    switch (validationState) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      default:
        return 'text-[#0a548d]';
    }
  };

  return (
    <>
      <div className="md:h-16 lg:h-20 h-14"></div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 min-h-screen pb-16">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <SubTitle center={true}>
            <span className="text-[#0a548d]">Validation&nbsp;</span>
            <span className="text-[#ff8300] font-bold">Compte TiCO</span>
          </SubTitle>

          <p className="mt-4 text-base sm:text-lg text-[#0a548d] max-w-2xl mx-auto leading-relaxed ArchivoLight">
            Validation de votre adresse email en cours...
          </p>
        </div>

        {/* Contenu principal */}
        <div className="max-w-2xl mx-auto">
          <div className={`bg-gradient-to-br ${getStatusColor()} p-8 sm:p-12 rounded-2xl border shadow-lg text-center`}>

            {/* Icône de statut */}
            <div className="flex justify-center mb-6">
              {getStatusIcon()}
            </div>

            {/* Message principal */}
            <div className="mb-8">
              {validationState === 'loading' ? (
                <div>
                  <h2 className="text-2xl font-bold text-[#0a548d] mb-4 Clashdisplay">
                    Validation en cours...
                  </h2>
                  <p className="text-[#0a548d] ArchivoLight">
                    Nous vérifions votre adresse email, veuillez patienter.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className={`text-2xl font-bold mb-4 Clashdisplay ${getMessageColor()}`}>
                    {validationState === 'success' ? 'Email validé !' : 'Validation échouée'}
                  </h2>
                  <p className={`text-lg ArchivoLight ${getMessageColor()}`}>
                    {message}
                  </p>
                </div>
              )}
            </div>

            {/* Actions selon le statut */}
            {validationState === 'success' && (
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="text-[#0a548d] text-sm ArchivoLight">
                    Votre compte est maintenant actif. Vous pouvez vous connecter à l'application TiCO.
                  </p>
                </div>

                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center gap-2 bg-[#0a548d] hover:bg-[#084066] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                 Page d'accueil
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            )}

            {validationState === 'error' && (
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="text-red-700 text-sm ArchivoLight">
                    Si le problème persiste, veuillez contacter notre support technique.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={retryValidation}
                    disabled={isValidating}
                    className="inline-flex items-center gap-2 bg-[#ff8300] hover:bg-[#e6750a] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidating ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Validation...
                      </>
                    ) : (
                      <>
                        Réessayer
                        <AlertCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="inline-flex items-center gap-2 bg-[#0a548d] hover:bg-[#084066] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Contacter le support
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#0a548d] mb-3 Clashdisplay">À propos de la validation</h3>
            <div className="space-y-3 ArchivoLight text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                <p>La validation de votre email est nécessaire pour activer votre compte TiCO</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                <p>Une fois validé, vous recevrez un email de confirmation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                <p>Les liens de validation expirent après 24 heures pour votre sécurité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailValidation;

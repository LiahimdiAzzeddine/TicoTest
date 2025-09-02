import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import SubTitle from '../components/ui/SubTitle';

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'invalid_token'
  const [errors, setErrors] = useState({});

  // Récupérer les paramètres de l'URL au chargement
  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      setSubmitStatus('invalid_token');
      return;
    }

    setFormData(prev => ({
      ...prev,
      email: email,
      token: token
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation nouveau mot de passe
    if (!formData.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/:.;_\-])[A-Za-z\d@$!%*?&\/:.;_\-]{8,}$/.test(formData.newPassword)) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&/:;_-)';
    }

    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation côté client
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);

    try {
      const response = await fetch('https://tico.foodhea.com/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          token: formData.token,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmPassword
        })
      });

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data, response.ok);

      if (response.ok) {
        setSubmitStatus('success');
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          navigate('/');
        }, 4000);
      } else {
        // Gérer les différents types d'erreurs du serveur
        if (response.status === 404) {
          // Lien invalide
          setSubmitStatus('invalid_token');
        } else if (response.status === 410) {
          // Token expiré
          setSubmitStatus('expired_token');
        } else if (data.errors) {
          // Erreurs de validation
          setErrors(data.errors);
        } else {
          // Autres erreurs
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  // Si le token est invalide ou manquant
  if (submitStatus === 'invalid_token' || submitStatus === 'expired_token') {
    return (
      <>
        <div className="md:h-16 lg:h-20 h-14"></div>
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 min-h-screen">
          <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-6 sm:p-8">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-red-600 mb-2">
                {submitStatus === 'expired_token' ? 'Lien expiré' : 'Lien invalide'}
              </h2>
              <p className="text-gray-600 mb-6">
                {submitStatus === 'expired_token'
                  ? 'Le lien de réinitialisation a expiré. Veuillez en demander un nouveau.'
                  : 'Lien de réinitialisation expiré ou invalide. Veuillez demander un nouveau lien de réinitialisation.'
                }
              </p>
              <button
                onClick={handleBackToLogin}

                className="w-full py-3 px-6 bg-[#0a548d] text-white rounded-xl font-medium hover:bg-[#084066] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour à la page d'accueil
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="md:h-16 lg:h-20 h-14"></div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 min-h-screen pb-16 flex flex-col items-center ">

        {/* Header */}
        <div className="text-center mb-8">
          <SubTitle center={true}>
            <span className="text-[#0a548d]">Nouveau&nbsp;</span>
            <span className="text-[#ff8300] font-bold">mot de passe</span>
          </SubTitle>

          <p className="mt-4 text-sm text-[#0a548d] ArchivoLight">
            Saisissez votre nouveau mot de passe pour <br />
            <span className="font-medium">{formData.email}</span>
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 max-w-md">

          {/* Messages de statut */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-medium">Mot de passe modifié avec succès !</p>
              </div>
              <p className="text-green-600 text-sm">
                Vous allez être redirigé vers la page de connexion dans quelques secondes...
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Erreur lors du changement</p>
                <p className="text-red-600 text-sm">Une erreur s'est produite. Veuillez réessayer.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nouveau mot de passe */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-[#0a548d] mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ${
                    errors.newPassword
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#0a548d]'
                  }`}
                  placeholder="Saisissez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.newPassword}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Au moins 8 caractères avec majuscule, minuscule, chiffre et caractère spécial
              </p>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0a548d] mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#0a548d]'
                  }`}
                  placeholder="Confirmez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Boutons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                style={{backgroundColor:'#0a548d'}}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting || submitStatus === 'success'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#0a548d] hover:bg-[#084066] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Modification en cours...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Mot de passe modifié
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Modifier le mot de passe
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full py-3 px-6 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour à la page d'accueil
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-gray-500 text-center">
            * Champs obligatoires
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, AlertCircle, User, FileText } from 'lucide-react';
import SubTitle from '../components/ui/SubTitle';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    titre: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({});

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
    
    // Validation email
    const emailRegex = /^[\w\.-]+@[a-zA-Z0-9\.-]+\.(com|ma)$/;
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'L\'email doit se terminer par .com ou .ma';
    }
    
    // Validation titre
    if (!formData.titre) {
      newErrors.titre = 'Le titre est requis';
    } else if (formData.titre.length > 255) {
      newErrors.titre = 'Le titre ne peut pas dépasser 255 caractères';
    }
    
    // Validation message
    if (!formData.message) {
      newErrors.message = 'Le message est requis';
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
      const response = await fetch('https://tico.foodhea.com/api/auth/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data,response.ok)
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ email: '', titre: '', message: '' });
      } else {
        // Gérer les erreurs de validation du serveur
        if (data.errors) {
          setErrors(data.errors);
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="md:h-16 lg:h-20 h-14"></div>
      
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 min-h-screen pb-16">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <SubTitle center={true}>
            <span className="text-[#0a548d]">Contactez&nbsp;</span>
            <span className="text-[#ff8300] font-bold">nous</span>
          </SubTitle>
          
          <p className="mt-4 text-base sm:text-lg text-[#0a548d] max-w-2xl mx-auto leading-relaxed ArchivoLight ">
            Une question, une suggestion ou besoin d'aide ? Nous sommes là pour vous accompagner dans votre expérience TiCO.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-[#0a548d] mb-4 flex items-center gap-2 Clashdisplay">
                <MessageCircle className="w-6 h-6 text-[#ff8300]" />
                Pourquoi nous contacter ?
              </h3>
              
              <div className="space-y-4 ArchivoLight">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Questions sur l'utilisation de l'application</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Signaler un problème technique</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Suggestions d'amélioration</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff8300] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Partenariats et collaborations</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a548d] mb-3">Temps de réponse</h3>
              <p className="text-gray-600 text-sm ArchivoLight">
                Nous nous engageons à vous répondre dans les <span className="font-semibold text-[#ff8300]">24 heures</span> suivant la réception de votre message.
              </p>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
            
            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Message envoyé avec succès !</p>
                  <p className="text-green-600 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Erreur lors de l'envoi</p>
                  <p className="text-red-600 text-sm">Veuillez vérifier vos informations et réessayer.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0a548d] mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#0a548d]'
                  }`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Titre */}
              <div>
                <label htmlFor="titre" className="block text-sm font-medium text-[#0a548d] mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Sujet de votre message *
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  maxLength={255}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ${
                    errors.titre 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#0a548d]'
                  }`}
                  placeholder="Question sur l'application, bug signalé, suggestion..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.titre ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.titre}
                    </p>
                  ) : (
                    <div></div>
                  )}
                  <p className="text-xs text-gray-500">{formData.titre.length}/255</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#0a548d] mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Votre message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-vertical ${
                    errors.message 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#0a548d]'
                  }`}
                  placeholder="Décrivez votre question, problème ou suggestion en détail..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{backgroundColor:'#0a548d'}}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#0a548d] hover:bg-[#084066] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-500 text-center">
              * Champs obligatoires
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
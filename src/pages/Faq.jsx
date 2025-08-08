import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import SubTitle from '../components/ui/SubTitle';
import { Search, MessageCircle, ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://tico.foodhea.com/api/faqs/dash')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFaqs(data.data);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Fonction pour nettoyer le HTML et décoder les caractères
  const cleanText = (htmlString) => {
    if (!htmlString) return '';

    // Décoder les caractères HTML encodés
    const decoded = htmlString
      .replace(/\\u([0-9a-fA-F]{4})/g, (match, code) =>
        String.fromCharCode(parseInt(code, 16))
      )
      .replace(/\\\//g, '/'); // Décoder les slashes échappés

    // Créer un élément temporaire pour extraire le texte sans HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = decoded;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Filtrage amélioré qui recherche dans la question ET la réponse
  const filteredFaqs = faqs.filter(faq => {
    const searchTerm = search.toLowerCase().trim();
    if (!searchTerm) return true;

    const questionText = cleanText(faq.question).toLowerCase();
    return questionText.includes(searchTerm);
  });

  const toggle = index => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Fonction pour rechercher (optionnelle, si vous voulez garder le bouton)
  const handleSearch = () => {
    console.log('Recherche pour:', search);
  };

  return (
    <>
      <div className="md:h-16 lg:h-20 h-14"></div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 min-h-screen pb-16">
        
        {/* Header avec titre et description */}
        <div className="text-center mb-8 sm:mb-12">
          <SubTitle center={true}>
            <span className="text-[#0a548d]">Foire aux&nbsp;</span>
            <span className="text-[#ff8300] font-bold">questions</span>
          </SubTitle>
          
          <p className="mt-4 text-base sm:text-lg text-[#0a548d] max-w-2xl mx-auto leading-relaxed ArchivoLight">
            Trouvez rapidement les réponses à vos questions les plus fréquentes sur TiCO
          </p>
        </div>

        {/* Barre de recherche améliorée */}
        <div className="mb-8 sm:mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a548d] transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full h-12 sm:h-14 pl-12 pr-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0a548d] transition-all duration-300 text-base placeholder-gray-400 shadow-sm hover:shadow-md"
                placeholder="Rechercher dans les questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Message d'aide avec design amélioré */}
        <div className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <HelpCircle className="w-5 h-5 text-[#0a548d]" />
            </div>
            <div>
              <p className="text-[#0a548d] font-medium mb-2">
                Vous ne trouvez pas la réponse à votre question ?
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Posez-la nous directement via notre{' '}
                <Link 
                  to={"/contact"}
                  className="text-[#ff8300] hover:text-[#e6750a] font-medium underline decoration-2 underline-offset-2 hover:underline-offset-4 transition-all duration-200"
                >
                  formulaire de contact
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Résultats de recherche */}
        {search && (
          <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm sm:text-base text-[#0a548d] font-medium">
              <span className="inline-flex items-center gap-2">
                <Search className="w-4 h-4" />
                {filteredFaqs.length} résultat(s) trouvé(s) pour "{search}"
              </span>
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-[#0a548d]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0a548d]"></div>
              <span>Chargement des questions...</span>
            </div>
          </div>
        ) : (
          /* Liste des questions avec design amélioré */
          <div className="space-y-3 sm:space-y-4">
            {filteredFaqs.length === 0 && search ? (
              <div className="text-center py-12 px-4">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-[#0a548d] mb-2">
                    Aucune question trouvée
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Essayez avec d'autres mots-clés ou contactez-nous directement.
                  </p>
                  <button
                    onClick={() => setSearch('')}
                    className="px-4 py-2 bg-[#0a548d] text-white rounded-lg hover:bg-[#084066] transition-colors"
                  >
                    Effacer la recherche
                  </button>
                </div>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Titre de la question */}
                  <div
                    className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors group"
                    onClick={() => toggle(index)}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-medium text-[#0a548d] leading-relaxed group-hover:text-[#084066] transition-colors">
                          {parse(faq.question)}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full bg-[#ff8300] bg-opacity-10 flex items-center justify-center transition-all duration-300 ${
                            activeIndex === index ? 'rotate-180 bg-opacity-20' : 'group-hover:bg-opacity-20'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4 text-[#ff8300]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenu de la réponse (affiché si actif) */}
                  {activeIndex === index && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 bg-gradient-to-r from-blue-50/30 to-orange-50/30">
                      <div className="pt-4 sm:pt-6">
                        <div className="prose prose-sm sm:prose-base max-w-none text-[#0a548d] leading-relaxed">
                          {parse(faq.answer)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Faq;
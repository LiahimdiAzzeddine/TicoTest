import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TitleSection from '../ui/TitleSection';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedText, setExpandedText] = useState({});

  // Données des témoignages
  const testimonials = [ {
      id: 1,
      name: "Matthieu​",
     text: "TiCO est l'application qui manquait. Enfin une solution qui ne se contente pas d'un score simpliste mais qui pousse les marques à dévoiler toutes les informations sur leurs produits. Très beau projet !\u00A0PS:\u00A0j'ai\u00A0appris que je ne faisais pas bien cuire les pâtes\u00A0😅 Merci les ti conseils👍🏼",
      avatar: "/images/Matthieu.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    },
    {
      id: 2,
      name: "Perline",
      text: "Je suis noyée dans le marketing, je ne sais plus ce que je dois croire. TiCO permet enfin d'accéder à une transparence totale sur les produits et les marques. Pour moi, c'est indispensable si on veut améliorer les choses.​",
      avatar: "/images/Perline.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    },
    {
      id: 3,
      name: "Solenne",
      text: "TiCO est une vraie révolution pour l'information alimentaire. En demandant toutes les infos les marques sont obligées de devenir transparence, l'application nous donne un vrai pouvoir. J'ai déjà fait 72 demandes et j'ai hâte de voir le comportement des marques!​",
      avatar: "/images/Solenne.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    },
    {
      id: 4,
      name: "Émilie",
      text: "Oui on veut plus de clarté, et TiCO nous offre une solution concrète. Ce n'est plus aux marques de décider ce qu'elles veulent bien nous dire, c'est à nous d'exiger qu'elles rendent des comptes. Et pour les recettes j'adore pouvoir garder les ingrédients à l'œil pendant que je cuisine ça change tout! ​​",
      avatar: "/images/Émilie.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    },
    {
      id: 5,
      name: "Benjamin",
      text: "Les marques manquent de transparence, je n'ai plus confiance. TiCO permet de remettre la vérité au centre du débat et pousse les marques à s'engager sincèrement. Bravo c'est une super initiative!​​",
      avatar: "/images/Benjamin.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    // Reset expanded text when changing slide
    setExpandedText({});
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    // Reset expanded text when changing slide
    setExpandedText({});
  };

  const currentTestimonial = testimonials[currentSlide];

  // Function to determine if text should be truncated (more than ~150 characters)
  const shouldTruncateText = (text) => {
    return text.length > 241;
  };

  // Function to get truncated text (first ~120 characters, ending at last complete word)
  const getTruncatedText = (text) => {
    if (text.length <=240) return text;
    const truncated = text.substring(0, 240);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpaceIndex) + '...';
  };

  const toggleTextExpansion = (testimonialId) => {
    setExpandedText(prev => ({
      ...prev,
      [testimonialId]: !prev[testimonialId]
    }));
  };

  const isTextExpanded = expandedText[currentTestimonial.id] || false;
  const shouldShowReadMore = shouldTruncateText(currentTestimonial.text);
  const displayText = shouldShowReadMore && !isTextExpanded 
    ? getTruncatedText(currentTestimonial.text)
    : currentTestimonial.text;

  return (
    <div className="w-full max-w-6xl flex flex-col justify-center items-center md:items-start gap-8 md:gap-24">
      <TitleSection center={false}>
        <div className="leading-none md:leading-tight ">
          Rejoignez les <span className='text-[#ff8200]'>consommateurs engagés</span>
        </div>
      </TitleSection>
      <div className='flex flex-col justify-center items-center w-full'>
        {/* Container principal responsive */}
        <div className='flex flex-col justify-between h-full max-w-6xl'>
          <div className="relative overflow-visible">
            {/* Fond avec image - hauteur responsive */}
            <div
              className={`relative rounded-2xl sm:rounded-3xl h-full md:h-[390px] w-full flex items-center
    bg-[#d9f2f2] md:bg-transparent`}
              style={{
                backgroundImage: typeof window !== 'undefined' && window.innerWidth >= 768
                  ? `url(${currentTestimonial.backgroundImage})`
                  : 'none',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >

              {/* Overlay léger */}
              <div className="absolute inset-0 bg-opacity-10 rounded-2xl md:rounded-3xl"></div>

              {/* Layout responsive pour mobile vs desktop */}
              <div className="relative z-10 w-full h-full">

                {/* Layout Mobile (md et moins) */}
                <div className="md:hidden px-6 py-6 h-full flex flex-col">
                  {/* Avatar et nom en haut - hauteur fixe */}
                  <div className="flex items-center justify-center mb-4 h-20 flex-shrink-0">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-auto h-24 sm:h-20 mr-4 flex-shrink-0"
                    />
                    <h3 className="text-xl ClashDisplayBold text-[#0a548d] leading-tight">
                      {currentTestimonial.name}
                    </h3>
                  </div>

                  {/* Texte centré - hauteur flexible */}
                  <div className="flex-1 flex flex-col justify-center items-center px-2">
                    <div className="w-full max-w-sm">
                      <p className="text-base italic text-[#0a548d] ArchivoLight text-center font-medium hyphens-auto break-words">
                        {displayText}
                      </p>
                      
                      {/* Bouton Lire la suite/Réduire */}
                      {shouldShowReadMore && (
                        <div className="flex justify-center mt-3">
                          <button
                            onClick={() => toggleTextExpansion(currentTestimonial.id)}
                            className="text-sm text-[#ff8200] hover:text-[#e6740d] font-semibold transition-colors duration-200 underline underline-offset-2 hover:underline-offset-4"
                          >
                            {isTextExpanded ? 'Réduire' : 'Lire la suite'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Layout Desktop (md et plus) */}
                <div className="hidden md:block px-12 py-8 h-full">
                  <div className="flex items-center justify-center h-full">
                    {/* Contenu central */}
                    <div className="flex-1 mx-4 md:mx-8">
                      <div className="w-full h-48 md:h-56 flex items-center justify-center">
                        <div className="text-start max-w-2xl md:max-w-3xl h-full flex items-center">
                          <p className="text-base md:text-lg italic text-[#0a548d] leading-relaxed font-bold line-clamp-4 md:line-clamp-4 ArchivoLight">
                            {currentTestimonial.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar et nom positionnés en haut à droite (desktop uniquement) */}
                  <div className="absolute -top-12 md:-top-11 right-12 z-30 flex items-end gap-2 md:gap-3">
                    <h3 className="text-xl md:text-2xl ClashDisplayBold text-[#0a548d] mb-4 md:mb-7">
                      {currentTestimonial.name}
                    </h3>
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-32 h-32 md:h-44 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Flèches de navigation - Desktop uniquement */}
              <button
                onClick={prevSlide}
                className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:-translate-x-1" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Navigation mobile */}
            <div className="flex justify-center md:hidden mt-6 space-x-4">
              <button
                onClick={prevSlide}
                className="flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Indicateurs de pagination */}
            <div className="flex justify-center mt-6 md:-mt-4 space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-300 rounded-full ${i === currentSlide
                    ? "w-8 h-3 bg-[#0a548d] shadow-lg"
                    : "w-3 h-3 bg-[#5ca5dc] hover:bg-[#5e96c0]"
                  }`}
                  aria-label={`Aller au témoignage ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation au clavier */}
        <div className="sr-only">
          Utilisez les flèches gauche et droite pour naviguer entre les témoignages
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
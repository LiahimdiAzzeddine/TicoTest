import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TitleSection from '../ui/TitleSection';



const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Données des témoignages
  const testimonials = [ {
      id: 1,
      name: "Matthieu​",
      text: "TiCO est l’application qui manquait. Enfin une solution qui ne se contente pas d’un score simpliste mais qui pousse les marques à dévoiler toutes les informations sur leurs produits. Très beau projet ! ​PS: j’ai appris que je ne faisais pas bien cuire les pâtes 😅  Merci les ti conseils 👍🏼",
      avatar: "/images/Matthieu.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    },
    {
      id: 2,
      name: "Perline",
      text: "Je suis noyée dans le marketing, je ne sais plus ce que je dois croire. TiCO permet enfin d’accéder à une transparence totale sur les produits et les marques. Pour moi, c’est indispensable si on veut améliorer les choses.​",
      avatar: "/images/Perline.png", // Remplacez par votre image
      backgroundImage: "/images/visuels-site-web-V8.1-10.png" // Remplacez par votre image de fond
    },

    {
      id: 3,
      name: "Solenne",
      text: "TiCO est une vraie révolution pour l’information alimentaire. En demandant toutes les infos les marques sont obligées de devenir transparence, l’application nous donne un vrai pouvoir. J’ai déjà fait 72 demandes et j’ai hâte de voir le comportement des marques !​",
      avatar: "/images/Solenne.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    },
    {
      id: 4,
      name: "Émilie",
      text: "Oui on veut plus de clarté, et TiCO nous offre une solution concrète. Ce n’est plus aux marques de décider ce qu’elles veulent bien nous dire, c’est à nous d’exiger qu’elles rendent des comptes. Et pour les recettes j’adore pouvoir garder les ingrédients à l’œil pendant que je cuisine ça change tout ! ​​",
      avatar: "/images/Émilie.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    }
    ,
    {
      id: 5,
      name: "Benjamin",
      text: "Les marques manquent de transparence, je n’ai plus confiance. TiCO permet de remettre la vérité au centre du débat et pousse les marques à s’engager sincèrement. Bravo c’est une super initiative ! ​​",
      avatar: "/images/Benjamin.png",
      backgroundImage: "/images/visuels-site-web-V8.1-10.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <div className="w-full max-w-6xl flex flex-col justify-center items-center md:items-start gap-8 md:gap-20">
      <TitleSection center={false}>
        <div className="leading-none md:leading-tight ">
          Rejoignez les consommateurs engagés
        </div>
      </TitleSection>
      <div className=' flex flex-col justify-center items-center w-full'>
        {/* Container principal responsive */}
        <div className='flex flex-col justify-between h-full max-w-4xl'>
          <div className="relative overflow-visible">
            {/* Fond avec image - hauteur responsive */}
            <div
              className={`relative rounded-2xl sm:rounded-3xl h-full md:h-[450px] w-full flex items-center
    bg-[#d9f2f2] md:bg-transparent`}
              style={{
                backgroundImage: window.innerWidth >= 768
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
                <div className="md:hidden px-4 py-6 h-full flex flex-col">
                  {/* Avatar et nom en haut - hauteur fixe */}
                  <div className="flex items-center justify-center mb-1 h-20 md:h-24 flex-shrink-0">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-auto h-24 mr-3"
                    />
                    <h3 className="text-xl lg:text-2xl ClashDisplayBold text-[#0a548d] ">
                      {currentTestimonial.name}
                    </h3>
                  </div>

                  {/* Texte centré - hauteur flexible mais contenue */}
                  <div className="flex-1 flex items-center justify-center px-2 min-h-[160px] md:min-h-[180px]">
                    <div className="h-full flex items-center">
                      <p className="text-sm sm:text-base italic text-[#0a548d] leading-relaxed text-center font-medium line-clamp-6">
                        {currentTestimonial.text}
                      </p>
                    </div>
                  </div>

                  {/* Navigation en bas - hauteur fixe */}
                  <div className="flex justify-between items-center mt-1 h-12 flex-shrink-0">
                    <button
                      onClick={prevSlide}
                      className="p-2 transition-colors duration-200"
                      aria-label="Témoignage précédent"
                    >
                      <ChevronLeft className="w-8 h-8 text-teal-600" />
                    </button>

                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentSlide
                            ? 'bg-teal-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          aria-label={`Aller au témoignage ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="p-2 transition-colors duration-200"
                      aria-label="Témoignage suivant"
                    >
                      <ChevronRight className="w-8 h-8 text-teal-600" />
                    </button>
                  </div>
                </div>

                {/* Layout Desktop (md et plus) */}
                <div className="hidden md:block px-12 py-8 h-full">
                  <div className="flex items-center justify-between h-full">
                    {/* Bouton précédent */}
                    <button
                      onClick={prevSlide}
                      className="p-3 transition-colors duration-200 z-20 flex-shrink-0"
                      aria-label="Témoignage précédent"
                    >
                      <ChevronLeft className="w-10 h-10 md:w-12 lg:h-12 text-teal-600" />
                    </button>

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

                    {/* Bouton suivant */}
                    <button
                      onClick={nextSlide}
                      className="p-3 transition-colors duration-200 z-20 flex-shrink-0"
                      aria-label="Témoignage suivant"
                    >
                      <ChevronRight className="w-10 h-10 md:w-12 lg:h-12 text-teal-600" />
                    </button>
                  </div>

                  {/* Avatar et nom positionnés en haut à droite (desktop uniquement) */}
                  <div className="absolute -top-12 md:-top-5 right-2 z-30 flex items-end gap-2 md:gap-3">
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
            </div>

            {/* Indicateurs de pagination (desktop uniquement)
          <div className="hidden md:flex justify-center -mt-2 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide
                    ? 'bg-teal-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div> */}
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

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TeacherTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const testimonials = [
    {
      name: "Charlotte",
      role: "Maîtresse de CM2",
      text: "Le kit est très bien conçu et facile à mettre en application, c'est un investissement qui vaut le coup car une fois qu'on l'a on peut l'utiliser d'année en année ! Les élèves ont passé de super moments et ça permet d'aborder l'alimentation sous un angle à la fois nouveau et nécessaire."
    },
    {
      name: "Benoit",
      role: " Maître de CM1",
      text: "L'alimentation est un sujet essentiel, les activités proposées sortent des sentiers battus et mes élèves ont adorés ! Ça me donne envie de leur faire des dégustations comparatives plusieurs fois dans l'année. J'attends les extensions avec impatience !"
    },

  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Distance minimale pour considérer un swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="w-full bg-white max-w-6xl">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-2xl md:text-2xl font-bold text-center mb-4 md:mb-4" style={{ color: '#FF8C00' }}>
          Ce qu'en pense les enseignants :
        </h2>

        <div 
          className="relative flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Bouton Précédent */}
       
          <button
            onClick={prevSlide}
            className="absolute -left-5 z-10 flex items-center justify-center transition-transform hover:scale-110 w-12 h-24 md:w-24 md:h-48"
            aria-label="Témoignage précédent"
          >
            <svg width="70" height="140" viewBox="0 0 70 140" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>
              <path d="M 45 45 L 25 70 L 45 95" stroke="#FF8C00" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Contenu du témoignage */}
          <div className="px-10 md:px-4 md:mx-24 w-full">
            <div className="text-center">
              
              <p className="text-sm md:text-lg text-[#0a548d] ArchivoLight leading-tight text-center" >
                 <span className="text-sm md:text-lg font-bold">
                  {testimonials[currentIndex].name}, {testimonials[currentIndex].role} :{' '}
                </span>{testimonials[currentIndex].text}
              </p>
            </div>
          </div>

          {/* Bouton Suivant */}
           <button
            onClick={nextSlide}
            
            className="absolute -right-5 z-10 flex items-center justify-center transition-transform hover:scale-110 w-12 h-24 md:w-24 md:h-48 "
            aria-label="Témoignage suivant"
          >
            <svg width="70" height="140" viewBox="0 0 70 140" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>
              <path d="M 25 45 L 45 70 L 25 95" stroke="#FF8C00" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
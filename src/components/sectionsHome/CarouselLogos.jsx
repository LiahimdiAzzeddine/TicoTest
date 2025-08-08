import React, { useRef, useState, useEffect, useCallback } from "react";
import TitleSection from "../ui/TitleSection";

const logos = [
  { href: "https://www.gs1.fr/", img: "/images/gs1france.jpg", alt: "GS1 France" },
  { href: "https://www.aria-nouvelle-aquitaine.com/", img: "/images/ariana.png", alt: "ARIA Nouvelle-Aquitaine" },
  { href: "https://bleu-blanc-coeur.org/", img: "/images/bleublanccoeur.png", alt: "Bleu Blanc Coeur" },
  { href: "https://www.reforestaction.com/", img: "/images/reforestaction.png", alt: "Reforestaction" },
  { href: "https://demainlaterre.org/qui-sommes-nous/", img: "/images/dlt_logo_asso.png", alt: "Demain la Terre" },
  { href: "https://www.bpifrance.fr/", img: "/images/BPI.png", alt: "BPI France" },
  { href: "https://www.technopolegrandpoitiers.com/", img: "/images/technopolepoitiers.png", alt: "Technopole Poitiers" },
  { href: "https://www.reseau-entreprendre.org/poitou-charentes/", img: "/images/rena.png", alt: "Réseau Entreprendre" },
];

export function CarouselLogos() {
  const [currentIndex, setCurrentIndex] = useState(3); // Commencer au premier vrai logo
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3); // Responsive
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Détecter la taille d'écran
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 logo
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablette: 2 logos
      } else {
        setItemsPerView(3); // Desktop: 3 logos
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Créer le tableau infini en fonction du nombre d'éléments visibles
  const extendedLogos = [
    ...logos.slice(-itemsPerView), // Derniers logos
    ...logos,                      // Tous les logos originaux
    ...logos.slice(0, itemsPerView) // Premiers logos
  ];

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    autoPlayRef.current = setInterval(() => {
      if (!isPaused && isAutoPlaying) {
        setIsTransitioning(true);
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex >= logos.length + itemsPerView) {
            setTimeout(() => {
              setIsTransitioning(false);
              setCurrentIndex(itemsPerView);
            }, 300);
            return nextIndex;
          } else {
            setTimeout(() => setIsTransitioning(false), 300);
            return nextIndex;
          }
        });
      }
    }, 3000); // Change toutes les 3 secondes
  }, [isPaused, isAutoPlaying, itemsPerView]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Reprend après 5 secondes d'inactivité
  }, []);

  // Démarrer l'auto-play au montage
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay, isAutoPlaying]);

  // Redémarrer l'auto-play quand les paramètres changent
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      startAutoPlay();
    }
  }, [startAutoPlay, isAutoPlaying, isPaused]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    // Si on dépasse, revenir au début sans animation
    if (nextIndex >= logos.length + itemsPerView) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(itemsPerView); // Revenir au premier vrai logo
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, isTransitioning, itemsPerView]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);

    // Si on va trop loin, aller à la fin sans animation
    if (prevIndex < itemsPerView) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(logos.length + itemsPerView - 1); // Dernier vrai logo
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, isTransitioning, itemsPerView]);

  // Gestion du swipe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let isDragging = false;

    const handleStart = (clientX) => {
      startX = clientX;
      isDragging = true;
    };

    const handleEnd = (clientX) => {
      if (!isDragging) return;

      const diff = startX - clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      isDragging = false;
    };

    // Touch events
    const onTouchStart = (e) => handleStart(e.touches[0].clientX);
    const onTouchEnd = (e) => handleEnd(e.changedTouches[0].clientX);

    // Mouse events
    const onMouseDown = (e) => {
      e.preventDefault();
      handleStart(e.clientX);
    };
    const onMouseUp = (e) => handleEnd(e.clientX);

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleNext, handlePrev]);

return (
  <div className="w-full flex flex-col items-center justify-center gap-8 md:gap-16 bg-white max-w-6xl">
    <TitleSection center={false}>
      <div className="leading-none md:leading-tight">
        Ils croient en la transparence
      </div>
    </TitleSection>
    <div className="flex flex-col items-center justify-center gap-0">
      <div className="relative md:w-full w-11/12 max-w-6xl">
        {/* Flèche gauche */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-1 sm:left-2 lg:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#12727d] text-white p-2 sm:p-3 rounded-full shadow hover:bg-[#0e5a60] transition disabled:opacity-50"
          aria-label="Précédent"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Conteneur du carousel avec min-height */}
        <div
          ref={containerRef}
          className="overflow-hidden mx-8 sm:mx-10 lg:mx-12 cursor-grab active:cursor-grabbing min-h-[150px]"
        >
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
            }}
          >
            {extendedLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className={`flex-shrink-0 px-2 sm:px-4 py-4 sm:py-6 flex justify-center items-center ${
                  itemsPerView === 1 ? 'w-full' :
                  itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                }`}
              >
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-[150px] sm:max-w-[180px] lg:max-w-[200px] transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#12727d] focus:ring-offset-2 rounded-lg"
                  onDragStart={(e) => e.preventDefault()}
                >
                  <img
                    src={logo.img}
                    alt={logo.alt}
                    className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    draggable={false}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Flèche droite */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-1 sm:right-2 lg:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#12727d] text-white p-2 sm:p-3 rounded-full shadow hover:bg-[#0e5a60] transition disabled:opacity-50"
          aria-label="Suivant"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Indicateurs */}
      <div className="flex space-x-1 sm:space-x-2 mt-1 sm:mt-2">
        {logos.map((_, i) => {
          const realIndex = (currentIndex - itemsPerView + logos.length) % logos.length;
          const isActive = realIndex === i;

          return (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(i + itemsPerView);
                setTimeout(() => setIsTransitioning(false), 300);
              }}
              className={`h-2 rounded-full transition-all duration-200 ${isActive
                ? 'bg-[#12727d] w-4 sm:w-6'
                : 'bg-gray-300 hover:bg-gray-400 w-2'
              }`}
              aria-label={`Aller au logo ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  </div>
);

}
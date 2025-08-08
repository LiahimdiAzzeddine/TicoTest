import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import TitleSection from "../ui/TitleSection";

const testimonials = [
  {
    name: "Stéphane DOUENCE",
    title: "Président de l'ARIA Nouvelle Aquitaine, Directeur Général de VINAIGRERIE GÉNÉRALE",
    image: "/images/stephanedouence.png",
    text: `À l'ARIA, nous n'avons de cesse d'accompagner au mieux les entreprises agro-alimentaires dans leur développement. Dans ce contexte, proposer une communication digitale clé en main, permettant de valoriser les produits et de créer du lien avec le consommateur, représente une réelle valeur ajoutée pour nos adhérents. FOODHEA répond parfaitement à ces attentes avec une solution innovante et accessible.`,
  },
  {
    name: "Christophe CORTÈS",
    title: "Président de NATURAE FRANCE",
    image: "/images/christophecortes.png",
    text: `FOODHEA est l'outil parfait pour expliquer le produit au-delà des contraintes de place sur l'emballage. Nos consommateurs peuvent enfin découvrir l'histoire, les valeurs et la qualité de nos produits bio. La plateforme nous permet de créer une véritable connexion émotionnelle avec nos clients. Cerise sur le gâteau, l'équipe est dynamique et toujours à l'écoute de nos besoins !`,
  },
  {
    name: "Laurent DULAU",
    title: "Président du Réseau des ARIA de France, Vice-président de l'ARIA Nouvelle Aquitaine, Directeur Général de KAVIAR",
    image: "/images/laurentdulau.png",
    text: `Après avoir vu se développer de nombreuses solutions dans le digital alimentaire, je suis convaincu de l'intérêt de FOODHEA. Cette plateforme offre une approche unique qui répond aux vrais besoins des entreprises agroalimentaires. Elle permet de valoriser le savoir-faire français et de créer une transparence appréciée des consommateurs. Un outil indispensable pour l'avenir de notre secteur.`,
  },
];

const CarouselTestimonials = () => {
  const [index, setIndex] = useState(0);
  const [expandedTexts, setExpandedTexts] = useState({});

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const toggleTextExpansion = (testimonialIndex) => {
    setExpandedTexts(prev => ({
      ...prev,
      [testimonialIndex]: !prev[testimonialIndex]
    }));
  };

  const isExpanded = expandedTexts[index];
  const currentTestimonial = testimonials[index];

  return (
    <div className="flex flex-col text-center max-w-6xl mx-auto gap-8 md:gap-16">

      <TitleSection center={true}>
        <div className="leading-none md:leading-tight">
          Témoignages de pro
        </div>
      </TitleSection>
      
      <div className="flex flex-col items-center ">
        <div className="relative w-full ">
          {/* Carte principale */}
          <div
            className="relative px-6 py-8 min-h-[400px] rounded-2xl w-full flex flex-col md:flex-row items-center justify-center md:px-9 bg-[#d9f2f2] md:bg-transparent shadow-lg md:shadow-none"
            style={{
              backgroundImage: typeof window !== 'undefined' && window.innerWidth >= 768
                ? `url("/images/visuels-site-web-V8.1-10.png")`
                : 'none',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >

            {/* Image */}
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 ">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-full object-cover shadow-xl ring-4 ring-[#7abcee] transition-all duration-500 hover:ring-6 hover:ring-[#0a548d] hover:shadow-2xl hover:scale-105 mx-auto"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&size=400&background=0d9488&color=ffffff&bold=true`;
                }}
              />
            </div>

            {/* Contenu textuel */}
            <div className="text-center md:text-left max-w-none md:max-w-lg lg:max-w-xl xl:max-w-2xl flex-1">
              <h3 className="text-xl lg:text-2xl ClashDisplayBold text-[#0a548d] mb-2  leading-tight">
                {currentTestimonial.name}
              </h3>
              <h4 className="text-base md:text-lg text-[#0a548d] mb-3 md:mb-1 leading-normal ArchivoLight italic px-2 md:px-0">
                {currentTestimonial.title}
              </h4>

              {/* Texte avec expansion */}
              <div className="relative">
                <p className={`text-[#0a548d] text-base  md:text-lg italic leading-normal md:leading-normal transition-all duration-500 ArchivoLight font-bold px-2 md:px-0 ${
                  isExpanded ? '' : 'line-clamp-4 md:line-clamp-3'
                }`}>
                  {currentTestimonial.text}
                </p>

                {/* Bouton pour expand/collapse */}
                <button
                  onClick={() => toggleTextExpansion(index)}
                  className="inline-flex items-center mt-2 md:mt-1 text-[#0a548d] hover:text-[#083d5c] font-medium transition-all duration-300 group hover:scale-105"
                >
                  {isExpanded ? (
                    <>
                      <span className="mr-2 ArchivoLight font-thin italic text-sm md:text-base">Voir moins</span>
                      <ChevronUp className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                    </>
                  ) : (
                    <>
                      <span className="mr-2 ArchivoLight font-thin italic text-sm md:text-base">Lire la suite</span>
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-y-1" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Flèches de navigation - Desktop uniquement */}
            <button
              onClick={handlePrev}
              className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Navigation mobile */}
          <div className="flex justify-center md:hidden mt-6 space-x-4">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg transition-all duration-300 border border-blue-100 hover:border-[#0a548d] group"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6 text-[#0a548d] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center mt-6 md:-mt-4 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === index
                ? "w-8 h-3 bg-[#0a548d] shadow-lg"
                : "w-3 h-3 bg-[#5ca5dc] hover:bg-[#5e96c0]"
              }`}
              aria-label={`Aller au témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselTestimonials;
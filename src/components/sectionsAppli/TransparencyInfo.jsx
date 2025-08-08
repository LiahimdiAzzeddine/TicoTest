import React, { useRef, useState } from "react";
import StepTitle from "../ui/StepTitle";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const infoItems = [
  {
    title: "Impact environnemental",
    description:
      "L'alimentation est responsable de 22 % des émissions de gaz à effet de serre, 30 % de la consommation énergétique mondiale et contribue significativement à l'utilisation des sols et de l'eau. Le référentiel qui semble le plus qualitatif pour évaluer l'impact environnemental est le Planet-Score. C'est pourquoi nous attendons des marques qu'elles évaluent leurs produits selon ce référentiel.",
  },
  {
    title: "Bien être animal",
    description:
      "L'élevage intensif pose de nombreux problèmes éthiques et environnementaux. Des labels comme le Label Rouge ou Bleu-Blanc-Coeur garantissent de meilleures conditions. Il est essentiel que les marques s'engagent pour un élevage plus respectueux.",
  },
  {
    title: "Origines",
    description:
      "Savoir d'où viennent nos aliments est un enjeu clé pour choisir en pleine conscience. L'origine des matières premières influence notamment la qualité, l'impact environnemental et le soutien aux producteurs locaux.",
  },
  {
    title: "Emballage",
    description:
      "Les emballages alimentaires génèrent une quantité massive de déchets. L'utilisation de matériaux recyclables ou compostables est essentielle pour réduire l'empreinte écologique. Un bon packaging doit être à la fois écologique et informatif.",
  },
  {
    title: "Détails des labels",
    description:
      "Les labels sont nombreux, mais tous ne se valent pas. Certains garantissent un vrai engagement environnemental ou social, tandis que d'autres sont plus marketing que réellement contraignants. Il est crucial de bien les décrypter pour faire les bons choix.",
  },
  {
    title: "Détails des mentions",
    description:
      "Des termes comme 'naturel', 'artisanal' ou 'traditionnel' sont souvent trompeurs. Ils ne garantissent pas toujours une meilleure qualité ou composition. Il faut aller au-delà des slogans et analyser les ingrédients et labels présents sur le produit.",
  },
  {
    title: "Juste rémunération des producteurs",
    description:
      "Derrière chaque produit, il y a des agriculteurs et des artisans. Un commerce équitable et une juste rémunération assurent leur pérennité. Des labels comme Fairtrade ou Bio Équitable garantissent une meilleure redistribution de la valeur. Il n'existe pas de référentiel sur le sujet mais nous travaillons pour vous informer sur ce point crucial !",
  },
  {
    title: "Profil nutritionnel",
    description:
      "Comprendre le profil nutritionnel au 100g et à la portion est important pour adapter et équilibrer son alimentation. Trop de sucre, de sel ou de mauvaises graisses impacte la santé. Le Nutriscore est un bon repère avec nos décryptages plus de doute à avoir.",
  },
  {
    title: "Additifs",
    description:
      "Colorants, conservateurs, exhausteurs de goût… Tous les additifs ne sont pas mauvais, mais certains sont controversés. Comprendre leur rôle et leurs risques est indispensable pour faire des choix plus sains. L'idéal ? Moins d'additifs et plus de naturel. Nous reprenons notamment le travail réalisé par UFC Que Choisir.",
  },
  {
    title: "Allergènes",
    description:
      "Gluten, lactose, fruits à coque… Les allergènes doivent être clairement indiqués pour éviter tout risque. Une bonne signalétique et une information transparente sont essentielles pour les consommateurs concernés. Les bases de données manquent de fiabilité sur le sujet, c'est pourquoi il est important de travailler avec les marques directement !",
  },
  {
    title: "Naturalité des ingrédients",
    description:
      "Moins il y a d'ingrédients ultra-transformés, mieux c'est ! Un produit avec une liste courte et compréhensible est souvent plus sain. Nous travaillons selon le cahier des charges Goûm pour vous informer sur la naturalité des ingrédients. Ciblez ceux qui sont conformes au cahier des charges.",
  },
];
const TransparencyInfo = () => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // Default to first item

  const scrollToCenter = (index) => {
    const container = listRef.current;
    const element = container?.children[index];

    if (container && element) {
      const containerHeight = container.clientHeight;
      const elementOffsetTop = element.offsetTop;
      const elementHeight = element.offsetHeight;

      container.scrollTo({
        top: elementOffsetTop - containerHeight / 2 + elementHeight / 2,
        behavior: "smooth",
      });
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    scrollToCenter(index);
  };

  const scroll = (direction) => {
    if (direction === "up" && selectedIndex > 0) {
      handleSelect(selectedIndex - 1);
    } else if (direction === "down" && selectedIndex < infoItems.length - 1) {
      handleSelect(selectedIndex + 1);
    }
  };

  // Get the currently selected item
  const selectedItem = infoItems[selectedIndex];

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 md:gap-14">
      <StepTitle center={false}>
        <span className="text-[#0a548d]">Transparence &nbsp;</span>
        <span className="text-[#ff8300] font-bold">TiCO</span>
      </StepTitle>

      <div className="flex flex-col-reverse lg:flex-row items-start justify-between w-full gap-6 lg:gap-8">
        {/* Left content - Dynamic information display */}
        <div className="w-full flex-1 order-2 lg:order-1">
          <div
            className="relative w-full text-[#0a548d] leading-relaxed px-3 sm:p-5 min-h-[250px] sm:min-h-[280px]"
            style={{
              backgroundImage: typeof window !== 'undefined' && window.innerWidth >= 768
                ? `url("/images/bgAppli1.png")`
                : 'none',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Selected item title */}
            <h2 className="text-xl font-bold mb-3 sm:mb-4 text-[#ff8300] border-b-2 border-[#ff8300] pb-2">
              {selectedItem.title}
            </h2>

            {/* Selected item description */}
            <div className="space-y-3">
              <p className="font-medium Archivo text-base leading-relaxed">
                {selectedItem.description}
              </p>

              {/* Additional styling for Planet-Score link if it's the first item */}
              {selectedIndex === 0 && (
                <div className="mt-3 p-3 bg-[#ffe5b4] rounded-lg border-l-4 border-[#ff8300]">
                  <p className="text-xs sm:text-sm">
                    <strong>Focus :</strong> Le{" "}
                    <a href="#" className="font-bold underline text-[#0a548d] hover:text-[#ff8300] transition-colors">
                      Planet-Score
                    </a>{" "}
                    est notre référentiel de choix pour une évaluation complète.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation hint */}
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {selectedIndex + 1} / {infoItems.length}
            </div>
          </div>
        </div>

        {/* Right scrollable list */}
        <div className="w-full flex-1 order-1 lg:order-2 gap-3 sm:gap-4 text-[#0a548d] text-center flex flex-col items-center">
          <h3 className="text-lg Archivo font-semibold px-2">
            Informations demandées aux marques
          </h3>

          {/* Desktop: Compact 3-item list with icon buttons */}
          <div className="hidden lg:flex flex-col items-center gap-2">
            <button
              onClick={() => scroll("up")}
              disabled={selectedIndex === 0}
              className={`p-2 rounded-full transition-all ${selectedIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#ff8300] text-white hover:bg-[#e26e00] hover:scale-110 shadow-md'
                }`}
            >
              <ChevronUp size={16} />
            </button>

            {/* Compact container for 3 items */}
            <div className="relative flex flex-col gap-1 w-full max-w-xs">
              {/* Fixed orange background in center */}
              <div className="absolute top-[calc(50%-20px)] left-0 right-0 h-[40px] bg-[#ff8300] rounded-lg shadow-md z-0"></div>

              {(() => {
                const getVisibleItems = () => {
                  const visibleItems = [];

                  // Previous item
                  if (selectedIndex > 0) {
                    visibleItems.push({
                      ...infoItems[selectedIndex - 1],
                      originalIndex: selectedIndex - 1,
                      isCenter: false,
                      position: 'prev'
                    });
                  } else {
                    visibleItems.push({
                      title: '',
                      originalIndex: -1,
                      isCenter: false,
                      position: 'prev',
                      isEmpty: true
                    });
                  }

                  // Center item (selected)
                  visibleItems.push({
                    ...infoItems[selectedIndex],
                    originalIndex: selectedIndex,
                    isCenter: true,
                    position: 'center'
                  });

                  // Next item
                  if (selectedIndex < infoItems.length - 1) {
                    visibleItems.push({
                      ...infoItems[selectedIndex + 1],
                      originalIndex: selectedIndex + 1,
                      isCenter: false,
                      position: 'next'
                    });
                  } else {
                    visibleItems.push({
                      title: '',
                      originalIndex: -1,
                      isCenter: false,
                      position: 'next',
                      isEmpty: true
                    });
                  }

                  return visibleItems;
                };

                const visibleItems = getVisibleItems();

                return visibleItems.map((item, index) => {
                  if (item.isEmpty) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="min-h-[40px] flex items-center justify-center relative z-10"
                      />
                    );
                  }

                  return (
                    <div
                      key={item.originalIndex}
                      onClick={() => handleSelect(item.originalIndex)}
                      className={`cursor-pointer text-xs font-medium py-2 px-3 rounded-lg transition-all min-h-[40px] flex items-center justify-center relative z-10 ${
                        item.isCenter
                          ? "text-white font-bold text-sm"
                          : "hover:bg-[#ffe5b4] bg-white border border-gray-200 hover:border-[#ff8300] text-gray-700"
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                    </div>
                  );
                });
              })()}
            </div>

            <button
              onClick={() => scroll("down")}
              disabled={selectedIndex === infoItems.length - 1}
              className={`p-2 rounded-full transition-all ${selectedIndex === infoItems.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#ff8300] text-white hover:bg-[#e26e00] hover:scale-110 shadow-md'
                }`}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Tablet: Compact horizontal scroll */}
          <div className="hidden md:flex lg:hidden flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-3 w-full max-w-xl">
              <button
                onClick={() => scroll("up")}
                disabled={selectedIndex === 0}
                className={`flex-shrink-0 p-2 rounded-full transition-all ${selectedIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff8300] text-white hover:bg-[#e26e00] hover:scale-110 shadow-md'
                  }`}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="relative flex-1 overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-56 bg-gradient-to-r from-[#ff8300] to-[#ff9500] rounded-lg shadow-lg z-0"></div>

                <div className="flex transition-transform duration-300 ease-in-out relative z-10">
                  {infoItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(index)}
                      className={`flex-shrink-0 w-56 py-3 px-4 mx-1 rounded-lg cursor-pointer transition-all font-medium text-center flex items-center justify-center min-h-[55px] text-sm ${
                        index === selectedIndex
                          ? "text-white font-bold"
                          : "bg-white shadow-md hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scroll("down")}
                disabled={selectedIndex === infoItems.length - 1}
                className={`flex-shrink-0 p-2 rounded-full transition-all ${selectedIndex === infoItems.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff8300] text-white hover:bg-[#e26e00] hover:scale-110 shadow-md'
                  }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mobile: Compact single item */}
          <div className="flex md:hidden flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-2 w-full px-2">
              <button
                onClick={() => scroll("up")}
                disabled={selectedIndex === 0}
                className={`flex-shrink-0 p-2.5 rounded-full transition-all ${selectedIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff8300] text-white hover:bg-[#e26e00] active:scale-95 shadow-md'
                  }`}
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex-1 min-w-0 bg-gradient-to-r from-[#ff8300] to-[#ff9500] text-white rounded-lg py-3 px-3 text-center font-semibold shadow-lg">
                <div className="text-xs leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {selectedItem.title}
                </div>
              </div>

              <button
                onClick={() => scroll("down")}
                disabled={selectedIndex === infoItems.length - 1}
                className={`flex-shrink-0 p-2.5 rounded-full transition-all ${selectedIndex === infoItems.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ff8300] text-white hover:bg-[#e26e00] active:scale-95 shadow-md'
                  }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Compact progress indicator */}
            <div className="flex gap-1.5 justify-center">
              {infoItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? 'bg-[#ff8300] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyInfo;

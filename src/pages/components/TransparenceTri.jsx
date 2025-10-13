import React from "react";
import TitleSection from "./ui/TitleSection";

// Composant React qui utilise les images fournies comme fonds pour les cartes + icônes.
// Tailwind pour la mise en page.

const BubbleCard = ({ title, image, icon,titleColor, children }) => (
  <div className="relative flex flex-col items-center justify-center text-center">
    <img src={image} alt="Fond carte" className="w-full h-auto object-contain" />
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 lg:px-14 gap-y-4 md:gap-y-2 mt-8">
      <h3 className={`text-3xl md:text-2xl xl:text-3xl font-extrabold mb-3drop-shadow ClashDisplayBold ${titleColor}`} >
        {title}
      </h3>
      <p className="text-lg 2xl:text-lg text-[#0a548d] leading-4 ArchivoLight ">
        {children}
      </p>
      {icon && (
        <img src={icon} alt="Icône" className="w-24 md:w-16 lg:w-20 h-24 md:h-16 lg:h-20" />
      )}
    </div>
  </div>
);

export default function TransparenceTri() {
  return (
    <div className="max-w-6xl flex flex-col md:flex-col items-center justify-end gap-12 lg:gap-14 2xl:gap-16 md:mt-8">
      {/* Header */}
           <TitleSection center={true}>
          <div className="leading-tight md:leading-none md:leading-tight text-center">
            <span className="block md:inline">En attendant la transparence sur les produits,</span>
            <br className="hidden md:block" />
            <span className="block md:inline"> on vous aide à faire le tri :</span>
          </div>
        </TitleSection>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <BubbleCard
          title="À la maison"
          image="/images/fondorangegauche.png"
          icon="/images/maisonorange.png"
          titleColor="text-[#ff8200]"
        >
          Des outils ludiques et pratiques pour mieux consommer au quotidien : calendrier, guide, jeu de société.
        </BubbleCard>

        <BubbleCard
          title="À l’école"
          image="/images/fondbleu.png"
          icon="/images/livrebleu.png"
          titleColor="text-[#0a548d]"
        >
          Sensibiliser les enfants en s’amusant : la Box Ti’Conso et ses activités pédagogiques clé en main.
        </BubbleCard>

        <BubbleCard
          title="Au travail"
          image="/images/fondorangedroite.png"
          icon="/images/trombonesorange.png"
          titleColor="text-[#ff8200]"
        >
          Favoriser la santé et le bien‑être des équipes avec nos ateliers et webinars alimentation & santé au travail.
        </BubbleCard>
      </div>
    </div>
  );
}

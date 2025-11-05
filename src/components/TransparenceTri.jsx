import React from "react";
import Title from "./ui/Title";
import BigTitle from "./ui/BigTitle";

// Composant React qui utilise les images fournies comme fonds pour les cartes + icônes.
// Tailwind pour la mise en page.

const BubbleCard = ({ title, image, icon, titleColor, children, href }) => (
    <a
        className="relative flex flex-col items-center justify-center text-center px-8 md:px-0"
        href={href}
    >
        <img
            src={image}
            alt="Fond carte"
            className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 lg:px-14 gap-y-4 md:gap-y-2 mt-8">
            <h3
                className={`text-2xl md:text-2xl xl:text-3xl font-extrabold mb-3drop-shadow ClashDisplayBold ${titleColor}`}
            >
                {title}
            </h3>
            <p className="text-lg 2xl:text-lg text-[#0a548d] leading-4 ArchivoLight px-6 md:px-0">
                {children}
            </p>
            {icon && (
                <img
                    src={icon}
                    alt="Icône"
                    className="w-16 h-auto md:w-16 lg:w-20 md:h-16 lg:h-20"
                />
            )}
        </div>
    </a>
);

export default function TransparenceTri() {
    return (
        <div className="max-w-6xl flex flex-col md:flex-col items-center justify-end gap-12 lg:gap-14 2xl:gap-16 md:mt-8">
            {/* Header */}
            {/* --- Version mobile --- */}
            <Title
                size="default"
                maxWidth="max-w-full"
                center={true}
                className="block md:hidden"
            >
                <div className="leading-tight text-center">
                    <span className="text-[#ff8300]">L’alimentation</span>&nbsp;
                    <span>est un pilier incontournable</span><span>&nbsp;d’une bonne santé,</span>
                    <span>encore faut-il comprendre</span>
                  &nbsp;
                    <span>ce que l’on mange.</span>
                    &nbsp;
                    <span>Ensemble redonnons</span>
                    &nbsp;
                    <span className="text-[#ff8300]">
                        du sens à nos choix !
                    </span>
                </div>
            </Title>

            {/* --- Version desktop --- */}
            <Title
                size="default"
                maxWidth="max-w-full"
                center={true}
                className="hidden md:block"
            >
                <div className="leading-tight md:leading-none text-center">
                    <span className="text-[#ff8300]">
                        L’alimentation est un pilier&nbsp;incontournable
                    </span>
                    &nbsp;
                    <span className="block md:inline">d’une&nbsp;bonne</span>
                    <br className="hidden md:block" />
                    <span className="block md:inline">
                        santé, encore faut-il comprendre ce que l’on mange.
                    </span>
                    <br className="hidden md:block" />
                    <span className="block md:inline">Ensemble redonnons </span>
                    <span className="text-[#ff8300]">
                        du sens à nos choix !
                    </span>
                </div>
            </Title>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <BubbleCard
                    title="À la maison"
                    image="/images/fondorangegauche.png"
                    icon="/images/maisonorange.png"
                    titleColor="text-[#ff8200]"
                    href="/athome"
                >
                    Un calendrier, un guide de décryptage pour mieux choisir en
                    magasin sans se prendre la tête{" "}
                </BubbleCard>

                <BubbleCard
                    title="À l’école"
                    image="/images/fondbleu.png"
                    icon="/images/livrebleu.png"
                    titleColor="text-[#0a548d]"
                    href="/atschool"
                >
                    Sensibiliser les enfants en s’amusant avec un kit
                    pédagogique inédit et d’actualité&nbsp;!
                </BubbleCard>

                <BubbleCard
                    title="Au travail"
                    image="/images/fondorangedroite.png"
                    icon="/images/trombonesorange.png"
                    titleColor="text-[#ff8200]"
                    href="/atwork"
                >
                    Favoriser la santé et le bien‑être des équipes avec nos
                    ateliers et webinars alimentation & santé au travail.
                </BubbleCard>
            </div>
        </div>
    );
}

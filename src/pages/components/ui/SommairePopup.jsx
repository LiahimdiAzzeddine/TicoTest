import React from 'react';

const SommairePopup = ({ isOpen, onClose }) => {
    const menuItems = [
        { title: "Liste d'ingrédients", page: "P4", color: "text-[#ff8300]" },
        { title: "Informations nutritionnelles", page: "P6", color: "text-[#ff8300]" },
        { title: "Scores", page: "P10", color: "text-[#ff8300]" },
        { title: "Labels et certifications", page: "P14", color: "text-[#ff8300]" },
        { title: "Mentions marketing", page: "P18", color: "text-[#ff8300]" }
    ];

    const bonusItems = [
        { title: "Choisir en moins d'une minute", page: "P22", color: "text-[#0a548d]" },
        { title: "Les 10 produits à vérifier", page: "P24", color: "text-[#0a548d]" }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-3xl w-full flex justify-center">
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-4 md:top-10 md:right-40 right-4 w-12 h-14 z-10 hover:scale-110 transition-transform"
                >
                    <img
                        src="/images/fermeture_popup.png"
                        alt="Fermer"
                        className="w-full h-full object-contain"
                    />
                </button>

                {/* Desktop version */}
                <div
                    className={`
                        relative px-10 py-10 max-w-xl flex w-full flex-col justify-center items-center
                        hidden md:flex
                    `}
                    style={{
                        backgroundImage: 'url("/images/Popup.png")',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <ContentSection menuItems={menuItems} bonusItems={bonusItems} />
                </div>

                {/* Mobile version with background color only */}
                <div
                    className={`
                        relative px-6 py-8 max-w-xl w-full flex flex-col justify-center items-center
                        md:hidden bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]
                    `}
                    style={{
                        backgroundColor: '#f0f4f8'
                    }}
                >
                    <ContentSection menuItems={menuItems} bonusItems={bonusItems} />
                </div>
            </div>
        </div>
    );
};

const ContentSection = ({ menuItems, bonusItems }) => (
    <div className="max-w-sm w-full md:mt-6 space-y-6">
        <h2 className="text-[#0a548d] text-3xl font-bold text-center ClashDisplayBold">
            Sommaire
        </h2>

        <div className="space-y-4">
            {menuItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span className={`${item.color} font-semibold text-base ArchivoLight`}>
                        {item.title}
                    </span>
                    <div className="flex-1 mx-3 border-b border-dotted border-[#ff8300]"></div>
                    <span className={`${item.color} ArchivoLight font-bold text-base`}>
                        {item.page}
                    </span>
                </div>
            ))}
        </div>

        <div>
            <h3 className="text-[#0a548d] text-xl ArchivoLight font-bold text-center mb-2">
                Bonus
            </h3>
            <div className="space-y-3">
                {bonusItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className={`${item.color} font-medium ArchivoLight text-base`}>
                            {item.title}
                        </span>
                        <div className="flex-1 mx-3 border-b border-dotted border-[#0a548d]"></div>
                        <span className={`${item.color} ArchivoLight font-bold text-base`}>
                            {item.page}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className="text-center">
            <button className="text-lg bg-[#0a548d] text-white px-8 py-3 rounded-lg hover:bg-[#084b7a] transition-colors duration-300 ArchivoLight"
               onClick={() => {
                window.open(
                    "https://app.mymoojo.com/project/tico",
                    "_blank"
                );
            }}
            >
                Il me le faut !
            </button>
        </div>
    </div>
);


export default SommairePopup;

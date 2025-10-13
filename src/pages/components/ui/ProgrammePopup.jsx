import React from 'react';

const ProgrammePopup = ({ isOpen, onClose }) => {


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
                    <ContentSection isMobile={false}/>
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
                    <ContentSection isMobile={true}/>
                </div>
            </div>
        </div>
    );
};

const ContentSection = ({ isMobile }) => (
    <div className="max-w-sm w-full md:mt-6 space-y-6">
        <h2 className="text-[#0a548d] text-3xl font-bold text-center ClashDisplayBold">
            Au programme​
        </h2>

        <div className="space-y-4">
                <div  className="flex text-center items-center">
                    <span className={`text-[#0a548d] ArchivoLight font-bold text-base`}>
                      Durée totale : 45 à 60 min<br></br>
Public : salariés, grand public, événement RSE/QVT
                    </span>
                </div>
        
        </div>
            <div className="space-y-4">
                <div className="flex flex-col  items-center text-center">
                    <span className={`text-[#ff8300] font-semibold text-base ArchivoLight text-center`}>
                       Escape Food Game : 
                    </span>
                    <div className="flex-1 mx-3 border-b border-dotted border-[#ff8300]"></div>
                    <span className={`text-[#0a548d] ArchivoLight font-bold text-base`}>
                        Mettez à l’épreuve vos perceptions, enquêtez sur les produits, les scores, les labels et la réglementation  pour déjouer les pièges et devenir un As en lecture d’étiquettes.
                    </span>
                </div>
        
        </div>
         <div className="space-y-4">
                <div className="flex flex-col justify-between items-center">
                    <span className={`text-[#ff8300] font-semibold text-base ArchivoLight`}>
                       & dégustations guidées :
                    </span>
                    <div className="flex-1 mx-3 border-b border-dotted border-[#ff8300]"></div>
                    <span className={`text-[#0a548d] ArchivoLight font-bold text-base`}>
Rendez-vous à la découverte du vrai goût !                   </span>
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
               J’en organise un !
            </button>
        </div>
    </div>
);


export default ProgrammePopup;

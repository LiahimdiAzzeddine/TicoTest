import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import toast from 'react-hot-toast';
import { AddButton, QtyControl } from "./TesComposants";
import { PRODUCTS } from "../data";

// Popup de choix de version
function VersionModal({ isOpen, onClose, product, onSelect, quantity }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-[#0a548d] mb-4 ClashDisplayBold">
          Choisir la version
        </h3>

        <p className="text-gray-600 mb-6">
          Quelle version de <span className="font-semibold text-[#0a548d]">{product.title}</span> souhaitez-vous commander ?
        </p>

        <div className="space-y-3">
          {product.hasPdf && (
            <button
              onClick={() => onSelect('pdf', quantity)}
              className="w-full bg-[#0a548d] hover:bg-[#0a5d9c] text-white rounded-lg p-4 flex items-center justify-between transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold">Version PDF</div>
                  <div className="text-sm opacity-90">{product.pdfPrice}€</div>
                </div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {product.hasPrint && (
            <button
              onClick={() => onSelect('print', quantity)}
              className="w-full bg-[#FFECA7] hover:bg-[#fbecb7] text-[#0a548d] rounded-lg p-4 flex items-center justify-between transition-all active:scale-[0.98] border-2 border-[#0a548d]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold">Version Imprimée</div>
                  <div className="text-sm">{product.printPrice}€ + frais de port</div>
                </div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2 font-semibold"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

function ProductCard({ title, subtitle, subtitle2, image, onAdd, hasPdf = true, hasPrint = true }) {
  const [qty, setQty] = useState(1);
  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="relative mb-2">
        <div className="relative w-60 h-52 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain relative z-10"
            loading="lazy"
          />
        </div>
      </div>

      <h3 className="text-[#0a548d] font-bold text-lg mb-1">{title}</h3>

      {subtitle && (
        <p className="text-[#0a548d] text-base">{subtitle}</p>
      )}
      {subtitle2 && subtitle2.trim() !== "" && (
        <p className="text-[#0a548d] text-base mb-4">{subtitle2}</p>
      )}
      {(!subtitle2 || subtitle2.trim() === "") && <div className="mb-6"></div>}


      <QtyControl title={title} qty={qty} inc={inc} dec={dec} />
      <div className="mb-2"></div>
      <AddButton onClick={() => onAdd?.(qty)} />

    </div>
  );
}


export default function CommandeGrid({
  calendrierImg = "/images/calendrierp.webp",
  guideImg = "/images/guidep.webp",
  jeuImg = "/images/jeup.webp",
}) {
  const { addMaison } = useCart();
  const [modalState, setModalState] = useState({
    isOpen: false,
    product: null,
    quantity: 1
  });

  const showNotification = (message) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#0a548d',
        color: '#fff',
        fontWeight: '600',
        padding: '16px',
        borderRadius: '10px',
      },
      iconTheme: {
        primary: '#FFECA7',
        secondary: '#0a548d',
      },
    });
  };

  const openModal = (product, quantity) => {
    setModalState({
      isOpen: true,
      product,
      quantity
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      product: null,
      quantity: 1
    });
  };

  const handleVersionSelect = (version, quantity) => {
    const product = modalState.product;
    let selectedProduct;
    let productName;

    if (product.title === "Le calendrier") {
      if (version === 'pdf') {
        selectedProduct = PRODUCTS.calendrierPdf;
        productName = "Le calendrier (PDF)";
      } else {
        selectedProduct = PRODUCTS.calendrierImprime;
        productName = "Le calendrier (Imprimé)";
      }
    } else if (product.title === "Le guide") {
      if (version === 'pdf') {
        selectedProduct = PRODUCTS.guidePdf;
        productName = "Le guide (PDF)";
      } else {
        selectedProduct = PRODUCTS.guideImprime;
        productName = "Le guide (Imprimé)";
      }
    } else if (product.title === "Le jeu") {
      selectedProduct = PRODUCTS.jeuImprime;
      productName = "Le jeu (Imprimé)";
    }

    if (selectedProduct) {
      addMaison(selectedProduct.id, selectedProduct.name, selectedProduct.price,selectedProduct.image, quantity,selectedProduct.frais);
      showNotification(`${quantity}x ${productName} ajouté au panier !`);
    }

    closeModal();
  };

  const handleAddCalendrier = (qty) => {
    openModal({
      title: "Le calendrier",
      hasPdf: true,
      hasPrint: true,
      pdfPrice: 9.99,
      printPrice: 15.99
    }, qty);
  };

  const handleAddGuide = (qty) => {
    openModal({
      title: "Le guide",
      hasPdf: true,
      hasPrint: true,
      pdfPrice: 14.99,
      printPrice: 20.99
    }, qty);
  };

  const handleAddJeu = (qty) => {
    // Le jeu n'a que la version imprimée, pas besoin de modal
    addMaison(PRODUCTS.jeuImprime.id, PRODUCTS.jeuImprime.name, PRODUCTS.jeuImprime.price,PRODUCTS.jeuImprime.image, qty,PRODUCTS.jeuImprime.frais);
    showNotification(`${qty}x Le jeu (Imprimé) ajouté au panier !`);
  };

  return (
    <>
      

      <VersionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        product={modalState.product}
        onSelect={handleVersionSelect}
        quantity={modalState.quantity}
      />

      <div className="max-w-6xl flex flex-col md:flex-col items-center justify-end gap-4 md:gap-14 lg:gap-14 2xl:gap-16 md:mt-8">
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full">
          <ProductCard
            title="Le calendrier"
            subtitle="Version PDF : 9,99€"
            subtitle2="Imprimé : 15,99€ + frais de port"
            image={"/images/calendrierp.webp"}
            onAdd={handleAddCalendrier}
            hasPdf={true}
            hasPrint={true}
          />

          <ProductCard
            title="Le guide"
            subtitle="Version PDF : 14,99€"
            subtitle2="Imprimé : 20,99€ + frais de port"
            image={"/images/guidep.webp"}
            onAdd={handleAddGuide}
            hasPdf={true}
            hasPrint={true}
          />

          <ProductCard
            title="Le jeu"
            subtitle="-"
            subtitle2="Imprimé : 22,99€ + frais de port"
            image={"/images/jeup.webp"}
            onAdd={handleAddJeu}
            hasPdf={false}
            hasPrint={true}
          />
        </div>
      </div>
    </>
  );
}
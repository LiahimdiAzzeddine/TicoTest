import React, { createContext, useContext, useEffect, useState } from "react";

// --- Keys LocalStorage ---
const CART_KEY = "cart_data";

// --- Création du contexte ---
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    maison: [], // produits & bundles
    ecole: [],  // box donations
  });

  // Charger depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  /* -------- MÉTHODES -------- */

  // Ajouter produit/offre (catégorie maison)
const addMaison = (productId, name, price, image, qty = 1,frais,originalPrice,description) => {
  setCart((prev) => {
    const exists = prev.maison.find((p) => p.id === productId);
    let updatedMaison;
    if (exists) {
      updatedMaison = prev.maison.map((p) =>
        p.id === productId ? { ...p, qty: p.qty + qty } : p
      );
    } else {
      updatedMaison = [
        ...prev.maison,
        { id: productId, name, price, image, qty,frais,originalPrice,description },
      ];
    }
    return { ...prev, maison: updatedMaison };
  });
};


  // Ajouter une box école
const addEcole = (orgId, orgName, unitPrice = 4, image, childrenCount = 1) => {
  setCart((prev) => {
    const exists = prev.ecole.find((b) => b.id === orgId);
    let updatedEcole;
    if (exists) {
      updatedEcole = prev.ecole.map((b) =>
        b.id === orgId ? { ...b, childrenCount: b.childrenCount + childrenCount } : b
      );
    } else {
      updatedEcole = [
        ...prev.ecole,
        { id: orgId, orgName, unitPrice, image, childrenCount },
      ];
    }
    return { ...prev, ecole: updatedEcole };
  });
};

// Utilisez
const updateChildrenCount = (type, id, newCount) => {
  setCart((prev) => ({
    ...prev,
    [type]: prev[type].map((item) =>
      item.id === id ? { ...item, childrenCount: Math.max(1, newCount) } : item
    ),
  }));
};

  // Supprimer un produit (maison ou école)
  const removeItem = (category, id) => {
    setCart((prev) => {
      return {
        ...prev,
        [category]: prev[category].filter((item) => item.id !== id),
      };
    });
  };

  // Modifier la quantité
  const updateQty = (category, id, qty) => {
    if (qty <= 0) return removeItem(category, id);
    setCart((prev) => {
      return {
        ...prev,
        [category]: prev[category].map((item) =>
          item.id === id ? { ...item, qty } : item
        ),
      };
    });
  };

  // Vider le panier
  const clearCart = () => setCart({ maison: [], ecole: [] });
  // Vider seulement les produits maison
const clearMaison = () => setCart((prev) => ({ ...prev, maison: [] }));

// Vider seulement les box école
const clearEcole = () => setCart((prev) => ({ ...prev, ecole: [] }));

  /* -------- CALCULS -------- */
  const totalMaison = cart.maison.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalEcole = cart.ecole.reduce(
    (acc, item) => acc + item.unitPrice * item.childrenCount,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addMaison,
        addEcole,
        removeItem,
        updateQty,
        clearCart,
        totalMaison,
        totalEcole,
        clearMaison,
        updateChildrenCount,
        clearEcole
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook pratique
export function useCart() {
  return useContext(CartContext);
}

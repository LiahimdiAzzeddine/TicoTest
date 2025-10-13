import { useState } from 'react';

export function useStripeOrgCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCheckoutOrgSession = async (orgOrderData) => {
    console.log("🚀 ~ createCheckoutOrgSession ~ orgOrderData:", orgOrderData)
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/api/create-checkout-org-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orgOrderData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement pour l'organisation");
      }

      const data = await response.json();

      if (data.url) {
        // Redirige vers Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("URL de paiement non reçue");
      }
    } catch (err) {
      setError(err.message);
      console.error("Erreur checkout organisation:", err);
    } finally {
      setLoading(false);
    }
  };

  return { createCheckoutOrgSession, loading, error };
}

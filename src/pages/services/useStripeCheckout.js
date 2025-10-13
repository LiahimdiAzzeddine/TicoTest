import { useState } from 'react';

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCheckoutSession = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/api/create-checkout-session-api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
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
      console.error("Erreur checkout:", err);
    } finally {
      setLoading(false);
    }
  };

  return { createCheckoutSession, loading, error };
}

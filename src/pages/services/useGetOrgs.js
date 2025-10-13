import { useState } from "react";
import axios from "axios";

export function useGetOrganisations() {
  const [organisations, setOrganisations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "https://tico.foodhea.com/api";

  // Récupération des organisations
  const getOrganisations = async (type = "public") => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseURL}/organisations`, {
        headers: { Accept: "application/json" },
        params: { type }, // 👈 on passe le paramètre à l’API
      });

      setOrganisations(response.data.data); // stocker seulement le tableau
      setLoading(false);

      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Erreur réseau";
      setError(errorMessage);
      setLoading(false);

      return {
        success: false,
        error: errorMessage,
        errors: err.response?.data?.errors,
      };
    }
  };

  return {
    organisations,
    loading,
    error,
    getOrganisations, // 👈 renommé pour plus de clarté
  };
}

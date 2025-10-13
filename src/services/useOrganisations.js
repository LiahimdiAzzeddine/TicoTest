import { useState } from "react";
import axios from "axios";

export function useOrganisations() {
  const [organisation, setOrganisation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "https://tico.foodhea.com/api";

  const createOrganisation = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Champs texte
      formData.append("orgName", data.orgName || "");
      formData.append("forme", data.forme || "");
      formData.append("siret", data.siret || "");
      formData.append("rna", data.rna || "");
      formData.append("adresse", data.adresse || "");
      formData.append("ville", data.ville || "");
      formData.append("cp", data.cp || "");
      formData.append("prenom", data.prenom || "");
      formData.append("nom", data.nom || "");
      formData.append("fonction", data.fonction || "");
      formData.append("tel", data.tel || "");
      formData.append("email", data.email || "");

      // Fichier
      if (data.file) {
        formData.append("docName", data.file);
      }

      // Cases à cocher (en string car Laravel ne gère pas bien les booléens bruts)
      formData.append("c1", data.c1 ? 1 : 0);
formData.append("c2", data.c2 ? 1 : 0);
formData.append("c3", data.c3 ? 1 : 0);
formData.append("optin", data.optin ? 1 : 0);


      // Debug FormData
      console.log("=== FormData Debug ===");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name} (${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`${key}: "${value}"`);
        }
      }
      console.log("======================");

      // Requête POST avec axios
      const response = await axios.post(`${baseURL}/organisations`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      setOrganisation(response.data);
      setLoading(false);
      return { success: true, data: response.data };
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
    organisation,
    loading,
    error,
    createOrganisation,
  };
}

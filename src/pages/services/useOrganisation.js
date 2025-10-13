import { useState, useEffect } from "react";

export function useOrganisation(id, type = "public") {
  const [organisation, setOrganisation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrganisation = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/organisations/${id}?type=${type}`
        );

        if (!response.ok) {
          throw new Error("Organisation introuvable");
        }

        const data = await response.json();
        setOrganisation(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisation();
  }, [id, type]);

  return { organisation, loading, error };
}

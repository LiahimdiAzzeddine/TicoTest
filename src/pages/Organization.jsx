import React from "react";
import { useParams } from "react-router-dom";

import StartSection from "../Templates/StartSection";
import HomeSection from "../Templates/HomeSection";
import SelectableDonationBox from "../components/SelectableDonationBoxProps";
import { useOrganisationId } from "../services/useOrganisationId";

export default function Organization() {
  const { id } = useParams();
  const { organisation, loading, error } = useOrganisationId(id, "private");
  console.log("🚀 ~ Organization ~ organisation:", organisation)

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!organisation) return <p>Aucune donnée</p>;

  return (
    <StartSection pb={"md:pb-20 pb-16"}>
      <div className="flex flex-col gap-14 min-h-screen  items-center">
        <div className="flex flex-col md:flex-row-reverse items-center justify-start md:justify-between gap-y-8 md:gap-x-10 max-w-2xl ">
          <div className="text-[#0a548d] text-center md:text-left flex flex-col gap-8 md:gap-14 flex-1">
              {/* 🔥 Ici on injecte les infos récupérées dans ton composant */}
              <SelectableDonationBox
               wishLabel = {organisation.boxes+" box Ti'Conso"}
                orgName={organisation.orgName}
                orgId={organisation.id}
                collectedEuro={organisation.collectedEuro || 0}
                targetEuro={organisation.boxes*4 || 120}
                contentUrl={organisation.contentUrl || "#"}
              />
          </div>
        </div>
      </div>
    </StartSection>
  );
}

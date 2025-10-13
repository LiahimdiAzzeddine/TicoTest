import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrganisations } from "../services/useGetOrgs";

const BLUE = "#0a548d";
const ORANGE = "#ff7a00";

/* ---- Carte organisme ---- */

function OrgCard({ org, bg = "/images/fondbeige.png", pricePerBox = 120 }) {
  const target = (org.boxes ?? 1) * pricePerBox;
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/organization/${org.id}`)}
      className="relative w-[260px] h-[245px] grid place-items-center text-center"
    >
      {/* Image de fond */}
      <img
        src={bg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-full w-full object-contain"
      />

      {/* Contenu */}
      <div className="relative z-[1] px-6">
        <h3
          className="font-extrabold leading-tight text-2xl"
          style={{ color: ORANGE }}
        >
          {org.orgName}
        </h3>

        <div className="mt-2 text-[#0a548d] text-base leading-5">
          <div>{org.forme}</div>
          <div>{org.ville}</div>
          <div>{org.cp}</div>
          <div>
            {org.boxes > 1 ? `${org.boxes} box demandées` : "1 box demandée"}
          </div>
        </div>

        <div className="mt-2 font-extrabold text-base" style={{ color: BLUE }}>
          Collectés : {org.collected ?? 0} / {target}€
        </div>
      </div>
    </button>
  );
}
/* ---- Barre de recherche ---- */
function SearchBar({ value, onChange, placeholder = "Rechercher", resultCount }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-2xl border-[1px] px-12 py-3 text-slate-800 placeholder:text-slate-400 text-center transition-all duration-300 focus:outline-none focus:shadow-lg"
          style={{ 
            borderColor: isFocused ? ORANGE : BLUE,
            backgroundColor: isFocused ? '#fffbf5' : 'white'
          }}
        />
        
        {/* Icône de recherche */}
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isFocused ? 'scale-110' : ''}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isFocused ? ORANGE : BLUE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Bouton clear */}
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Effacer la recherche"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Compteur de résultats */}
      {value && (
        <div className="mt-2 text-center text-sm text-slate-500 animate-fade-in">
          {resultCount} résultat{resultCount > 1 ? 's' : ''} trouvé{resultCount > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

/* ---- État vide ---- */
function EmptyState({ hasSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke={BLUE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12" y2="16" /> 
          {/* point d’info (utiliser x2=y2= même coord pour avoir un vrai point) */}
        </svg>
      </div>
      <h3 className="text-xl font-bold text-slate-700 mb-2">
        {hasSearch ? "Aucun résultat" : "Aucune organisation"}
      </h3>
      <p className="text-slate-500 max-w-md">
        {hasSearch
          ? "Essayez de modifier votre recherche ou d'utiliser d'autres mots-clés"
          : "Aucune organisation n'est disponible pour le moment"}
      </p>
    </div>
  );
}


/* ---- Composant principal ---- */
export default function OrganismesGrid({
  pricePerBox = 120,
  fondPath = "/images/fondbeige.png",
  onSelect = (org) => console.log("select org:", org),
}) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const { organisations, loading, error, getOrganisations } = useGetOrganisations();

  useEffect(() => {
    getOrganisations("public");
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return organisations || [];
    return (organisations || []).filter((o) =>
      [o.orgName, o.forme, o.ville, o.cp].some((v) =>
        String(v || "").toLowerCase().includes(t)
      )
    );
  }, [organisations, q]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"/>
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: `${BLUE} transparent transparent transparent` }}/>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Chargement des organisations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <p className="text-red-600 font-medium text-center">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start gap-y-8 w-full max-w-6xl px-4">
      <SearchBar 
        value={q} 
        onChange={setQ} 
        placeholder="Rechercher par nom, type, ville..."
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <EmptyState hasSearch={q.trim().length > 0} />
      ) : (
        <div className="mt-6 grid place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 w-full">
          {filtered.map((org, i) => (
            <OrgCard
              key={org.id || i}
              org={org}
              bg={fondPath}
              pricePerBox={pricePerBox}
              onClick={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

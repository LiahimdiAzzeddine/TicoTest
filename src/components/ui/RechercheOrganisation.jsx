import React from "react";

export default function RechercheOrganisation({
  BLUE,
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  handleSearchOrganisation,
  searchLoading,
  searchResults,
  selectedOrg,
  handleSelectOrganisation,
}) {
  return (
    <div className="space-y-6">
      {/* Recherche */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4" style={{ color: BLUE }}>
          Rechercher par SIRET ou SIREN
        </h3>

        <div className="space-y-4">

          {/* Numéro */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: BLUE }}>
              Numéro siren/siret
            </label>
            <div className="flex gap-2">
                
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Exemple: 12345678901234 ou 123456789"}
 className={[
        "w-full rounded-full bg-slate-300 px-4 h-11",
        "placeholder:text-slate-400 text-slate-800",
        "outline-none ring-1 ring-white/60 focus:ring-2 focus:ring-sky-300",
        "transition-all duration-200",
       "",
      ].join(" ")}              
  
              />
              <button
                type="button"
                onClick={handleSearchOrganisation}
                disabled={searchLoading}
                className="rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: BLUE }}
              >
                {searchLoading ? "Recherche..." : "Rechercher"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats de recherche */}
      {searchResults.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4" style={{ color: BLUE }}>
            Résultats de recherche
          </h3>

          {searchResults.map((org) => (
            <div
              key={org.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedOrg?.id === org.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleSelectOrganisation(org)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-lg" style={{ color: BLUE }}>
                    {org.orgName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{org.forme}</p>
                  <p className="text-sm text-gray-600 mt-1">SIRET: {org.siret}</p>
                  <p className="text-sm text-gray-600">{org.adresse}</p>
                  <p className="text-sm text-gray-600">
                    {org.cp} {org.ville}
                  </p>
                </div>
                {selectedOrg?.id === org.id && (
                  <div className="ml-4">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { AlertCircle } from "lucide-react";
import { RelayPointModal } from "./RelayPointModal";
import { useState } from "react";

export function DeliveryForm({
    formData,
    handleInputChange,
    handleBlur,
    handleDeliveryChange,
    handleRelayPointSelect,
    errors,
    touched,
    allProductsArePdf = false,
    setMode
}) {
    const [isRelayModalOpen, setRelayModalOpen] = useState(false);
    const [relayPointWasSelected, setRelayPointWasSelected] = useState(false);

    const onRelayPointSelected = (relayPoint) => {
        handleRelayPointSelect(relayPoint);
        setRelayPointWasSelected(true);
        setRelayModalOpen(false);
    };

    const handleRelayModalClose = () => {
        // Si le modal se ferme sans qu'un point relais ait été sélectionné, revenir à domicile
        if (formData.livraison === "relais" && !relayPointWasSelected) {
            handleDeliveryChange("domicile");
            setMode("domicile");
        }
        setRelayPointWasSelected(false);
        setRelayModalOpen(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0a548d] p-4 sm:p-6">
            {/* En-tête avec icône */}
            <div className="flex items-start gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a548d]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0a548d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0a548d] mb-1">
                        Informations de livraison
                    </h3>
                    <p className="text-sm text-gray-600">
                        {allProductsArePdf
                            ? "Renseignez vos coordonnées pour recevoir vos fichiers PDF"
                            : "Complétez le formulaire pour la livraison de votre commande"}
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                {/* Email */}
                <div className="group">
                    <label className="block text-sm font-semibold text-[#0a548d] mb-2">
                        Adresse e-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="votre.email@exemple.fr"
                            className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                errors.email && touched.email
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                            }`}
                            required
                        />
                    </div>
                    {errors.email && touched.email && (
                        <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Nom et Prénom - Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nom */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-[#0a548d] mb-2">
                            Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="Dupont"
                            className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                errors.nom && touched.nom
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                            }`}
                            required
                        />
                        {errors.nom && touched.nom && (
                            <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                {errors.nom}
                            </p>
                        )}
                    </div>

                    {/* Prénom */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-[#0a548d] mb-2">
                            Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="Jean"
                            className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                errors.prenom && touched.prenom
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                            }`}
                            required
                        />
                        {errors.prenom && touched.prenom && (
                            <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                {errors.prenom}
                            </p>
                        )}
                    </div>
                </div>

                {!allProductsArePdf && (
                    <>
                        {/* Séparateur visuel */}
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#d9f2f2]"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Adresse de livraison
                                </span>
                            </div>
                        </div>

                        {/* Adresse */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-[#0a548d] mb-2">
                                Adresse complète <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder="123 Rue de la Paix"
                                className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                    errors.adresse && touched.adresse
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                                }`}
                                required
                            />
                            {errors.adresse && touched.adresse && (
                                <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                    {errors.adresse}
                                </p>
                            )}
                        </div>

                        {/* Ville + Code postal */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="group">
                                <label className="block text-sm font-semibold text-[#0a548d] mb-2">
                                    Ville <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="ville"
                                    value={formData.ville}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    placeholder="Grenoble"
                                    className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                        errors.ville && touched.ville
                                            ? "border-red-400 focus:border-red-500"
                                            : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                                    }`}
                                    required
                                />
                                {errors.ville && touched.ville && (
                                    <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                        {errors.ville}
                                    </p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-[#0a548d] mb-2">
                                    Code postal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="codePostal"
                                    value={formData.codePostal}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    placeholder="38000"
                                    maxLength="5"
                                    className={`w-full px-4 py-3.5 text-sm bg-[#d9f2f2]/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a548d]/20 transition-all ${
                                        errors.codePostal && touched.codePostal
                                            ? "border-red-400 focus:border-red-500"
                                            : "border-[#d9f2f2] focus:border-[#0a548d] focus:bg-white"
                                    }`}
                                    required
                                />
                                {errors.codePostal && touched.codePostal && (
                                    <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                        {errors.codePostal}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Choix de livraison */}
                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-[#0a548d] mb-4">
                                Mode de livraison
                            </label>
                            
                            {!formData.codePostal && (
                                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800">
                                        Veuillez saisir un code postal pour choisir un point relais
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {/* Livraison à domicile */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDeliveryChange("domicile");
                                        setMode("domicile");
                                    }}
                                    className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                                        formData.livraison === "domicile"
                                            ? "bg-gradient-to-br from-[#d9f2f2] to-[#b3e5e5] border-[#0a548d] shadow-lg scale-[1.02]"
                                            : "bg-[#d9f2f2]/30 border-[#d9f2f2] hover:border-[#0a548d]/50 hover:bg-[#d9f2f2]/50 hover:scale-[1.01]"
                                    }`}
                                >
                                    {formData.livraison === "domicile" && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#0a548d] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="w-20 h-20 mb-2 flex items-center justify-center">
                                        <img
                                            className="w-full h-full object-contain"
                                            src="/images/livraison domicile.png"
                                            alt="Livraison à domicile"
                                        />
                                    </div>
                                    <span className={`text-xs font-semibold text-center transition-colors ${
                                        formData.livraison === "domicile" ? "text-[#0a548d]" : "text-gray-600 group-hover:text-[#0a548d]"
                                    }`}>
                                        À domicile
                                    </span>
                                </button>

                                {/* Point relais */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!formData.codePostal || formData.codePostal.length !== 5) {
                                            return;
                                        }
                                        handleDeliveryChange("relais");
                                        setMode("relais");
                                        setRelayModalOpen(true);
                                    }}
                                    disabled={!formData.codePostal || formData.codePostal.length !== 5}
                                    className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                                        !formData.codePostal || formData.codePostal.length !== 5
                                            ? "bg-gray-100 border-gray-200 opacity-40 cursor-not-allowed"
                                            : formData.livraison === "relais"
                                            ? "bg-gradient-to-br from-[#d9f2f2] to-[#b3e5e5] border-[#0a548d] shadow-lg scale-[1.02]"
                                            : "bg-[#d9f2f2]/30 border-[#d9f2f2] hover:border-[#0a548d]/50 hover:bg-[#d9f2f2]/50 hover:scale-[1.01]"
                                    }`}
                                >
                                    {formData.livraison === "relais" && formData.codePostal && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#0a548d] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="w-20 h-20 mb-2 flex items-center justify-center">
                                        <img
                                            className="w-full h-full object-contain"
                                            src="/images/Livraison point relais.png"
                                            alt="Point relais"
                                        />
                                    </div>
                                    <span className={`text-xs font-semibold text-center transition-colors ${
                                        !formData.codePostal || formData.codePostal.length !== 5
                                            ? "text-gray-400"
                                            : formData.livraison === "relais"
                                            ? "text-[#0a548d]"
                                            : "text-gray-600 group-hover:text-[#0a548d]"
                                    }`}>
                                        Point relais
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Affichage du point relais sélectionné */}
                        {formData.livraison === "relais" && formData.relayPoint && (
                            <div className="mt-5 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-bold text-emerald-800">
                                                Point relais sélectionné
                                            </p>
                                        </div>
                                        <div className="ml-10">
                                            <p className="text-sm text-emerald-900 font-semibold mb-0.5">
                                                {formData.relayPoint.LgAdr1}
                                            </p>
                                            <p className="text-xs text-emerald-700">
                                                {formData.relayPoint.LgAdr2 ? formData.relayPoint.LgAdr2 : formData.relayPoint.LgAdr3}
                                            </p>
                                            <p className="text-xs text-emerald-700 font-medium">
                                                {formData.relayPoint.CP} {formData.relayPoint.Ville}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setRelayModalOpen(true)}
                                        className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#0a548d] bg-white border border-[#0a548d]/30 rounded-lg hover:bg-[#0a548d] hover:text-white transition-all"
                                    >
                                        Modifier
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal Relay Points */}
            <RelayPointModal
                isOpen={isRelayModalOpen}
                onClose={handleRelayModalClose}
                onSelect={onRelayPointSelected}
                postcode={formData.codePostal}
            />
        </div>
    );
}
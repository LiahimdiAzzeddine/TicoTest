import React from "react";
import { Loader2, Search, CheckCircle, AlertCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Label, SectionTitle, TextInput } from "../InscriptionOrganisationForm";

export default function OrganisationForm({
    handleUploadClick,
    handleFileChange,
    handleSiretVerification,
    values,
    errors,
    update,
    searchType,
    setSearchType,
    siretStatus,
    setSiretStatus,
    fileInput,
    captchaToken,
    setCaptchaToken,
    hookError,
    hookLoading,
    organisation,
    BLUE,
    PANEL,
    isForBuy = false,
}) {
    return (
        <>
            {/* ===== Informations légales ===== */}
            <SectionTitle>Informations légales de l'organisme</SectionTitle>

            <div className="grid gap-4">
                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Type d'identifiant</Label>
                    <select
                        value={searchType}
                        onChange={(e) => {
                            setSearchType(e.target.value);
                            setSiretStatus({
                                loading: false,
                                verified: false,
                                error: null,
                            });
                        }}
                        className="w-full rounded-full bg-white/95 px-4 h-11 outline-none ring-1 ring-white/60 focus:ring-2 focus:ring-sky-300 transition-all duration-200 text-slate-800"
                        style={{ color: BLUE }}
                    >
                        <option value="siret">SIRET (14 chiffres)</option>
                        <option value="siren">SIREN (9 chiffres)</option>
                    </select>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>
                        {searchType === "siret"
                            ? "N° de SIRET*"
                            : "N° de SIREN*"}
                    </Label>
                    <div className="flex-1">
                        <div className="flex gap-2">
                            <TextInput
                                name="siret"
                                placeholder={
                                    searchType === "siret"
                                        ? "12345678901234 (14 chiffres)"
                                        : "123456789 (9 chiffres)"
                                }
                                inputMode="numeric"
                                value={values.siret}
                                onChange={update("siret")}
                                className={`flex-1 ${
                                    errors.siret ? "ring-red-500" : ""
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => handleSiretVerification(false)}
                                disabled={siretStatus.loading || !values.siret}
                                className="px-4 py-2 rounded-full text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                style={{ backgroundColor: BLUE }}
                            >
                                {siretStatus.loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Search className="w-4 h-4" />
                                )}
                                Vérifier
                            </button>
                        </div>
                        {errors.siret && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.siret}
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Nom de l'organisation*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="orgName"
                            placeholder="École primaire du puit"
                            value={values.orgName}
                            onChange={update("orgName")}
                            className={errors.orgName ? "ring-red-500" : ""}
                        />
                        {errors.orgName && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.orgName}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Forme juridique*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="forme"
                            placeholder="Établissement public, association, fondation, établissement privé"
                            value={values.forme}
                            onChange={update("forme")}
                            className={errors.forme ? "ring-red-500" : ""}
                        />
                        {errors.forme && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.forme}
                            </div>
                        )}
                    </div>
                </div>

                {/* Status du SIRET */}
                {(siretStatus.verified || siretStatus.error) && (
                    <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                        <div></div>
                        <div
                            className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
                                siretStatus.verified
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                        >
                            {siretStatus.verified ? (
                                <CheckCircle className="w-4 h-4" />
                            ) : (
                                <AlertCircle className="w-4 h-4" />
                            )}
                            <span>
                                {siretStatus.verified
                                    ? siretStatus.message
                                    : siretStatus.error}
                            </span>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Adresse de l'organisation *</Label>
                    <div className="flex-1">
                        <TextInput
                            name="adresse"
                            placeholder="12 rue de la mairie"
                            value={values.adresse}
                            onChange={update("adresse")}
                            className={errors.adresse ? "ring-red-500" : ""}
                        />
                        {errors.adresse && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.adresse}
                            </div>
                        )}
                    </div>
                </div>

                {/* Ville + CP */}
                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label></Label>
                    <div className="flex flex-row w-full gap-6">
                        <div className="flex items-center gap-2 flex-1">
                            <div
                                className="text-sm font-semibold whitespace-nowrap"
                                style={{ color: BLUE }}
                            >
                                Ville*
                            </div>
                            <div className="flex flex-col">
                                <TextInput
                                    name="ville"
                                    placeholder="Grenoble"
                                    value={values.ville}
                                    onChange={update("ville")}
                                    className={
                                        errors.ville ? "ring-red-500" : ""
                                    }
                                />
                                {errors.ville && (
                                    <div className="text-red-600 text-xs mt-1 ml-4">
                                        {errors.ville}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                            <div
                                className="text-sm font-semibold whitespace-nowrap"
                                style={{ color: BLUE }}
                            >
                                Code postal*
                            </div>
                            <div>
                                <TextInput
                                    name="cp"
                                    className={`w-[120px] ${
                                        errors.cp ? "ring-red-500" : ""
                                    }`}
                                    placeholder="38014"
                                    inputMode="numeric"
                                    maxLength="5"
                                    value={values.cp}
                                    onChange={update("cp")}
                                />
                                {errors.cp && (
                                    <div className="text-red-600 text-xs mt-1 whitespace-nowrap">
                                        {errors.cp}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===== Représentant légal ===== */}
            <SectionTitle>Représentant légal</SectionTitle>

            <div className="grid gap-4">
                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Prénom*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="prenom"
                            placeholder="Votre prénom"
                            value={values.prenom}
                            onChange={update("prenom")}
                            className={errors.prenom ? "ring-red-500" : ""}
                        />
                        {errors.prenom && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.prenom}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Nom*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="nom"
                            placeholder="Votre nom"
                            value={values.nom}
                            onChange={update("nom")}
                            className={errors.nom ? "ring-red-500" : ""}
                        />
                        {errors.nom && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.nom}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Fonction*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="fonction"
                            placeholder="Enseignant, parent d'élève, animateur, ..."
                            value={values.fonction}
                            onChange={update("fonction")}
                            className={errors.fonction ? "ring-red-500" : ""}
                        />
                        {errors.fonction && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.fonction}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Téléphone*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="tel"
                            placeholder="06.12.34.56.78"
                            type="tel"
                            value={values.tel}
                            onChange={update("tel")}
                            className={errors.tel ? "ring-red-500" : ""}
                        />
                        {errors.tel && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.tel}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
                    <Label>Mail officiel*</Label>
                    <div className="flex-1">
                        <TextInput
                            name="email"
                            type="email"
                            placeholder="nomprenom@mail.com"
                            value={values.email}
                            onChange={update("email")}
                            className={errors.email ? "ring-red-500" : ""}
                        />
                        {errors.email && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {errors.email}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== Vérification de l'existence ===== */}
            {!isForBuy && (
                <>
                    <SectionTitle>Vérification de l'existence</SectionTitle>

                    <div className="text-sm text-slate-700 mb-4">
                        Afin de vérifier l'existence de l'organisme merci de
                        nous fournir l'un des documents suivant en fonction de
                        votre situation&nbsp;:
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-start">
                            <li>Statuts de l'association</li>
                            <li>Kbis</li>
                            <li>
                                Capture d'écran de l'annuaire officiel de
                                l'éducation nationale
                            </li>
                        </ul>
                    </div>
                </>
            )}
            {!isForBuy && (
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
                    <div className="flex-1">
                        <TextInput
                            placeholder="nom du document uploadé"
                            value={values.docName}
                            onChange={update("docName")}
                            readOnly
                            className={errors.docName ? "ring-red-500" : ""}
                        />
                        {errors.docName && (
                            <div className="text-red-600 text-xs mt-1 ml-4">
                                {Array.isArray(errors.docName)
                                    ? errors.docName[0]
                                    : errors.docName}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: BLUE }}
                    >
                        Télécharger
                    </button>
                    <input
                        ref={fileInput}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                </div>
            )}

            {/* Captcha + checkboxes */}
            <div className="mt-8 grid md:grid-cols-[300px_1fr] gap-6">
                {/* Google reCAPTCHA */}
                <div className="p-3 ">
                    <ReCAPTCHA
                        sitekey="6LfXieUrAAAAAEC1mSP8Kk5o1lPqfL4YCJx2tTyj"
                        onChange={(token) => setCaptchaToken(token)}
                        onExpired={() => setCaptchaToken(null)}
                    />
                    {!captchaToken && (
                        <div className="text-xs text-red-600 mt-2">
                            Veuillez valider le captcha avant de continuer
                        </div>
                    )}
                </div>

{/* Mentions */}
<div className="space-y-4 text-sm text-slate-800">
  {!isForBuy && (
    <>
      <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
        <input
          name="c1"
          type="checkbox"
          className={`w-4 h-4 box-border flex-shrink-0 ${errors.c1 ? "ring-2 ring-red-500" : ""}`}
          checked={values.c1}
          onChange={update("c1")}
        />
        <div className="text-start">
          <span>
            Je certifie sur l'honneur que les informations fournies sont exactes et
            que je suis habilité(e) à représenter cet organisme
          </span>
          {errors.c1 && (
            <div className="text-red-600 text-xs mt-1">
              {Array.isArray(errors.c1) ? errors.c1[0] : errors.c1}
            </div>
          )}
        </div>
      </label>

      <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
        <input
          name="c2"
          type="checkbox"
          className={`w-4 h-4 box-border flex-shrink-0 ${errors.c2 ? "ring-2 ring-red-500" : ""}`}
          checked={values.c2}
          onChange={update("c2")}
        />
        <div className="text-start">
          <span>
            J'accepte que TiCO procède à toutes vérifications nécessaires (bases
            officielles, documents, contacts).
          </span>
          {errors.c2 && (
            <div className="text-red-600 text-xs mt-1">
              {Array.isArray(errors.c2) ? errors.c2[0] : errors.c2}
            </div>
          )}
        </div>
      </label>
    </>
  )}

  <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
    <input
      name="c3"
      type="checkbox"
      className={`w-4 h-4 box-border flex-shrink-0 ${errors.c3 ? "ring-2 ring-red-500" : ""}`}
      checked={values.c3}
      onChange={update("c3")}
    />
    <div className="text-start">
      <span>
        J'ai lu et j'accepte les{" "}
        <a
          href="/pdfs/CGU_KIT_TiCO.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 underline hover:text-blue-800"
        >
          conditions générales de vente et d'utilisation
        </a>
      </span>
      {errors.c3 && (
        <div className="text-red-600 text-xs mt-1">
          {Array.isArray(errors.c3) ? errors.c3[0] : errors.c3}
        </div>
      )}
    </div>
  </label>

  {!isForBuy && (
    <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
      <input
        type="checkbox"
        className="w-4 h-4 box-border flex-shrink-0"
        checked={values.optin}
        onChange={update("optin")}
      />
      <span>
        Je souhaite être tenu informé par mail du financement de la box pour l'organisation que j'inscris
      </span>
    </label>
  )}
</div>

            </div>

            {/* Messages d'erreur ou de succès du hook */}
            {hookError && (
                <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{hookError}</span>
                    </div>
                </div>
            )}

            {organisation && (
                <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>
                            Organisation créée avec succès (ID:{" "}
                            {organisation.id})
                        </span>
                    </div>
                </div>
            )}

            {/* Submit */}
            <div className="mt-10 flex justify-center">
                <button
                    type="submit"
                    disabled={hookLoading}
                    className="px-12 py-3 rounded-2xl text-white text-lg font-extrabold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-2"
                    style={{ backgroundColor: BLUE }}
                >
                    {hookLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Création en cours...
                        </>
                    ) : (
                        "Inscription"
                    )}
                </button>
            </div>
        </>
    );
}

import React, { useState, useRef, useEffect } from "react";
import { searchByIdentifier, formatAddress, getFormeJuridique, validateSiret, validateSiren } from '../services/siretApi';
import { Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useOrganisations } from "../services/useOrganisations";
import ReCAPTCHA from "react-google-recaptcha";

const BLUE = "#0a548d";
const ORANGE = "#ff8300";
const PANEL = "#dff3f4";


function Label({ children }) {
  return (
    <div className="text-sm font-semibold" style={{ color: BLUE }}>
      {children}
    </div>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-full bg-white/95 px-4 h-11",
        "placeholder:text-slate-400 text-slate-800",
        "outline-none ring-1 ring-white/60 focus:ring-2 focus:ring-sky-300",
        "transition-all duration-200",
        props.className || "",
      ].join(" ")}
    />
  );
}

function SectionTitle({ children }) {
  return (
    <div
      className="mt-6 mb-4 text-lg font-extrabold"
      style={{ color: ORANGE }}
    >
      {children}
    </div>
  );
}

export default function InscriptionOrganisationForm({
  onSubmit = (data) => console.log("SUBMIT", data),
}) {
  const { createOrganisation, organisation, loading: hookLoading, error: hookError } = useOrganisations();
  const [searchType, setSearchType] = useState('siret');
  const [captchaToken, setCaptchaToken] = useState(null);

  const [values, setValues] = useState({
    orgName: "",
    forme: "",
    siret: "",
    adresse: "",
    ville: "",
    cp: "",
    prenom: "",
    nom: "",
    fonction: "",
    tel: "",
    email: "",
    docName: "",
    nombreBoxes: 20,
    c1: false,
    c2: false,
    c3: false,
    optin: false,
  });
  const [file, setFile] = useState(null);
  const [siretStatus, setSiretStatus] = useState({ loading: false, verified: false, error: null });
  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);
  const searchTimeoutRef = useRef(null);

  const update = (k) => (e) => {
    const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: newValue }));

    // Effacer l'erreur pour ce champ lors de la saisie
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: null }));
    }
  };

  // Auto-recherche avec debounce lors de la saisie
  useEffect(() => {
    // Nettoyer le timeout précédent
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Ne rien faire si le champ est vide
    if (!values.siret || values.siret.length < 9) {
      setSiretStatus({ loading: false, verified: false, error: null });
      return;
    }

    // Attendre 800ms après la dernière saisie avant de lancer la recherche
    searchTimeoutRef.current = setTimeout(() => {
      handleSiretVerification(true); // true = auto-search
    }, 800);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [values.siret, searchType]);

  // Fonction pour vérifier et auto-remplir
  async function handleSiretVerification(isAutoSearch = false) {
    const cleanValue = values.siret.replace(/\D/g, '');

    if (!cleanValue) {
      setSiretStatus({ loading: false, verified: false, error: null });
      return;
    }

    // Validation selon le type de recherche
    let validationResult;
    if (cleanValue.length === 14) {
      validationResult = validateSiret(cleanValue);
    } else if (cleanValue.length === 9) {
      validationResult = validateSiren(cleanValue);
    } else {
      if (!isAutoSearch) {
        setSiretStatus({
          loading: false,
          verified: false,
          error: "Veuillez saisir un identifiant valide : 9 chiffres pour le SIREN ou 14 chiffres pour le SIRET."
        });
      }
      return;
    }

    if (!validationResult.valid) {
      if (!isAutoSearch) {
        setSiretStatus({
          loading: false,
          verified: false,
          error: validationResult.error
        });
      }
      return;
    }

    setSiretStatus({ loading: true, verified: false, error: null });

    try {
      const result = await searchByIdentifier(cleanValue);

      if (result.success && result.data) {
        const { data } = result;

        // Sécuriser l'accès aux champs pour éviter les erreurs si adresse ou autres sont absents
        const adresse = data.adresse || {};
        const orgName = data.denominationUniteLegale || data.nomUniteLegale || "";

        // Seulement mettre à jour si on a des données valides
        if (orgName && orgName !== "Dénomination non disponible") {
          setValues(prev => ({
            ...prev,
            orgName: orgName || prev.orgName,
            forme: data.categorieJuridiqueUniteLegale ? getFormeJuridique(data.categorieJuridiqueUniteLegale) : prev.forme,
            adresse: formatAddress(adresse) || prev.adresse,
            ville: adresse.libelleCommuneEtablissement || prev.ville,
            cp: adresse.codePostalEtablissement || prev.cp,
            siret: data.siret || prev.siret,
          }));

          const typeLabel = searchType === 'siret' ? 'SIRET' : 'SIREN';
          setSiretStatus({
            loading: false,
            verified: true,
            error: null,
            message: isAutoSearch ? `${typeLabel} vérifié automatiquement` : `${typeLabel} vérifié et informations mises à jour automatiquement`
          });
        } else {
          setSiretStatus({
            loading: false,
            verified: false,
            error: `Aucune information trouvée pour ce numéro ${searchType.toUpperCase()}`
          });
        }
      } else {
        const errorMsg = result.error || `Aucune information trouvée pour ce numéro ${searchType.toUpperCase()}`;
        setSiretStatus({
          loading: false,
          verified: false,
          error: errorMsg
        });
      }
    } catch (err) {
      // Gestion des erreurs réseau ou autres
      setSiretStatus({
        loading: false,
        verified: false,
        error: err.message || "Erreur inconnue lors de la vérification"
      });
    }
  }


  function handleUploadClick() {
    fileInput.current?.click();
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setValues((v) => ({ ...v, docName: f.name }));
    }
  }

  // Validation des champs
  function validateForm() {
    const newErrors = {};

    // Validation du nom de l'organisation
    if (!values.orgName || values.orgName.trim().length < 2) {
      newErrors.orgName = "Le nom de l'organisation doit contenir au moins 2 caractères";
    } else if (values.orgName.trim().length > 200) {
      newErrors.orgName = "Le nom de l'organisation ne peut pas dépasser 200 caractères";
    }

    // Validation de la forme juridique
    if (!values.forme || values.forme.trim().length < 2) {
      newErrors.forme = "Veuillez renseigner la forme juridique";
    } else if (values.forme.trim().length > 100) {
      newErrors.forme = "La forme juridique ne peut pas dépasser 100 caractères";
    }

    // Validation du SIRET/SIREN
    if (!values.siret || values.siret.trim().length === 0) {
      newErrors.siret = "Le numéro SIRET ou SIREN est obligatoire";
    } else {
      const cleanSiret = values.siret.replace(/\D/g, '');
      if (cleanSiret.length === 14) {
        const validationResult = validateSiret(cleanSiret);
        if (!validationResult.valid) {
          newErrors.siret = validationResult.error;
        }
      } else if (cleanSiret.length === 9) {
        const validationResult = validateSiren(cleanSiret);
        if (!validationResult.valid) {
          newErrors.siret = validationResult.error;
        }
      } else {
        newErrors.siret = "Le numéro doit contenir 9 chiffres (SIREN) ou 14 chiffres (SIRET)";
      }
    }

    // Validation de l'adresse (optionnelle mais si présente doit être valide)
    if (values.adresse && values.adresse.trim().length > 0) {
      if (values.adresse.trim().length < 5) {
        newErrors.adresse = "L'adresse doit contenir au moins 5 caractères";
      } else if (values.adresse.trim().length > 200) {
        newErrors.adresse = "L'adresse ne peut pas dépasser 200 caractères";
      }
    }

    // Validation de la ville
    if (!values.ville || values.ville.trim().length < 2) {
      newErrors.ville = "Veuillez renseigner la ville";
    } else if (values.ville.trim().length > 100) {
      newErrors.ville = "Le nom de la ville ne peut pas dépasser 100 caractères";
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(values.ville.trim())) {
      newErrors.ville = "Le nom de la ville ne peut contenir que des lettres, espaces, tirets et apostrophes";
    }

    // Validation du code postal (5 chiffres)
    if (!values.cp) {
      newErrors.cp = "Le code postal est obligatoire";
    } else {
      const cleanCP = values.cp.replace(/\s/g, '');
      if (!/^\d{5}$/.test(cleanCP)) {
        newErrors.cp = "Le code postal doit contenir exactement 5 chiffres";
      }
    }

    // Validation du prénom
    if (!values.prenom || values.prenom.trim().length < 2) {
      newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";
    } else if (values.prenom.trim().length > 50) {
      newErrors.prenom = "Le prénom ne peut pas dépasser 50 caractères";
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(values.prenom.trim())) {
      newErrors.prenom = "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes";
    }

    // Validation du nom
    if (!values.nom || values.nom.trim().length < 2) {
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
    } else if (values.nom.trim().length > 50) {
      newErrors.nom = "Le nom ne peut pas dépasser 50 caractères";
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(values.nom.trim())) {
      newErrors.nom = "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes";
    }

    // Validation de la fonction
    if (!values.fonction || values.fonction.trim().length < 2) {
      newErrors.fonction = "Veuillez renseigner votre fonction";
    } else if (values.fonction.trim().length > 100) {
      newErrors.fonction = "La fonction ne peut pas dépasser 100 caractères";
    }

    // Validation du téléphone (format français)
    if (!values.tel) {
      newErrors.tel = "Le téléphone est obligatoire";
    } else {
      const cleanTel = values.tel.replace(/[\s.-]/g, '');
      if (!/^(0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(cleanTel)) {
        newErrors.tel = "Le numéro de téléphone n'est pas valide (format: 06.12.34.56.78 ou +33612345678)";
      }
    }

    // Validation de l'email
    if (!values.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (values.email.trim().length > 100) {
      newErrors.email = "L'email ne peut pas dépasser 100 caractères";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      newErrors.email = "L'adresse email n'est pas valide";
    }

    // Validation du document
    if (!values.docName || values.docName.trim().length === 0) {
      newErrors.docName = "Veuillez télécharger un document justificatif";
    }

    // Validation du nombre de boxes
    if (!values.nombreBoxes || values.nombreBoxes < 1) {
      newErrors.nombreBoxes = "Le nombre de boxes doit être au moins 1";
    } else if (values.nombreBoxes > 999) {
      newErrors.nombreBoxes = "Le nombre de boxes ne peut pas dépasser 999";
    }

    // Validation des checkboxes obligatoires
    if (!values.c1) {
      newErrors.c1 = "Vous devez certifier sur l'honneur l'exactitude des informations";
    }
    if (!values.c2) {
      newErrors.c2 = "Vous devez accepter les vérifications nécessaires";
    }
    if (!values.c3) {
      newErrors.c3 = "Vous devez accepter les conditions générales";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    if (!captchaToken) {
      alert("❌ Veuillez valider le reCAPTCHA avant de soumettre le formulaire.");
      return;
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }

      const errorCount = Object.keys(validationErrors).length;
      const errorMessage = errorCount === 1
        ? "Veuillez corriger l'erreur dans le formulaire"
        : `Veuillez corriger les ${errorCount} erreurs dans le formulaire`;

      alert(`❌ ${errorMessage}`);
      return;
    }

    setErrors({});

    try {
      const result = await createOrganisation({ ...values, file });

      if (result.success) {
        alert("✅ Organisation créée avec succès !");
        onSubmit({ ...values, file });
        // Scroll en haut de la page
        window.scrollTo({
          top: 0,
          behavior: "smooth" // animation fluide
        });
      } else {
        // Afficher les erreurs de validation si présentes
        if (result.errors) {
          setErrors(result.errors);
          // Convertir les erreurs en format lisible
          const errorMessages = Object.entries(result.errors)
            .map(([field, messages]) => {
              const fieldNames = {
                docName: 'Document',
                c1: 'Certification',
                c2: 'Vérifications',
                c3: 'Conditions générales',
                optin: 'Newsletter'
              };
              return `${fieldNames[field] || field}: ${Array.isArray(messages) ? messages[0] : messages}`;
            })
            .join('\n');
          alert(`❌ Erreurs de validation:\n\n${errorMessages}`);
        } else {
          alert(`❌ Erreur : ${result.error}`);
        }
      }
    } catch (err) {
      alert("❌ Erreur lors de l'envoi");
      console.error(err);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl p-5 md:p-7 rounded-2xl shadow-lg"
        style={{ backgroundColor: PANEL }}
      >
        {/* ===== Informations légales ===== */}
        <SectionTitle>Informations légales de l'organisme</SectionTitle>

        <div className="grid gap-4">
          <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
            <Label>Nom de l'organisation*</Label>
            <div className="flex-1">
              <TextInput
                name="orgName"
                placeholder="École primaire du puit"
                value={values.orgName}
                onChange={update("orgName")}
                className={errors.orgName ? 'ring-red-500' : ''}
                required
              />
              {errors.orgName && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.orgName}</div>
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
                className={errors.forme ? 'ring-red-500' : ''}
                required
              />
              {errors.forme && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.forme}</div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
            <Label>Type d'identifiant</Label>
            <select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSiretStatus({ loading: false, verified: false, error: null });
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
              {searchType === 'siret' ? 'N° de SIRET*' : 'N° de SIREN*'}
            </Label>
            <div className="flex-1">
              <div className="flex gap-2">
                <TextInput
                  name="siret"
                  placeholder={
                    searchType === 'siret'
                      ? '12345678901234 (14 chiffres)'
                      : '123456789 (9 chiffres)'
                  }
                  inputMode="numeric"
                  value={values.siret}
                  onChange={update("siret")}
                  className={`flex-1 ${errors.siret ? 'ring-red-500' : ''}`}
                  required
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
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.siret}</div>
              )}
            </div>
          </div>

          {/* Status du SIRET */}
          {(siretStatus.verified || siretStatus.error) && (
            <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
              <div></div>
              <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${siretStatus.verified
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                {siretStatus.verified ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>
                  {siretStatus.verified ? siretStatus.message : siretStatus.error}
                </span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
            <Label>Adresse de l'organisation</Label>
            <div className="flex-1">
              <TextInput
                name="adresse"
                placeholder="12 rue de la mairie"
                value={values.adresse}
                onChange={update("adresse")}
                className={errors.adresse ? 'ring-red-500' : ''}
              />
              {errors.adresse && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.adresse}</div>
              )}
            </div>
          </div>

          {/* Ville + CP */}
          <div className="grid md:grid-cols-[220px_1fr] items-center gap-2 md:gap-3">
            <Label>Ville*</Label>
            <div className="flex-1">
              <div className="grid grid-rows-1 md:grid-cols-[1fr_auto] gap-4">
                <div>
                  <TextInput
                    name="ville"
                    placeholder="Grenoble"
                    value={values.ville}
                    onChange={update("ville")}
                    className={errors.ville ? 'ring-red-500' : ''}
                    required
                  />
                  {errors.ville && (
                    <div className="text-red-600 text-xs mt-1 ml-4">{errors.ville}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold whitespace-nowrap" style={{ color: BLUE }}>
                    Code postal*
                  </div>
                  <div>
                    <TextInput
                      name="cp"
                      className={`w-[120px] ${errors.cp ? 'ring-red-500' : ''}`}
                      placeholder="38014"
                      inputMode="numeric"
                      maxLength="5"
                      value={values.cp}
                      onChange={update("cp")}
                      required
                    />
                    {errors.cp && (
                      <div className="text-red-600 text-xs mt-1 whitespace-nowrap">{errors.cp}</div>
                    )}
                  </div>
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
                className={errors.prenom ? 'ring-red-500' : ''}
                required
              />
              {errors.prenom && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.prenom}</div>
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
                className={errors.nom ? 'ring-red-500' : ''}
                required
              />
              {errors.nom && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.nom}</div>
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
                className={errors.fonction ? 'ring-red-500' : ''}
                required
              />
              {errors.fonction && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.fonction}</div>
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
                className={errors.tel ? 'ring-red-500' : ''}
                required
              />
              {errors.tel && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.tel}</div>
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
                className={errors.email ? 'ring-red-500' : ''}
                required
              />
              {errors.email && (
                <div className="text-red-600 text-xs mt-1 ml-4">{errors.email}</div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Vérification de l'existence ===== */}
        <SectionTitle>Vérification de l'existence</SectionTitle>

        <div className="text-sm text-slate-700 mb-4">
          Afin de vérifier l'existence de l'organisme merci de nous fournir l'un des documents
          suivant en fonction de votre situation :
          <ul className="list-disc pl-6 mt-2 space-y-1 text-start">
            <li>Statuts de l'association</li>
            <li>Kbis</li>
            <li>Capture d'écran de l'annuaire officiel de l'éducation nationale</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="flex-1">
            <TextInput
              placeholder="nom du document uploadé"
              value={values.docName}
              onChange={update("docName")}
              readOnly
              className={errors.docName ? 'ring-red-500' : ''}
            />
            {errors.docName && (
              <div className="text-red-600 text-xs mt-1 ml-4">
                {Array.isArray(errors.docName) ? errors.docName[0] : errors.docName}
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
            <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
              <input
                name="c1"
                type="checkbox"
                className={`mt-1 w-4 h-4 ${errors.c1 ? 'ring-2 ring-red-500' : ''}`}
                checked={values.c1}
                onChange={update("c1")}
              />
              <div className="text-start">
                <span>
                  Je certifie sur l'honneur que les informations fournies sont exactes et que je suis habilité(e) à représenter cet organisme
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
                className={`mt-1 w-4 h-4 ${errors.c2 ? 'ring-2 ring-red-500' : ''}`}
                checked={values.c2}
                onChange={update("c2")}
              />
              <div className="text-start">
                <span>
                  J'accepte que Ti'Co procède à toutes vérifications nécessaires (bases officielles, documents, contacts).
                </span>
                {errors.c2 && (
                  <div className="text-red-600 text-xs mt-1">
                    {Array.isArray(errors.c2) ? errors.c2[0] : errors.c2}
                  </div>
                )}
              </div>
            </label>

            <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
              <input
                name="c3"
                type="checkbox"
                className={`mt-1 w-4 h-4 ${errors.c3 ? 'ring-2 ring-red-500' : ''}`}
                checked={values.c3}
                onChange={update("c3")}
              />
              <div className="text-start">
                <span>
                  J'ai lu et j'accepte les conditions générales de vente et d'utilisation
                </span>
                {errors.c3 && (
                  <div className="text-red-600 text-xs mt-1">
                    {Array.isArray(errors.c3) ? errors.c3[0] : errors.c3}
                  </div>
                )}
              </div>
            </label>

            <label className="flex gap-3 items-start cursor-pointer hover:bg-white/30 p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4"
                checked={values.optin}
                onChange={update("optin")}
              />
              <span>
                Je souhaite être tenu informé par mail du financement de la box pour l'organisation que j'inscris
              </span>
            </label>

            {/* Nombre de boxes */}
            <div className="flex flex-col gap-4 p-3 rounded-lg bg-white/30">
              <Label>Nombre de boxes à collecter*</Label>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setValues(v => ({ ...v, nombreBoxes: Math.max(1, v.nombreBoxes - 1) }));
                      if (errors.nombreBoxes) {
                        setErrors(prev => ({ ...prev, nombreBoxes: null }));
                      }
                    }}
                    className="w-10 h-10 rounded-full text-white font-bold text-xl transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: BLUE }}
                    disabled={values.nombreBoxes <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    name="nombreBoxes"
                    min="1"
                    max="999"
                    value={values.nombreBoxes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setValues(v => ({ ...v, nombreBoxes: Math.max(1, Math.min(999, val)) }));
                      if (errors.nombreBoxes) {
                        setErrors(prev => ({ ...prev, nombreBoxes: null }));
                      }
                    }}
                    className={`w-20 text-center rounded-lg px-3 py-2 font-semibold text-lg outline-none ring-1 ring-white/60 focus:ring-2 focus:ring-sky-300 transition-all ${errors.nombreBoxes ? 'ring-red-500' : ''}`}
                    style={{ color: BLUE }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setValues(v => ({ ...v, nombreBoxes: Math.min(999, v.nombreBoxes + 1) }));
                      if (errors.nombreBoxes) {
                        setErrors(prev => ({ ...prev, nombreBoxes: null }));
                      }
                    }}
                    className="w-10 h-10 rounded-full text-white font-bold text-xl transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: BLUE }}
                    disabled={values.nombreBoxes >= 999}
                  >
                    +
                  </button>
                  <span className="text-sm font-medium ml-2" style={{ color: BLUE }}>
                    box{values.nombreBoxes > 1 ? 'es' : ''}
                  </span>
                </div>
                {errors.nombreBoxes && (
                  <div className="text-red-600 text-xs">{errors.nombreBoxes}</div>
                )}
              </div>
            </div>
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
              <span>Organisation créée avec succès (ID: {organisation.id})</span>
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
              'Inscription'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
import React, { useState, useRef, useEffect } from "react";
import { searchByIdentifier, formatAddress, getFormeJuridique, validateSiret, validateSiren } from '../services/siretApi';
import { useOrganisations } from "../services/useOrganisations";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import OrganisationForm from "./ui/OrganisationForm";

const BLUE = "#0a548d";
const ORANGE = "#ff8200";
const PANEL = "#dff3f4";


export function Label({ children }) {
  return (
    <div className="text-sm font-semibold" style={{ color: BLUE }}>
      {children}
    </div>
  );
}

export function TextInput(props) {
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

export function SectionTitle({ children }) {
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
    for_checkout: false,
  });
  const [file, setFile] = useState(null);
  const [siretStatus, setSiretStatus] = useState({ loading: false, verified: false, error: null });
  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);
  const searchTimeoutRef = useRef(null);

  const update = (k) => (e) => {
    const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: newValue }));
    // Supprime l'erreur pour ce champ lors de la saisie
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[k]; // supprime complètement la clé
      return copy;
    });
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

    // Validation de l'adresse 
    if (values.adresse && values.adresse.trim().length > 0) {
      if (values.adresse.trim().length < 5) {
        newErrors.adresse = "L'adresse doit contenir au moins 5 caractères";
      } else if (values.adresse.trim().length > 200) {
        newErrors.adresse = "L'adresse ne peut pas dépasser 200 caractères";
      }
    }
    if (!values.adresse || values.adresse.trim().length < 1) {
      newErrors.adresse = "Veuillez renseigner la l'adresse";
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
      confirmAlert({
        title: 'ReCAPTCHA non validé',
        message: '❌ Veuillez valider le reCAPTCHA avant de soumettre le formulaire.',
        buttons: [{ label: 'OK' }]
      });
      return;
    }
    if(!siretStatus.verified){
     confirmAlert({
             title: 'Numéro SIRET/SIREN',
             message: '❌ Aucune information trouvée pour ce Numéro SIRET/SIREN',
             buttons: [{ label: 'OK' }]
           });
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
      const errorMessage =
        errorCount === 1
          ? "Veuillez corriger l'erreur dans le formulaire."
          : `Veuillez corriger les ${errorCount} erreurs dans le formulaire.`;

      confirmAlert({
        title: 'Erreurs de validation',
        message: `❌ ${errorMessage}`,
        buttons: [{ label: 'OK' }]
      });
      return;
    }

    setErrors({});

    try {
      const result = await createOrganisation({ ...values, file });

      if (result.success) {
        confirmAlert({
          title: 'Succès',
          message: '✅ Organisation créée avec succès !',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                onSubmit({ ...values, file });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          ]
        });
      } else {
        if (result.errors) {
          setErrors(result.errors);

          const errorMessages = Object.entries(result.errors)
            .map(([field, messages]) => {
              const fieldNames = {
                docName: 'Document',
                c1: 'Certification',
                c2: 'Vérifications',
                c3: 'Conditions générales',
                optin: 'Newsletter'
              };
              return `${fieldNames[field] || field}: ${Array.isArray(messages) ? messages[0] : messages
                }`;
            })
            .join('\n');

          confirmAlert({
            title: 'Erreurs de validation',
            message: `❌ ${errorMessages}`,
            buttons: [{ label: 'OK' }]
          });
        } else {
          confirmAlert({
            title: 'Erreur',
            message: `❌ ${result.error}`,
            buttons: [{ label: 'OK' }]
          });
        }
      }
    } catch (err) {
      console.error(err);
      confirmAlert({
        title: 'Erreur serveur',
        message: '❌ Erreur lors de l\'envoi du formulaire.',
        buttons: [{ label: 'OK' }]
      });
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl p-5 md:p-7 rounded-2xl shadow-lg"
        style={{ backgroundColor: PANEL }}
      >
        <OrganisationForm
          {...{
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
          }}
        /></form>
    </div>
  );
}
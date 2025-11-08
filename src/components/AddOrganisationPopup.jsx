import { useState, useRef, useEffect } from "react";
import { searchByIdentifier, formatAddress, getFormeJuridique, validateSiret, validateSiren } from '../services/siretApi';
import { useOrganisations } from "../services/useOrganisations";
import OrganisationForm from "./ui/OrganisationForm";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import RechercheOrganisation from "./ui/RechercheOrganisation";

const BLUE = "#0a548d";

export default function AddOrganisationPopup({ isOpen, onClose, onSuccess, isForBuy = false }) {
  const { createOrganisation, organisation, loading: hookLoading, error: hookError } = useOrganisations();

  const [formMode, setFormMode] = useState('create'); // 'create' ou 'search'
  const [searchType, setSearchType] = useState('siret');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
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
    c1: false,
    c2: false,
    c3: false,
    optin: false,
    for_checkout: true,
  });
  const [file, setFile] = useState(null);
  const [siretStatus, setSiretStatus] = useState({ loading: false, verified: false, error: null });

  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Fonction de recherche d'organisations
  async function handleSearchOrganisation() {
    const cleanValue = searchQuery.replace(/\D/g, '');

    if (!cleanValue) return;

    let validationResult;
    if (cleanValue.length === 14) {
      validationResult = validateSiret(cleanValue);
    } else if (cleanValue.length === 9) {
      validationResult = validateSiren(cleanValue);
    } else {
      alert("Veuillez saisir un identifiant valide : 9 chiffres pour le SIREN ou 14 chiffres pour le SIRET.");
      return;
    }

    if (!validationResult.valid) {
      alert(validationResult.error);
      return;
    }

    setSearchLoading(true);
    setSearchResults([]);

    try {
      // 🔥 Appel API vers ton backend Laravel
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/api/organisations/lookfor/${cleanValue}`);

      if (!response.ok) {
        if (response.status === 404) {
          alert(`Aucune organisation trouvée pour le SIRET ${cleanValue}.`);
          return;
        }
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const result = await response.json();

      if (result && result.data) {
        const data = result.data;
        console.log("🚀 ~ handleSearchOrganisation ~ data:", data);

        const orgData = {
          id: data.id,
          orgName: data.orgName || data.denominationUniteLegale || data.nomUniteLegale || "Non disponible",
          forme: data.forme || (data.categorieJuridiqueUniteLegale ? getFormeJuridique(data.categorieJuridiqueUniteLegale) : ""),
          siret: data.siret || cleanValue,
          siren: data.siren || cleanValue.slice(0, 9),
          adresse: data.adresse || "",
          ville: data.ville || "",
          cp: data.cp || "",
        };

        setSearchResults([orgData]);
      } else {
        alert(`Aucune organisation trouvée pour le SIRET ${cleanValue}.`);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur lors de la recherche de l'organisation");
    } finally {
      setSearchLoading(false);
    }
  }




  const update = (k) => (e) => {
    const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: newValue }));

    // Supprime l'erreur pour ce champ lors de la saisie
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[k];
      return copy;
    });
  };

  // Auto-recherche avec debounce lors de la saisie
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!values.siret || values.siret.length < 9) {
      setSiretStatus({ loading: false, verified: false, error: null });
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSiretVerification(true);
    }, 800);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [values.siret, searchType]);

  async function handleSiretVerification(isAutoSearch = false) {
    const cleanValue = values.siret.replace(/\D/g, '');

    if (!cleanValue) {
      setSiretStatus({ loading: false, verified: false, error: null });
      return;
    }

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
        const adresse = data.adresse || {};
        const orgName = data.denominationUniteLegale || data.nomUniteLegale || "";

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
    if(!isForBuy){
      if (!values.docName || values.docName.trim().length === 0) {
      newErrors.docName = "Veuillez télécharger un document justificatif";
    }
    }
    



    // Validation des checkboxes obligatoires
    if(!isForBuy){
      if (!values.c1) {
      newErrors.c1 = "Vous devez certifier sur l'honneur l'exactitude des informations";
    }
    if (!values.c2) {
      newErrors.c2 = "Vous devez accepter les vérifications nécessaires";
    }
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
      if (!captchaToken) {
        confirmAlert({
          title: 'ReCAPTCHA non validé',
          message: '❌ Veuillez valider le reCAPTCHA avant de soumettre le formulaire.',
          buttons: [{ label: 'OK' }]
        });
        return;
      }

    }
    if (!siretStatus.verified) {
      confirmAlert({
        title: 'Numéro SIRET/SIREN',
        message: '❌ Aucune information trouvée pour ce Numéro SIRET/SIREN',
        buttons: [{ label: 'OK' }]
      });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const result = await createOrganisation({ ...values, file });
      console.log("🚀 ~ handleSubmit ~ result:", result.data)

      if (result.success && result.data) {
        onSuccess(result.data.data.id);
        onClose();
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  // Sélectionner une organisation depuis les résultats
  function handleSelectOrganisation(org) {
    console.log("🚀 ~ handleSelectOrganisation ~ org:", org)
    setSelectedOrg(org);
    onSuccess(org.id);
    onClose();

  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Container principal avec flexbox pour séparer header et contenu */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#dff3f4] rounded-2xl shadow-2xl">

        {/* Header fixe avec titre et bouton de fermeture */}
        <div className="relative flex-shrink-0 pt-6 px-6 md:px-8 pb-4 bg-[#dff3f4] rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-5 p-1 sm:p-2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center"
            aria-label="Fermer"
          >
            <img src="images/fermeture_popup.png" alt="Fermer" className="w-full h-full object-contain" />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-center ClashDisplayBold mb-4" style={{ color: BLUE }}>
            {formMode === 'create' ? 'Inscrire votre organisation' : 'Rechercher votre organisation'}
          </h2>

          {/* Toggle entre les deux modes */}
          {/* <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => {
                setFormMode('create');
                setSearchResults([]);
                setSelectedOrg(null);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${formMode === 'create'
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              style={formMode === 'create' ? { backgroundColor: BLUE } : {}}
            >
              Créer une nouvelle organisation
            </button>
            <button
              type="button"
              onClick={() => {
                setFormMode('search');
                setErrors({});
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${formMode === 'search'
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              style={formMode === 'search' ? { backgroundColor: BLUE } : {}}
            >
              Rechercher mon organisation
            </button>
          </div> */}
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6">
          {formMode === 'search' ? (
            /* Mode Recherche */
            <RechercheOrganisation
              BLUE={BLUE}
              searchType={searchType}
              setSearchType={setSearchType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchOrganisation={handleSearchOrganisation}
              searchLoading={searchLoading}
              searchResults={searchResults}
              selectedOrg={selectedOrg}
              handleSelectOrganisation={handleSelectOrganisation}
              
            />
          ) : (
            /* Mode Création - Formulaire existant */
            <form onSubmit={handleSubmit}>
              <OrganisationForm
                values={values}
                errors={errors}
                update={update}
                handleSiretVerification={handleSiretVerification}
                siretStatus={siretStatus}
                handleUploadClick={handleUploadClick}
                handleFileChange={handleFileChange}
                fileInput={fileInput}
                captchaToken={captchaToken}
                setCaptchaToken={setCaptchaToken}
                hookError={hookError}
                hookLoading={hookLoading}
                onClose={onClose}
                BLUE={BLUE}
                searchType={searchType}
                setSearchType={setSearchType}
                setSiretStatus={setSiretStatus}
                organisation={organisation}
                isForBuy={true}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

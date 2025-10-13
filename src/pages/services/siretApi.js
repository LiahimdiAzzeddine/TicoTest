// Service pour l'API SIREN officielle - https://data.siren-api.fr/
const API_BASE = 'https://tico.foodhea.com/api';

/**
 * Recherche une entreprise par SIREN (9 chiffres) ou SIRET (14 chiffres)
 * @param {string} value - Le SIREN ou SIRET à rechercher
 * @returns {Promise<Object>} Résultat de la recherche avec données entreprise
 */
export async function searchByIdentifier(value) {
  try {
    // Nettoyer l'entrée (espaces et caractères non numériques)
    const cleanValue = value.replace(/\D/g, '');

    // Vérification de longueur
    if (cleanValue.length !== 9 && cleanValue.length !== 14) {
      throw new Error(
        'Veuillez saisir un identifiant valide : 9 chiffres pour le SIREN ou 14 chiffres pour le SIRET.'
      );
    }

    let etablissementData = null;
    let uniteLegaleData = null;

    // Recherche par SIRET (14 chiffres)
    if (cleanValue.length === 14) {
      const response = await fetch(`${API_BASE}/siret/${cleanValue}`, {
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 404) throw new Error('SIRET non trouvé dans la base de données');
        if (response.status === 401) throw new Error('Erreur d\'authentification API');
        throw new Error(`Erreur API: ${response.status}`);
      }

      const responseData = await response.json();
      etablissementData = responseData.etablissement || responseData;
    }

    // Recherche de l'unité légale (SIREN extrait du SIRET ou SIREN directement)
    const siren = cleanValue.length === 9 ? cleanValue : cleanValue.substring(0, 9);
    if (cleanValue.length === 9) {
      const uniteResponse = await fetch(`${API_BASE}/unite_legale/${cleanValue}`, {
        headers: { 'Accept': 'application/json' },
      });

      if (uniteResponse.ok) {
        const uniteResponseData = await uniteResponse.json();
        uniteLegaleData = uniteResponseData.unite_legale || uniteResponseData;
      }
    }

    // Extraction des données avec fallbacks appropriés
    const denomination =
      uniteLegaleData?.denomination ||
      etablissementData?.unite_legale?.denomination ||
      etablissementData?.denomination_usuelle ||
      (uniteLegaleData?.prenom_1 && uniteLegaleData?.nom
        ? `${uniteLegaleData.prenom_1} ${uniteLegaleData.nom}`.trim()
        : null) ||
      'Dénomination non disponible';

    // Construction de l'objet adresse
    let adresse = null;
    if (etablissementData) {
      adresse = {
        numeroVoieEtablissement: etablissementData.numero_voie || null,
        typeVoieEtablissement: etablissementData.type_voie || null,
        libelleVoieEtablissement: etablissementData.libelle_voie || null,
        codePostalEtablissement: etablissementData.code_postal || null,
        libelleCommuneEtablissement: etablissementData.libelle_commune || null,
      };
    } else if (uniteLegaleData?.etablissement_siege) {
      adresse = {
        numeroVoieEtablissement: uniteLegaleData.etablissement_siege.numero_voie || null,
        typeVoieEtablissement: uniteLegaleData.etablissement_siege.type_voie || null,
        libelleVoieEtablissement: uniteLegaleData.etablissement_siege.libelle_voie || null,
        codePostalEtablissement: uniteLegaleData.etablissement_siege.code_postal || null,
        libelleCommuneEtablissement: uniteLegaleData.etablissement_siege.libelle_commune || null,
      };
    }

    return {
      success: true,
      data: {
        siret: cleanValue.length === 14 ? cleanValue : etablissementData?.siret || null,
        siren,
        denominationUniteLegale: denomination,
        categorieJuridiqueUniteLegale:
          uniteLegaleData?.categorie_juridique ||
          etablissementData?.unite_legale?.categorie_juridique ||
          null,
        identifiantAssociation:
          uniteLegaleData?.identifiant_association ||
          etablissementData?.unite_legale?.identifiant_association ||
          null,
        adresse,
        etatAdministratifEtablissement:
          etablissementData?.etat_administratif ||
          uniteLegaleData?.etablissement_siege?.etat_administratif ||
          null,
        dateCreationEtablissement:
          etablissementData?.date_creation ||
          uniteLegaleData?.date_creation ||
          null,
        activitePrincipaleEtablissement:
          etablissementData?.activite_principale ||
          uniteLegaleData?.activite_principale ||
          null,
        trancheEffectifs:
          etablissementData?.tranche_effectifs ||
          uniteLegaleData?.tranche_effectifs ||
          null,
        etablissementSiege: etablissementData?.etablissement_siege || false,
        economieSocialeSolidaire: uniteLegaleData?.economie_sociale_solidaire === 'O',
        societeMission: uniteLegaleData?.societe_mission === 'O',
      },
    };
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    return {
      success: false,
      error: error.message || 'Erreur inconnue lors de la recherche',
    };
  }
}


/**
 * Formate l'adresse complète à partir des données d'adresse
 * @param {Object} adresseData - Objet contenant les données d'adresse
 * @returns {string} Adresse formatée
 */
export function formatAddress(adresseData) {
  if (!adresseData) return '';
  
  const parts = [];
  
  if (adresseData.numeroVoieEtablissement) {
    parts.push(adresseData.numeroVoieEtablissement);
  }
  
  if (adresseData.typeVoieEtablissement) {
    parts.push(adresseData.typeVoieEtablissement);
  }
  
  if (adresseData.libelleVoieEtablissement) {
    parts.push(adresseData.libelleVoieEtablissement);
  }
  
  return parts.join(' ');
}

/**
 * Formate l'adresse complète avec code postal et commune
 * @param {Object} adresseData - Objet contenant les données d'adresse
 * @returns {string} Adresse complète formatée
 */
export function formatFullAddress(adresseData) {
  if (!adresseData) return '';
  
  const rue = formatAddress(adresseData);
  const ville = [
    adresseData.codePostalEtablissement,
    adresseData.libelleCommuneEtablissement
  ].filter(Boolean).join(' ');
  
  return [rue, ville].filter(Boolean).join(', ');
}

/**
 * Obtient la forme juridique lisible à partir du code
 * @param {string} code - Code de la catégorie juridique
 * @returns {string} Libellé de la forme juridique
 */
export function getFormeJuridique(code) {
  const formes = {
    '1000': 'Entrepreneur individuel',
    '2110': 'Indivision entre personnes physiques',
    '2120': 'Indivision avec personne morale',
    '2210': 'Société créée de fait entre personnes physiques',
    '2220': 'Société créée de fait avec personne morale',
    '2310': 'Société en participation entre personnes physiques',
    '2320': 'Société en participation avec personne morale',
    '2385': 'Société en participation de professions libérales',
    '2400': 'Fiducie',
    '2700': 'Paroisse hors zone concordataire',
    '2900': 'Autre groupement de droit privé non doté de la personnalité morale',
    '3110': 'Représentation ou agence commerciale d\'état ou organisme public étranger',
    '3120': 'Société commerciale étrangère',
    '3205': 'Organisation internationale',
    '3210': 'État, collectivité ou établissement public étranger',
    '3220': 'Société étrangère non immatriculée au RCS',
    '3290': 'Autre personne morale de droit étranger',
    '4110': 'Établissement public national à caractère industriel ou commercial',
    '4120': 'Établissement public national à caractère administratif',
    '4130': 'Exploitant public',
    '4140': 'Établissement public local à caractère industriel ou commercial',
    '4150': 'Régie d\'une collectivité locale à caractère industriel ou commercial',
    '4160': 'Institution Banque de France',
    '5191': 'Société de caution mutuelle',
    '5192': 'Caisse de crédit municipal',
    '5193': 'Caisse de crédit agricole mutuel',
    '5194': 'Caisse d\'épargne et de prévoyance à forme coopérative',
    '5195': 'Association coopérative inscrite',
    '5196': 'Caisse d\'épargne et de prévoyance à forme mutuelle',
    '5202': 'Société en nom collectif',
    '5203': 'Société en commandite',
    '5306': 'Société à responsabilité limitée (SARL)',
    '5307': 'Société anonyme (SA)',
    '5308': 'Société par actions simplifiée (SAS)',
    '5309': 'Société européenne',
    '5385': 'Société d\'exercice libéral à responsabilité limitée (SELARL)',
    '5410': 'Société en nom collectif coopérative',
    '5415': 'Société coopérative commerciale',
    '5422': 'Société coopérative de consommation',
    '5426': 'Société coopérative de production de HLM',
    '5430': 'Société coopérative agricole',
    '5431': 'Union de sociétés coopératives agricoles',
    '5432': 'Société d\'intérêt collectif agricole',
    '5442': 'Société coopérative de transport fluvial',
    '5443': 'Société coopérative artisanale',
    '5451': 'Société coopérative de commerçants-détaillants',
    '5453': 'Société coopérative artisanale de transport',
    '5454': 'Société coopérative de transport',
    '5455': 'Société coopérative de consommation',
    '5458': 'Société coopérative ouvrière de production et de crédit (SCOP)',
    '5459': 'Société coopérative de production',
    '5460': 'Autre société coopérative',
    '5485': 'Société d\'exercice libéral en commandite par actions',
    '5498': 'Société d\'exercice libéral par actions simplifiée (SELAS)',
    '5499': 'Société d\'exercice libéral à forme anonyme (SELAFA)',
    '5505': 'Société civile',
    '5510': 'Société civile de placement immobilier (SCPI)',
    '5515': 'Société civile d\'attribution',
    '5520': 'Société civile coopérative de construction',
    '5522': 'Société civile d\'intérêt collectif pour l\'accession à la propriété',
    '5525': 'Société civile coopérative de consommation',
    '5530': 'Société civile coopérative d\'intérêt maritime',
    '5531': 'Société civile coopérative entre médecins',
    '5532': 'Société civile de moyens (SCM)',
    '5542': 'Société civile d\'exploitation agricole',
    '5543': 'Groupement agricole d\'exploitation en commun (GAEC)',
    '5546': 'Groupement forestier',
    '5547': 'Groupement pastoral',
    '5548': 'Groupement foncier agricole',
    '5551': 'Société civile de placement immobilier pour le commerce et l\'industrie',
    '5552': 'Société civile de placement immobilier dans l\'innovation',
    '5553': 'Société civile de placement immobilier',
    '5559': 'Autre société civile',
    '5585': 'Société d\'exercice libéral civile',
    '5599': 'Autre société civile',
    '5710': 'Groupement européen d\'intérêt économique (GEIE)',
    '5720': 'Groupement d\'intérêt économique (GIE)',
    '5785': 'Groupement de droit privé',
    '5800': 'Société créée avant 1867',
    '6100': 'Caisse d\'Épargne et de Prévoyance',
    '6210': 'Groupement européen d\'intérêt économique',
    '6220': 'Groupement d\'intérêt économique',
    '6316': 'Coopérative d\'utilisation de matériel agricole en commun (CUMA)',
    '6317': 'Union de coopératives agricoles',
    '6318': 'Société coopérative agricole',
    '6411': 'Société d\'assurance mutuelle',
    '6521': 'Société interprofessionnelle de soins ambulatoires',
    '6532': 'Société civile de moyens',
    '6533': 'Groupement d\'intérêt économique de moyens',
    '6534': 'Groupement de coopération sanitaire de moyens',
    '6535': 'Groupement de coopération sociale ou médico-sociale',
    '6595': 'Caisse locale de crédit mutuel',
    '6596': 'Caisse de crédit agricole mutuel',
    '6597': 'Société de caution mutuelle',
    '7210': 'Commune',
    '7220': 'Département',
    '7225': 'Territoire d\'Outre-Mer',
    '7230': 'Région',
    '7343': 'Communauté urbaine',
    '7344': 'Métropole',
    '7345': 'Syndicat intercommunal à vocation multiple (SIVOM)',
    '7346': 'Communauté de communes',
    '7347': 'Communauté d\'agglomération',
    '7710': 'Groupement européen d\'intérêt économique',
    '9220': 'Association déclarée',
    '9221': 'Association déclarée d\'insertion par l\'économique',
    '9222': 'Association intermédiaire',
    '9223': 'Groupement d\'employeurs',
    '9224': 'Association d\'avocats à responsabilité professionnelle individuelle',
    '9230': 'Association déclarée, reconnue d\'utilité publique',
    '9240': 'Congrégation',
    '9260': 'Association de droit local',
    '9300': 'Fondation',
    '9900': 'Autre personne morale de droit privé',
    '9970': 'Groupement de coopération sanitaire à gestion privée'
  };
  
  return formes[code] || `Forme juridique ${code} (non référencée)`;
}

/**
 * Valide le format d'un SIRET avec l'algorithme de Luhn spécifique aux SIRET français
 * @param {string} siret - Le SIRET à valider
 * @returns {Object} Objet avec valid (boolean) et error (string optionnel)
 */
export function validateSiret(siret) {
  const cleanSiret = siret.replace(/\s/g, '');

  // Vérifier la longueur
  if (cleanSiret.length !== 14) {
    return {
      valid: false,
      error: 'Le SIRET doit contenir exactement 14 chiffres'
    };
  }

  // Vérifier que ce sont bien des chiffres
  if (!/^\d{14}$/.test(cleanSiret)) {
    return {
      valid: false,
      error: 'Le SIRET ne doit contenir que des chiffres'
    };
  }

  // Algorithme de Luhn pour valider le SIRET (variante française)
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(cleanSiret[i]);

    // Doubler un chiffre sur deux en partant de la droite (positions paires en partant de 0)
    if (i % 2 === 0) {
      digit *= 2;
      // Si le résultat est > 9, soustraire 9
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  if (sum % 10 !== 0) {
    return {
      valid: false,
      error: 'Le SIRET n\'est pas valide (échec de la vérification par algorithme de Luhn)'
    };
  }

  return { valid: true };
}

/**
 * Valide le format d'un SIREN
 * @param {string} siren - Le SIREN à valider
 * @returns {Object} Objet avec valid (boolean) et error (string optionnel)
 */
export function validateSiren(siren) {
  const cleanSiren = siren.replace(/\s/g, '');
  
  if (cleanSiren.length !== 9) {
    return { 
      valid: false, 
      error: 'Le SIREN doit contenir exactement 9 chiffres' 
    };
  }
  
  if (!/^\d{9}$/.test(cleanSiren)) {
    return { 
      valid: false, 
      error: 'Le SIREN ne doit contenir que des chiffres' 
    };
  }
  
  return { valid: true };
}

/**
 * Formate un SIRET pour l'affichage (XXX XXX XXX XXXXX)
 * @param {string} siret - Le SIRET à formater
 * @returns {string} SIRET formaté
 */
export function formatSiret(siret) {
  const clean = siret.replace(/\s/g, '');
  if (clean.length !== 14) return siret;
  return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`;
}

/**
 * Formate un SIREN pour l'affichage (XXX XXX XXX)
 * @param {string} siren - Le SIREN à formater
 * @returns {string} SIREN formaté
 */
export function formatSiren(siren) {
  const clean = siren.replace(/\s/g, '');
  if (clean.length !== 9) return siren;
  return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
}


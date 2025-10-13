
    export const validateField = (name, value) => {
        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'L\'email est requis';
                if (!emailRegex.test(value)) return 'Email invalide';
                return '';
            case 'nom':
                if (!value.trim()) return 'Le nom est requis';
                if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
                return '';
            case 'prenom':
                if (!value.trim()) return 'Le prénom est requis';
                if (value.trim().length < 2) return 'Le prénom doit contenir au moins 2 caractères';
                return '';
            case 'adresse':
                if (!value.trim()) return 'L\'adresse est requise';
                if (value.trim().length < 5) return 'L\'adresse doit contenir au moins 5 caractères';
                return '';
            case 'ville':
                if (!value.trim()) return 'La ville est requise';
                if (value.trim().length < 2) return 'La ville doit contenir au moins 2 caractères';
                return '';
            case 'codePostal':
                if (!value.trim()) return 'Le code postal est requis';
                const codePostalRegex = /^[0-9]{5}$/;
                if (!codePostalRegex.test(value)) return 'Le code postal doit contenir 5 chiffres';
                return '';
            default:
                return '';
        }
    };
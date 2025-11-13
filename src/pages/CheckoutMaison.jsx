import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import StartSection from "../Templates/StartSection";
import { useStripeCheckout } from "../services/useStripeCheckout";
import { validateField } from "../services/methods";
import PaymentSummary from "../components/ui/PaymentSummary";
import { CartSummary } from "../components/ui/CartSummary";
import { DeliveryForm } from "../components/ui/DeliveryForm";

export default function CheckoutMaison() {
    const { cart, updateQty, totalMaison, removeItem } = useCart();
    const { createCheckoutSession, loading, error } = useStripeCheckout();
    const [mode, setMode] = useState("domicile"); // initialisation dans le parent
    const [shippingCost, setShippingCost] = useState(0);

    const [formData, setFormData] = useState({
        email: "",
        nom: "",
        prenom: "",
        adresse: "",
        ville: "",
        codePostal: "",
        livraison: "domicile",
        relayPoint: null,
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const allProductsArePdf = cart.maison.every((item) =>
        item.id.endsWith("-pdf")
    );

    const totalWithShipping = totalMaison + shippingCost;
    const tva = totalWithShipping * 0.2;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (touched[name]) {
            const error = validateField(name, value, mode);
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        const error = validateField(name, value, mode);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleDeliveryChange = (method) => {
        setFormData((prev) => ({
            ...prev,
            livraison: method,
            relayPoint: method === "domicile" ? null : prev.relayPoint,
        }));
    };

    const handleRelayPointSelect = (relayPoint) => {
        setFormData((prev) => ({
            ...prev,
            relayPoint: relayPoint,
        }));
    };
const validateForm = () => {
  const newErrors = {};

  // Définition initiale des champs obligatoires
  let fields = allProductsArePdf
    ? ["email", "nom", "prenom"]
    : ["email", "nom", "prenom", "codePostal"];

  // Ajout de champs supplémentaires si mode = "domicile"
  if (mode === "domicile") {
    fields = [...fields, "adresse", "ville"];
  }

  // Validation de chaque champ
  fields.forEach((field) => {
    const error = validateField(field, formData[field], mode);
    if (error) {
      newErrors[field] = error;
    }
  });

  return newErrors;
};


    const isFormValid = () => {
        const validationErrors = validateForm();
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async () => {
        const newTouched = allProductsArePdf
            ? {
                  email: true,
                  nom: true,
                  prenom: true,
              }
            : {
                  email: true,
                  nom: true,
                  prenom: true,
                  adresse: true,
                  ville: true,
                  codePostal: true,
              };
        setTouched(newTouched);

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const orderData = {
                customer: {
                    email: formData.email,
                    nom: formData.nom,
                    prenom: formData.prenom,
                    adresse: formData.adresse,
                    ville:
                        formData.livraison === "domicile"
                            ? formData.ville
                            : null,
                    codePostal: formData.codePostal,
                    livraison: formData.livraison,
                    relayPoint:
                        formData.livraison === "relais"
                            ? formData.relayPoint
                            : null,
                },
                items: cart.maison.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.qty,
                })),
                total: totalWithShipping,
                shippingCost: shippingCost,
            };

            createCheckoutSession(orderData);
        } else {
            const firstErrorField = Object.keys(validationErrors)[0];
            const element = document.querySelector(
                `[name="${firstErrorField}"]`
            );
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.focus();
            }
        }
    };

    if (cart.maison.length === 0) {
        return (
            <StartSection>
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0a548d] mb-4">
                            Votre panier maison est vide
                        </h1>
                        <p className="text-gray-600">
                            Ajoutez des produits pour continuer
                        </p>
                    </div>
                </div>
            </StartSection>
        );
    }

    return (
        <>
            <StartSection>
                <div className=" ">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a548d] mb-4 sm:mb-6 lg:mb-8 ClashDisplayBold">
                        Récapitulatif de votre commande
                    </h1>
                    <div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>

                    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 sm:gap-6">
                        {/* Colonne gauche - Produits et formulaire */}
                        <div className="space-y-4 sm:space-y-6">
                            <CartSummary cart={cart} updateQty={updateQty} />
                            <DeliveryForm
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleBlur={handleBlur}
                                handleDeliveryChange={handleDeliveryChange}
                                handleRelayPointSelect={handleRelayPointSelect}
                                errors={errors}
                                touched={touched}
                                allProductsArePdf={allProductsArePdf}
                                setMode={setMode}
                                mode={mode}
                            />
                        </div>
                        {/* Colonne droite - Récapitulatif de paiement */}
                        <PaymentSummary
                            mode={mode}
                            cart={cart}
                            totalMaison={totalMaison}
                            shippingCost={shippingCost}
                            setShippingCost={setShippingCost}
                            totalWithShipping={totalWithShipping}
                            tva={tva}
                            handleSubmit={handleSubmit}
                            isFormValid={isFormValid}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </StartSection>
            <div className="mb-32"></div>
        </>
    );
}

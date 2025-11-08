import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
    export const handleShareEmail = (provider = "auto",organization) => {
        const url = `${window.location.origin}/organizations?org=${organization.id}`;
        const kitPageUrl = `${window.location.origin}/a-l-ecole`;

        const subject = encodeURIComponent("Participez au financement du kit pédagogique TiCO pour nos élèves !");
        const body = encodeURIComponent(
            `Bonjour,\n\n` +
            `Notre école souhaite bénéficier du kit pédagogique TiCO, un outil innovant qui permet d'aborder avec les enfants la consommation alimentaire sous un angle ludique, actuel et inédit.\n\n` +
            `👉 Apprendre à lire et comprendre les étiquettes est devenu un enjeu essentiel pour former les consommateurs éclairés de demain, dans un monde où l'alimentation a un impact sur la santé, l'environnement et la société.\n\n` +
            `📘 Cliquez ici pour découvrir la présentation du kit :\n${kitPageUrl}\n\n` +
            `Pour rendre ce projet possible, nous faisons appel à votre soutien afin de financer l'achat du kit.\n\n` +
            `💛 Chaque participation, même symbolique, compte !\n\n` +
            `👉 Cliquez ici pour participer au financement :\n${url}\n\n` +
            `Merci de votre aide et de votre engagement pour une éducation alimentaire plus éclairée.\n\n` +
            `N'hésitez pas à partager ce projet autour de vous — vos enfants vous remercieront !\n\n` +
            `Bien cordialement,\n${organization.orgName}`
        );

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // Si mobile ou force mailto
        if (isMobile || provider === "mailto") {
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
            return;
        }

        // Si desktop, redirige vers Gmail ou Outlook
        if (provider === "gmail" || (provider === "auto" && !isMobile)) {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&su=${subject}&body=${body}`;
            window.open(gmailUrl, "_blank");
            return;
        }

        if (provider === "outlook" || (provider === "auto" && !isMobile)) {
            const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${subject}&body=${body}`;
            window.open(outlookUrl, "_blank");
            return;
        }
    };


   export const handleShareWhatsApp = (organization) => {
        const url = `${window.location.origin}/organizations?org=${organization.id}`;
        const kitPageUrl = `${window.location.origin}/a-l-ecole`;

        const message = encodeURIComponent(
            `Bonjour,\n\n` +
            `Notre école souhaite bénéficier du kit pédagogique TiCO, un outil innovant pour aborder la consommation alimentaire avec les enfants de façon ludique et actuelle.\n\n` +
            `*Apprendre à lire et comprendre les étiquettes est devenu un enjeu essentiel.*\n\n` +
            `*Découvrez la présentation du kit* : ${kitPageUrl}\n\n` +
            `Pour rendre ce projet possible, nous faisons appel à votre soutien afin de financer l'achat du kit.\n\n` +
            `*Chaque participation, même symbolique, compte !*\n\n` +
            `Participez au financement : ${url}\n\n` +
            `Merci de votre aide et de votre engagement pour une éducation alimentaire plus éclairée.\n\n` +
            `N'hésitez pas à partager ce projet autour de vous — vos enfants vous remercieront !\n\n` +
            `Bien cordialement,\n${organization.orgName}`
        );

        window.open(`https://wa.me/?text=${message}`, '_blank');
    };


    export const handleCopyLink = (organization) => {
    const url = `${window.location.origin}/organizations?org=${organization.id}`;
    const kitPageUrl = `${window.location.origin}/a-l-ecole`;

    const message =
        `Bonjour,\n\n` +
        `Notre école souhaite bénéficier du kit pédagogique TiCO, un outil innovant pour aborder la consommation alimentaire avec les enfants de façon ludique et actuelle.\n\n` +
        `Apprendre à lire et comprendre les étiquettes est devenu un enjeu essentiel.\n\n` +
        `Découvrez la présentation du kit : ${kitPageUrl}\n\n` +
        `Pour rendre ce projet possible, nous faisons appel à votre soutien afin de financer l'achat du kit.\n\n` +
        `Chaque participation, même symbolique, compte !\n\n` +
        `Participez au financement : ${url}\n\n` +
        `Merci de votre aide et de votre engagement pour une éducation alimentaire plus éclairée.\n\n` +
        `N'hésitez pas à partager ce projet autour de vous — vos enfants vous remercieront !\n\n` +
        `Bien cordialement,\n${organization.orgName}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message)
            .then(() => {
                toast.success("Message copié dans le presse-papier", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        background: "#0a548d",
                        color: "#fff",
                        fontWeight: "600",
                        padding: "16px",
                        borderRadius: "10px",
                    },
                });
            })
            .catch(() => {
                toast.error("Impossible de copier le message", {
                    duration: 3000,
                    position: "top-right",
                });
            });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = message;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            toast.success("Message copié dans le presse-papier", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#0a548d",
                    color: "#fff",
                    fontWeight: "600",
                    padding: "16px",
                    borderRadius: "10px",
                },
            });
        } catch {
            toast.error("Impossible de copier le message", {
                duration: 3000,
                position: "top-right",
            });
        }
        document.body.removeChild(textArea);
    }
};


  export  const handleShareOptions = (organization) => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-[#0a548d] mb-2 text-center ClashDisplayBold">
                            Partager le projet
                        </h2>
                        <p className="text-sm text-gray-600 mb-6 text-center">
                            Choisissez votre méthode de partage
                        </p>

                        <div className="space-y-3">
                            {isMobile ? (
                                <button
                                    onClick={() => {
                                        handleShareEmail("mailto",organization);
                                        onClose();
                                    }}
                                    className="w-full bg-gradient-to-r from-[#0a548d] to-[#0d6bb3] hover:from-[#073d66] hover:to-[#0a548d] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all transform hover:scale-105 shadow-md"
                                >
                                    <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                        <img src="images/email.png" className="w-8 h-8"/>
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold">Email</div>
                                        <div className="text-xs opacity-90">Partager par email</div>
                                    </div>
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            handleShareEmail("gmail",organization);
                                            onClose();
                                        }}
                                        className="w-full bg-gradient-to-r from-[#4285F4] to-[#357AE8] hover:from-[#357AE8] hover:to-[#2a65c4] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all transform hover:scale-105 shadow-md"
                                    >
                                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                           <img src="images/email.png" className="w-8 h-8"/>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold">Gmail</div>
                                            <div className="text-xs opacity-90">Partager via Gmail</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleShareEmail("outlook",organization);
                                            onClose();
                                        }}
                                        className="w-full bg-gradient-to-r from-[#0078D4] to-[#005A9E] hover:from-[#005A9E] hover:to-[#004578] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all transform hover:scale-105 shadow-md"
                                    >
                                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                            <img src="images/email.png" className="w-8 h-8"/>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold">Outlook</div>
                                            <div className="text-xs opacity-90">Partager via Outlook</div>
                                        </div>
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => {
                                    handleShareWhatsApp(organization);
                                    onClose();
                                }}
                                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0E7A6B] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all transform hover:scale-105 shadow-md"
                            >
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                    <img src="images/WhatsApp.png" className="w-8 h-8"/>
                                </div>
                                <div className="text-left">
                                    <div className="font-bold">WhatsApp</div>
                                    <div className="text-xs opacity-90">Partager sur WhatsApp</div>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    handleCopyLink(organization);
                                    onClose();
                                }}
                                className="w-full bg-gradient-to-r from-[#ff8200] to-[#ff9a33] hover:from-[#e67600] hover:to-[#ff8200] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all transform hover:scale-105 shadow-md"
                            >
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                   <img src="images/fleche.jpeg" className="w-8 h-8"/>
                                </div>
                                <div className="text-left">
                                    <div className="font-bold">Copier le lien</div>
                                    <div className="text-xs opacity-90">Copier dans le presse-papier</div>
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                        >
                            Annuler
                        </button>
                    </div>
                );
            },
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    };

import React, { useMemo } from "react";

/* palette */
const BLUE = "#1f6ad6";
const ORANGE = "#ff7a00";
const PANEL = "#e6f4f5";

/* utils */
const eur= (n) =>
  `${n.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}€`;

/* ---------- stepper quantité ---------- */
function QtyStepper({ value, onChange, min = 1, max = 99, label = "Enfants" }) {
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center gap-4 rounded-full px-3 py-1 border"
        style={{ borderColor: BLUE }}
      >
        <button
          type="button"
          aria-label="Diminuer"
          onClick={dec}
          className="h-8 w-8 grid place-items-center rounded-full text-[18px] text-white"
          style={{ background: BLUE }}
        >
          –
        </button>
        <span className="min-w-6 text-[18px] font-bold" style={{ color: BLUE }}>
          {value}
        </span>
        <button
          type="button"
          aria-label="Augmenter"
          onClick={inc}
          className="h-8 w-8 grid place-items-center rounded-full text-[18px] text-white"
          style={{ background: BLUE }}
        >
          +
        </button>
      </div>
      <div className="mt-1 text-slate-500 text-sm">{label}</div>
    </div>
  );
}

/* ---------- icônes (SVG inline) ---------- */
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={ORANGE} strokeWidth="2">
    <path d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" />
    <path d="M9.5 12.5l2 2 3-4" stroke={BLUE} />
  </svg>
);
const RecycleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={ORANGE} strokeWidth="2">
    <path d="M16 3l5 5-5 5" />
    <path d="M20 8H10a6 6 0 100 12" stroke={BLUE} />
  </svg>
);
const VerifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={ORANGE} strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
    <path d="M8.5 11.5l2 2 3-4" stroke={BLUE} />
  </svg>
);

/* ---------- bloc upsell ---------- */
function UpsellCard({
  calImg = "/images/calendrier.png",
  guideImg = "/images/guide.png",
  title = "Le Ti’Pack",
  lines = ["Calendrier et guide", "Version PDF"],
  oldPrice = 24.9,
  newPrice = 19.99,
}) {
  return (
    <div
      className="rounded-2xl border p-3 md:p-4 flex items-center gap-4"
      style={{ borderColor: BLUE }}
    >
      <div className="flex items-center">
        <img alt="Calendrier" src={calImg} className="w-[110px] h-[88px] object-contain" />
        <span className="mx-2 font-bold text-2xl" style={{ color: BLUE }}>
          +
        </span>
        <img alt="Guide" src={guideImg} className="w-[88px] h-[88px] object-contain" />
      </div>

      <div className="leading-tight">
        <div className="font-extrabold" style={{ color: BLUE }}>{title}</div>
        {lines.map((l, i) => (
          <div key={i} className="text-slate-700">{l}</div>
        ))}
        <div className="mt-1 text-slate-500 line-through">{eur(oldPrice)}</div>
        <div className="font-semibold">{eur(newPrice)}</div>
      </div>
    </div>
  );
}

/* ---------- composant principal ---------- */
export default function RecapCommande({
  orgName = "Nom de l’organisme",
  qty,
  onQtyChange,
  unitPrice = 4, // prix par enfant
  vatRate = 0.2,
  onPay = () => {},
  boxImg = "/images/box.png",
}) {
  const total = useMemo(() => unitPrice * qty, [unitPrice, qty]);
  const vat = useMemo(() => +(total * vatRate).toFixed(2), [total, vatRate]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <h2 className="text-xl md:text-2xl font-extrabold" style={{ color: BLUE }}>
        Récapitulatif de votre commande
      </h2>

      {/* ---- ligne produit ---- */}
      <div
        className="rounded-2xl border px-4 py-3 md:px-6 md:py-4 flex items-center gap-4 md:gap-6"
        style={{ borderColor: BLUE }}
      >
        <img
          alt="Box Ti’Conso"
          src={boxImg}
          className="w-[74px] h-[92px] object-contain"
        />

        <div className="flex-1">
          <div className="text-[18px] md:text-[20px] font-extrabold" style={{ color: BLUE }}>
            Contribution à la box Ti’Conso pour
          </div>
          <div className="text-[18px] font-extrabold" style={{ color: ORANGE }}>
            {orgName}
          </div>
        </div>

        <QtyStepper value={qty} onChange={onQtyChange} label="Enfants" />

        <div className="ml-2 text-[18px] font-extrabold" style={{ color: BLUE }}>
          {eur(total)}
        </div>
      </div>

      {/* ---- panneau total ---- */}
      <div
        className="rounded-2xl px-6 py-6 space-y-4"
        style={{ background: PANEL }}
      >
        <div className="flex items-center justify-between">
          <div className="text-[20px] font-extrabold" style={{ color: BLUE }}>
            Montant de la contribution
          </div>
          <div className="text-[20px] font-extrabold" style={{ color: BLUE }}>
            {eur(total)}
          </div>
        </div>

        <div className="h-[2px] w-40" style={{ background: ORANGE }} />

        <div className="flex items-start justify-between">
          <div>
            <div className="text-[22px] font-extrabold" style={{ color: BLUE }}>
              Total à payer
            </div>
            <div className="text-slate-500 text-sm -mt-1">
              Dont TVA {eur(vat)}
            </div>
          </div>
          <div className="text-[22px] font-extrabold" style={{ color: BLUE }}>
            {eur(total)}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => onPay?.({ qty, total })}
            className="w-full md:w-[360px] mx-auto block rounded-full px-6 py-3 text-white font-semibold"
            style={{ background: BLUE }}
          >
            Payer
          </button>
        </div>

        <div className="grid gap-3 pt-2">
          <div className="flex items-start gap-3">
            <ShieldIcon />
            <div className="text-slate-700">
              Paiement sécurisé via STRIPE
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RecycleIcon />
            <div className="text-slate-700">
              Durée de collecte illimitée, réaffectation possible au bout de 24 mois à un autre organisme similaire si l’objectif n’est pas atteint. (voir CGV)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <VerifyIcon />
            <div className="text-slate-700">
              Organisme vérifié par TiCO
            </div>
          </div>
        </div>
      </div>

      {/* ---- upsell ---- */}
      <div className="space-y-3">
        <div className="text-center text-[18px] md:text-[20px] font-extrabold" style={{ color: BLUE }}>
          Vous pourriez aimer aussi :
        </div>
        <UpsellCard />
      </div>
    </section>
  );
}

/* ---------- exemple d'utilisation ----------
<RecapCommande
  orgName="École du Puit"
  qty={4}
  onQtyChange={setQty}
  unitPrice={4}
  onPay={(payload)=>console.log(payload)}
  boxImg="/images/box-tico.png"
/>
------------------------------------------- */

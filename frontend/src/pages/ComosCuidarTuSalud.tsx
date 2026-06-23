import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Eye,
  HeartPulse,
  Scale,
  Stethoscope,
  Thermometer,
  TrendingDown,
  Zap,
} from "lucide-react";

/* ─── SEO ─────────────────────────────────────────────────────────────── */

const PAGE_TITLE =
  "Cómo Cuidar Tu Salud | Chequeos Médicos y Análisis de Sangre | ROGA Laboratorio";
const PAGE_DESCRIPTION =
  "Descubre por qué es importante acudir al médico cada 6 meses y realizar análisis de sangre anualmente. Conoce qué enfermedades pueden detectarse de forma temprana mediante estudios de laboratorio.";
const PAGE_URL = "https://roga.mx/como-cuidar-tu-salud";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cada cuánto debo hacerme estudios de sangre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Se recomienda realizarse un análisis de sangre al menos una vez al año, incluso si te sientes bien. Si tienes antecedentes familiares de diabetes, hipertensión o enfermedades del corazón, tu médico puede indicar una frecuencia mayor. Los análisis anuales permiten detectar alteraciones antes de que se conviertan en enfermedades graves.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué enfermedades detecta una biometría hemática?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La biometría hemática completa (BHC) permite detectar anemia, infecciones bacterianas o virales, procesos inflamatorios, leucemia y otras enfermedades hematológicas. Es uno de los estudios más completos e informativos del estado general de salud.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo tener diabetes sin síntomas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. La diabetes tipo 2 puede desarrollarse durante años sin presentar síntomas evidentes. Muchas personas descubren que tienen niveles elevados de glucosa únicamente cuando se realizan un análisis de sangre de rutina. Por eso se considera una enfermedad silenciosa y es fundamental hacerse estudios preventivos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué estudios debo realizarme después de los 40 años?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Después de los 40 años se recomienda un perfil metabólico completo que incluya: biometría hemática, glucosa en ayuno, hemoglobina glucosilada, perfil de lípidos (colesterol y triglicéridos), función hepática y renal, perfil tiroideo, vitamina D y B12. También se sugiere una consulta médica general y revisión de presión arterial.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito hacerme estudios si me siento bien?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Muchas enfermedades crónicas como la diabetes, hipertensión, dislipidemia e hipotiroidismo no presentan síntomas en sus etapas iniciales. Detectarlas a tiempo mediante estudios preventivos permite iniciar un tratamiento oportuno y evitar complicaciones futuras que pueden ser irreversibles.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si tengo antecedentes familiares de diabetes o hipertensión?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los antecedentes familiares aumentan significativamente el riesgo de desarrollar estas enfermedades. Se recomienda iniciar los estudios preventivos a una edad más temprana (desde los 25-30 años), con mayor frecuencia y con un seguimiento médico más cercano. Una consulta preventiva con tu médico te ayudará a definir el plan de estudios adecuado.",
      },
    },
  ],
};

const MEDICAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "ROGA Laboratorio médico y salud ocupacional",
  url: "https://roga.mx",
  telephone: "+524448593032",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Blvd. Rio Españita 450-2, Esmeralda",
    addressLocality: "San Luis Potosí",
    addressRegion: "S.L.P.",
    postalCode: "78399",
    addressCountry: "MX",
  },
  medicalSpecialty: "Laboratory",
  availableService: [
    { "@type": "MedicalTest", name: "Biometría Hemática Completa" },
    { "@type": "MedicalTest", name: "Glucosa en Ayuno" },
    { "@type": "MedicalTest", name: "Hemoglobina Glucosilada" },
    { "@type": "MedicalTest", name: "Perfil de Lípidos" },
    { "@type": "MedicalTest", name: "Función Hepática" },
    { "@type": "MedicalTest", name: "Función Renal" },
    { "@type": "MedicalTest", name: "Perfil Tiroideo" },
    { "@type": "MedicalTest", name: "Vitamina D y B12" },
  ],
};

/* ─── Datos ────────────────────────────────────────────────────────────── */

const RAZONES_MEDICO = [
  {
    icon: Stethoscope,
    title: "Evaluación general de salud",
    description:
      "Una valoración clínica periódica permite conocer el estado actual de tu cuerpo y detectar cambios que no percibimos día a día.",
  },
  {
    icon: Activity,
    title: "Detección temprana de enfermedades",
    description:
      "Enfermedades como diabetes, hipertensión y colesterol elevado pueden identificarse antes de causar daño permanente.",
  },
  {
    icon: HeartPulse,
    title: "Control de presión arterial",
    description:
      "La hipertensión no duele. Solo un médico puede detectarla y establecer un seguimiento adecuado para proteger tu corazón.",
  },
  {
    icon: TrendingDown,
    title: "Seguimiento de enfermedades crónicas",
    description:
      "Si ya tienes diabetes, hipotiroidismo u otra condición crónica, las visitas regulares aseguran que tu tratamiento siga siendo efectivo.",
  },
  {
    icon: Scale,
    title: "Orientación nutricional",
    description:
      "Tu médico puede guiarte sobre hábitos alimentarios, peso saludable y cambios de estilo de vida basados en tus resultados.",
  },
  {
    icon: CheckCircle2,
    title: "Prevención de complicaciones",
    description:
      "Actuar sobre factores de riesgo a tiempo puede prevenir infartos, insuficiencia renal, ceguera y amputaciones relacionadas con enfermedades crónicas.",
  },
];

type EstudioCard = {
  title: string;
  detects: string[];
};

const ESTUDIOS: EstudioCard[] = [
  {
    title: "Biometría Hemática Completa",
    detects: [
      "Anemia",
      "Infecciones",
      "Procesos inflamatorios",
      "Enfermedades hematológicas",
    ],
  },
  {
    title: "Glucosa",
    detects: ["Prediabetes", "Diabetes tipo 2"],
  },
  {
    title: "Hemoglobina Glucosilada",
    detects: ["Control glucémico", "Diabetes"],
  },
  {
    title: "Perfil de Lípidos",
    detects: [
      "Colesterol elevado",
      "Triglicéridos altos",
      "Riesgo cardiovascular",
    ],
  },
  {
    title: "Función Hepática",
    detects: ["Hígado graso", "Hepatitis", "Daño hepático"],
  },
  {
    title: "Función Renal",
    detects: ["Enfermedad renal", "Daño renal temprano"],
  },
  {
    title: "Perfil Tiroideo",
    detects: ["Hipotiroidismo", "Hipertiroidismo"],
  },
  {
    title: "Vitamina D y B12",
    detects: [
      "Deficiencias nutricionales",
      "Fatiga relacionada con déficit vitamínico",
    ],
  },
];

const SENALES = [
  { icon: Zap, label: "Fatiga constante" },
  { icon: Activity, label: "Mareos frecuentes" },
  { icon: HeartPulse, label: "Dolores de cabeza recurrentes" },
  { icon: TrendingDown, label: "Pérdida de peso inexplicable" },
  { icon: Thermometer, label: "Sed excesiva" },
  { icon: Eye, label: "Visión borrosa" },
  { icon: AlertTriangle, label: "Presión arterial elevada" },
];

const FAQS = FAQ_SCHEMA.mainEntity;

/* ─── Componentes internos ─────────────────────────────────────────────── */

function RazonCard({
  razon,
  index,
}: {
  razon: (typeof RAZONES_MEDICO)[number];
  index: number;
}) {
  const Icon = razon.icon;
  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
          <Icon size={22} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {razon.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-foreground-soft">
        {razon.description}
      </p>
    </article>
  );
}

function EstudioCard({ estudio }: { estudio: EstudioCard }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="text-sm font-semibold text-foreground">{estudio.title}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary">
        Detecta
      </p>
      <ul className="mt-2 space-y-1.5">
        {estudio.detects.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-foreground-soft"
          >
            <CheckCircle2
              size={14}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base font-semibold text-foreground">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={[
            "shrink-0 text-primary transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden
        />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-foreground-soft">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ─── Página principal ─────────────────────────────────────────────────── */

export function ComosCuidarTuSalud() {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta
          name="keywords"
          content="salud preventiva, chequeo médico, análisis de sangre, laboratorio clínico, biometría hemática, glucosa, colesterol, diabetes, prevención de enfermedades"
        />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="ROGA Laboratorio" />
        <meta property="og:locale" content="es_MX" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />

        {/* JSON-LD FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify(FAQ_SCHEMA)}
        </script>

        {/* JSON-LD MedicalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify(MEDICAL_BUSINESS_SCHEMA)}
        </script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="border-b border-border bg-muted/50 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <HeartPulse size={14} aria-hidden />
              Salud preventiva
            </span>
            <h1 className="font-display mt-4 text-4xl tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Cómo Cuidar Tu Salud
            </h1>
            <p className="mt-4 text-lg font-medium leading-snug text-foreground sm:text-xl">
              La prevención es una de las mejores inversiones que puedes hacer
              por ti y tu familia.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground-soft">
              Muchas enfermedades pueden desarrollarse durante años sin
              presentar síntomas. Los chequeos médicos periódicos y los
              análisis de laboratorio ayudan a detectar problemas de salud
              antes de que se conviertan en complicaciones mayores.
            </p>
            <Link
              to="/agendar"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
            >
              Agendar Consulta
            </Link>
          </div>
        </div>
      </section>

      {/* ── ¿Por qué acudir al médico cada 6 meses? ── */}
      <section
        className="bg-background py-14 sm:py-20"
        aria-labelledby="razones-medico-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="razones-medico-heading"
              className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
            >
              ¿Por qué acudir al médico cada 6 meses?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground-soft">
              Una visita médica regular no es solo para cuando te sientes mal.
              Es la herramienta más efectiva para mantener tu salud a largo
              plazo.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RAZONES_MEDICO.map((razon, i) => (
              <RazonCard key={razon.title} razon={razon} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿Por qué análisis cada año? ── */}
      <section
        className="border-y border-border bg-muted/40 py-14 sm:py-20"
        aria-labelledby="analisis-heading"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            id="analisis-heading"
            className="font-display text-center text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            ¿Por qué realizar un análisis de sangre cada año?
          </h2>
          <ul className="mt-10 space-y-6">
            <li className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <Activity size={20} aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Muchas enfermedades son silenciosas
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground-soft">
                  La diabetes tipo 2, el colesterol elevado, la hipertensión y
                  el hipotiroidismo pueden estar presentes durante años sin
                  causar molestias evidentes. Solo un análisis de laboratorio
                  puede revelarlas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <Stethoscope size={20} aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Los análisis detectan alteraciones antes de los síntomas
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground-soft">
                  Un valor fuera de rango en glucosa o colesterol puede
                  aparecer en los resultados meses o años antes de que el
                  paciente sienta cualquier molestia, dando tiempo de actuar.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <CheckCircle2 size={20} aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Un chequeo anual puede prevenir complicaciones futuras
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground-soft">
                  Detectar una prediabetes a tiempo permite revertirla con
                  cambios en el estilo de vida. Ignorarla durante años puede
                  derivar en diabetes con daño renal, ocular y cardiovascular.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Enfermedades detectables ── */}
      <section
        className="bg-background py-14 sm:py-20"
        aria-labelledby="estudios-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="estudios-heading"
              className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
            >
              ¿Qué enfermedades pueden detectarse mediante análisis de sangre?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground-soft">
              Cada estudio de laboratorio tiene un propósito específico. Conoce
              lo que puede revelar cada uno.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ESTUDIOS.map((estudio) => (
              <EstudioCard key={estudio.title} estudio={estudio} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Señales de alerta ── */}
      <section
        className="bg-brand-ink py-14 sm:py-20"
        aria-labelledby="senales-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
              <AlertTriangle size={14} aria-hidden />
              Presta atención
            </span>
            <h2
              id="senales-heading"
              className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl"
            >
              Señales de alerta
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Si presentas alguno de estos síntomas de forma frecuente, no lo
              ignores. Pueden ser indicadores de una enfermedad que requiere
              atención médica.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SENALES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="text-sm font-medium text-white">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-white/50">
            La presencia de uno o varios de estos síntomas no es un diagnóstico,
            pero sí una razón para consultar a un médico.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="bg-background py-14 sm:py-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="font-display text-center text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-center text-base leading-relaxed text-foreground-soft">
            Respuestas a las dudas más comunes sobre salud preventiva y estudios
            de laboratorio.
          </p>
          <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card px-6 shadow-card">
            {FAQS.map((faq) => (
              <FaqItem
                key={faq.name}
                question={faq.name}
                answer={faq.acceptedAnswer.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="border-t border-border bg-accent/30 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            ¿Hace más de un año que no te realizas un chequeo?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-soft">
            Agenda tu consulta médica o tus estudios de laboratorio y conoce el
            estado actual de tu salud. La detección temprana puede marcar la
            diferencia.
          </p>
          <Link
            to="/agendar"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
          >
            Agendar Ahora
          </Link>
        </div>
      </section>
    </>
  );
}

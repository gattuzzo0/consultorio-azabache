export type ServicioIconKey =
  | "laboratorio"
  | "antidoping"
  | "examenes"
  | "certificados"
  | "espirometria"
  | "audiometria"
  | "electrocardiograma"
  | "consulta"
  | "enfermeria"
  | "presion-arterial";

export type ServicioPrecio = {
  label?: string;
  range: string;
};

export type Servicio = {
  id: string;
  name: string;
  icon: ServicioIconKey;
  /** Ruta desde public/ (se sirve como /nombre.png) */
  imageSrc: string;
  description: string;
  prices: ServicioPrecio[];
};

export const SERVICIOS: Servicio[] = [
  {
    id: "laboratorio",
    name: "Pruebas de laboratorio",
    icon: "laboratorio",
    imageSrc: "/servicio-laboratorio.png",
    description:
      "Análisis clínicos de sangre, orina y otros fluidos. Incluye perfiles básicos y estudios especializados según el requerimiento médico u ocupacional.",
    prices: [{ label: "Perfil básico", range: "$200 – $1,500+" }],
  },
  {
    id: "antidoping",
    name: "Antidoping",
    icon: "antidoping",
    imageSrc: "/servicio-antidoping.png",
    description:
      "Detección de sustancias prohibidas en orina para exámenes de ingreso, revisiones periódicas y cumplimiento de políticas de medicina ocupacional.\n\nAntidoping de 3 elementos:\n• Marihuana (THC)\n• Cocaína (COC)\n• Anfetaminas (AMP)\n\nAntidoping de 5 elementos (incluye los 3 anteriores, más):\n• Metanfetaminas (MET) (como el cristal o el éxtasis)\n• Opiáceos (OPI) (como la heroína, morfina y codeína)",
    prices: [
      { label: "Antidoping de 3 elementos", range: "$350" },
      { label: "Antidoping de 5 elementos", range: "$450" },
    ],
  },
  {
    id: "examenes",
    name: "Exámenes Médicos",
    icon: "examenes",
    imageSrc: "/servicio-examenes.png",
    description:
      "Valoración médica para ingreso laboral o revisiones periódicas, con los estudios necesarios para cumplir normativa de medicina ocupacional.",
    prices: [{ label: "Ingreso / periódico", range: "$500 – $2,000" }],
  },
  {
    id: "certificados",
    name: "Certificados Médicos/escolares",
    icon: "certificados",
    imageSrc: "/servicio-certificados.png",
    description:
      "Emisión de certificados médicos para trámites laborales, escolares o administrativos, con valoración clínica previa cuando aplique.",
    prices: [{ range: "150" }],
  },
  {
    id: "espirometria",
    name: "Espirometrías",
    icon: "espirometria",
    imageSrc: "/servicio-espirometria.png",
    description:
      "Estudio de la función pulmonar para detectar alteraciones respiratorias, requerido frecuentemente en exámenes de medicina ocupacional.",
    prices: [{ range: "$350" }],
  },
  {
    id: "audiometria",
    name: "Audiometrías",
    icon: "audiometria",
    imageSrc: "/servicio-audiometria.png",
    description:
      "Evaluación de la capacidad auditiva para identificar pérdida de audición, especialmente en personal expuesto a ruido en el trabajo.",
    prices: [{ range: "$350" }],
  },
  {
    id: "electrocardiograma",
    name: "Electrocardiograma",
    icon: "electrocardiograma",
    imageSrc: "/servicio-electrocardiograma.png",
    description:
      "Registro de la actividad eléctrica del corazón (ECG) para valorar ritmo cardíaco y apoyar el diagnóstico en consulta o examen médico.",
    prices: [{ range: "$600" }],
  },
  {
    id: "consulta",
    name: "Consulta Médica",
    icon: "consulta",
    imageSrc: "/servicio-consulta.png",
    description:
      "Atención médica general con valoración clínica, orientación y seguimiento para el cuidado de tu salud.",
    prices: [{ label: "Consulta general", range: "$150 – $300" }],
  },
  {
    id: "enfermeria",
    name: "Atención de enfermería",
    icon: "enfermeria",
    imageSrc: "/servicio-enfermeria.png",
    description:
      "Curaciones, aplicación de inyecciones, toma de signos vitales y cuidados básicos con personal capacitado.",
    prices: [{ range: "$100 – $400" }],
  },
  {
    id: "presion-arterial",
    name: "Monitoreo de Presión arterial",
    icon: "presion-arterial",
    imageSrc: "/servicio-presion.png",
    description:
      "Medición de presión arterial en consulta o monitoreo ambulatorio prolongado (MAPA 24 h) para un control más preciso.",
    prices: [
      { label: "Toma simple", range: "$50" },
      { label: "MAPA 24 h", range: "$1,500" },
    ],
  },
];

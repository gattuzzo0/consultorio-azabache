export type SaludOcupacionalBloque = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const SALUD_OCUPACIONAL_INTRO = {
  title: "Salud ocupacional",
  lead:
    "ROGA puede ser un aliado estratégico para las empresas en materia de salud ocupacional. Como laboratorio de análisis clínicos y consulta médica, apoyamos tanto la prevención como la detección temprana de enfermedades relacionadas con el trabajo.",
};

export const SALUD_OCUPACIONAL_BLOQUES: SaludOcupacionalBloque[] = [
  {
    id: "examenes",
    title: "Exámenes médicos ocupacionales",
    description:
      "Evaluaciones médicas para determinar si un trabajador es apto para desempeñar ciertas funciones.",
    items: [
      "Exámenes de ingreso",
      "Exámenes periódicos",
      "Exámenes por cambio de puesto",
      "Exámenes de egreso",
    ],
  },
  {
    id: "vigilancia",
    title: "Vigilancia de la salud de los trabajadores",
    description:
      "Monitoreo de indicadores de salud para detectar riesgos antes de que se conviertan en enfermedades.",
    items: [
      "Glucosa y diabetes",
      "Perfil lipídico (colesterol y triglicéridos)",
      "Presión arterial",
      "Función hepática y renal",
      "Evaluación visual y auditiva",
    ],
  },
  {
    id: "deteccion",
    title: "Detección de enfermedades laborales",
    description:
      "Según los riesgos presentes en la empresa, el laboratorio puede realizar estudios especializados:",
    items: [
      "Audiometrías para trabajadores expuestos a ruido",
      "Espirometrías para exposición a polvos, humos o químicos",
      "Monitoreo biológico de metales pesados (plomo, mercurio, cadmio)",
      "Pruebas toxicológicas",
      "Estudios musculoesqueléticos",
    ],
  },
  {
    id: "campanas",
    title: "Campañas preventivas",
    description:
      "Organización de jornadas de salud dentro de las empresas:",
    items: [
      "Detección de diabetes",
      "Detección de hipertensión",
      "Control de obesidad",
      "Vacunación",
      "Charlas de nutrición y bienestar",
    ],
  },
  {
    id: "normativo",
    title: "Cumplimiento normativo",
    description:
      "En México, muchas empresas necesitan evidencia documental para cumplir con normas de la Secretaría del Trabajo y del IMSS. ROGA puede proporcionar:",
    items: [
      "Expedientes clínicos ocupacionales",
      "Indicadores de salud laboral",
      "Estadísticas de enfermedades detectadas",
      "Soporte documental para auditorías",
    ],
  },
  {
    id: "indicadores",
    title: "Generación de indicadores para la empresa",
    description:
      "Un laboratorio moderno aporta valor con datos accionables. Por ejemplo:",
    items: [
      "% de trabajadores con hipertensión",
      "% con obesidad",
      "Riesgo cardiovascular promedio",
      "Ausentismo asociado a problemas de salud",
      "Tendencias por departamento o turno",
    ],
  },
];

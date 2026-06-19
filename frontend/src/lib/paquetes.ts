import imgChequeoBasicoI from "../assets/paquetes/paquete-chequeo-basico-i.png";
import imgChequeoBasicoII from "../assets/paquetes/paquete-chequeo-basico-ii.png";
import imgChequeoGeneral from "../assets/paquetes/paquete-chequeo-general.png";
import imgCovidInfluenza from "../assets/paquetes/paquete-covid-influenza.png";
import imgDengue from "../assets/paquetes/paquete-dengue.png";
import imgJuevesPerfiles from "../assets/paquetes/paquete-jueves-perfiles.png";
import imgLunesDiabetes from "../assets/paquetes/paquete-lunes-diabetes.png";
import imgMiercolesUrinario from "../assets/paquetes/paquete-miercoles-urinario.png";

export type Paquete = {
  id: string;
  title: string;
  items: string[];
  price?: string;
  discount?: string;
  imageSrc: string;
  imageAlt: string;
};

export const PAQUETES: Paquete[] = [
  {
    id: "lunes-diabetes",
    title: "Lunes de Diabetes",
    items: [
      "Hemoglobina glucosilada",
      "Química 6 elementos",
      "EGO (Examen general de Orina)",
    ],
    price: "$549.00",
    imageSrc: imgLunesDiabetes,
    imageAlt: "Paquete Lunes de Diabetes — control glucémico y análisis clínicos",
  },
  {
    id: "jueves-perfiles",
    title: "Jueves de perfiles",
    items: [
      "Perfil de lípidos completo",
      "Perfil tiroideo",
      "Perfil hormonal",
    ],
    discount: "20% de descuento",
    imageSrc: imgJuevesPerfiles,
    imageAlt: "Paquete Jueves de perfiles — lípidos, tiroides y hormonas",
  },
  {
    id: "miercoles-urinario",
    title: "Miércoles de paquete urinario",
    items: ["EGO", "UROCULTIVO"],
    price: "$249.00",
    imageSrc: imgMiercolesUrinario,
    imageAlt: "Paquete Miércoles urinario — examen general de orina y urocultivo",
  },
  {
    id: "chequeo-basico-i",
    title: "Chequeo básico I",
    items: [
      "Ácido úrico",
      "Colesterol total",
      "Creatina",
      "Glucosa",
      "Urea",
      "Triglicéridos",
      "EGO",
      "Bh",
    ],
    price: "$399.00",
    imageSrc: imgChequeoBasicoI,
    imageAlt: "Chequeo básico I — panel de estudios de laboratorio esenciales",
  },
  {
    id: "chequeo-basico-ii",
    title: "Chequeo básico II",
    items: [
      "Biometría Hemática",
      "Examen General de orina",
      "Química sanguínea 27 elementos",
    ],
    price: "$799.00",
    imageSrc: imgChequeoBasicoII,
    imageAlt: "Chequeo básico II — biometría, orina y química sanguínea completa",
  },
  {
    id: "chequeo-general",
    title: "Chequeo General",
    items: [
      "Chequeo básico II",
      "Hormona TSH",
      "PSA total (Hombres)",
      "CA 125 (Mujeres)",
    ],
    price: "$989.00",
    imageSrc: imgChequeoGeneral,
    imageAlt: "Chequeo General — evaluación integral de salud",
  },
  {
    id: "covid-influenza",
    title: "COVID-19 e INFLUENZA",
    items: ["Detección de COVID-19 e Influenza"],
    price: "$450.00",
    imageSrc: imgCovidInfluenza,
    imageAlt: "Prueba combinada COVID-19 e Influenza",
  },
  {
    id: "dengue",
    title: "Prueba de Dengue",
    items: ["Detección de Dengue"],
    price: "$350.00",
    imageSrc: imgDengue,
    imageAlt: "Prueba de detección de Dengue",
  },
];

/** Máximo de ítems en cualquier paquete (Chequeo básico I). Altura uniforme del carrusel. */
export const MAX_PAQUETE_LIST_ITEMS = Math.max(
  ...PAQUETES.map((p) => p.items.length),
);

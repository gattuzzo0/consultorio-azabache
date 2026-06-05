export type Doctor = {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  specialty: string;
  description: string;
  license: string;
  /** Archivo en `public/` (servido como `/nombre.ext`). */
  photoSrc: string;
  /** `object-position` CSS para encuadrar el rostro en el recorte. */
  photoObjectPosition?: string;
  /** Fallback compacto si no hay imagen (no usado cuando hay `photoSrc`). */
  avatarBg: string;
};

export const DOCTORS: Doctor[] = [
  {
    id: "miriam-de-la-rosa",
    name: "Q.F.B. Miriam de la Rosa Reyna",
    shortName: "Q.F.B. Miriam de la Rosa Reyna",
    initials: "MR",
    specialty: "Química Farmacobióloga",
    description:
      "Análisis clínicos y toxicológicos para diagnóstico preciso, control de calidad en laboratorio y apoyo en medicina ocupacional.",
    license: "—",
    photoSrc: "/doctor-lidia-rodriguez.png",
    photoObjectPosition: "center 25%",
    avatarBg: "linear-gradient(135deg, #c9a6a4 0%, #a87b78 100%)",
  },
  {
    id: "gloria-vazquez",
    name: "Dra. Gloria Vázquez Vázquez",
    shortName: "Dra. Gloria Vázquez Vázquez",
    initials: "GV",
    specialty: "Médico General",
    description:
      "Atención integral y valoración clínica, control de enfermedades crónicas, medicina general y seguimiento preventivo.",
    license: "9876543",
    photoSrc: "/doctor-gloria-vazquez.png",
    photoObjectPosition: "center 22%",
    avatarBg: "linear-gradient(135deg, #b9a08f 0%, #87664f 100%)",
  },
  {
    id: "sandra-orta",
    name: "Enf. Sandra Orta Ramos",
    shortName: "Enf. Sandra Orta Ramos",
    initials: "SO",
    specialty: "Enfermería",
    description:
      "Cuidado y acompañamiento del paciente, aplicación de tratamientos, toma de muestras y apoyo en procedimientos clínicos.",
    license: "—",
    photoSrc: "/doctor-carolina-vazquez.jpg",
    photoObjectPosition: "center 28%",
    avatarBg: "linear-gradient(135deg, #d4a373 0%, #9b6b3f 100%)",
  },
];

export function findDoctor(id: string | null | undefined): Doctor | null {
  if (!id) return null;
  return DOCTORS.find((d) => d.id === id) ?? null;
}

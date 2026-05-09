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
    id: "gloria-vazquez",
    name: "Dra. Gloria Vázquez Vázquez",
    shortName: "Dra. Gloria Vázquez Vázquez",
    initials: "GV",
    specialty: "Médico General",
    description:
      "Atención integral para adultos, control de enfermedades crónicas y seguimiento preventivo.",
    license: "9876543",
    photoSrc: "/doctor-gloria-vazquez.png",
    photoObjectPosition: "center 22%",
    avatarBg: "linear-gradient(135deg, #c9a6a4 0%, #a87b78 100%)",
  },
  {
    id: "lidia-rodriguez",
    name: "Dra. Lidia Rodriguez Vázquez",
    shortName: "Dra. Lidia Rodriguez Vázquez",
    initials: "LR",
    specialty: "Médico General",
    description:
      "Consulta médica general, valoración inicial, orientación familiar y seguimiento de tratamientos.",
    license: "8765432",
    photoSrc: "/doctor-lidia-rodriguez.png",
    photoObjectPosition: "center 25%",
    avatarBg: "linear-gradient(135deg, #b9a08f 0%, #87664f 100%)",
  },
  {
    id: "carolina-vazquez",
    name: "Dra. Carolina Vázquez Montes",
    shortName: "Dra. Carolina Vázquez Montes",
    initials: "CV",
    specialty: "Médico General",
    description:
      "Enfoque preventivo, revisión general, diagnóstico oportuno y acompañamiento cercano del paciente.",
    license: "7654321",
    photoSrc: "/doctor-carolina-vazquez.jpg",
    photoObjectPosition: "center 28%",
    avatarBg: "linear-gradient(135deg, #d4a373 0%, #9b6b3f 100%)",
  },
];

export function findDoctor(id: string | null | undefined): Doctor | null {
  if (!id) return null;
  return DOCTORS.find((d) => d.id === id) ?? null;
}

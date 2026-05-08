export type Doctor = {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  specialty: string;
  description: string;
  license: string;
  /** Color de fondo del avatar de iniciales (placeholder mientras no haya foto). */
  avatarBg: string;
};

export const DOCTORS: Doctor[] = [
  {
    id: "gloria-vazquez",
    name: "Dra. Gloria Vázquez Vázquez",
    shortName: "Dra. Gloria Vázquez Vázquez",
    initials: "ML",
    specialty: "Médico General",
    description:
      "Atención integral para adultos, control de enfermedades crónicas y seguimiento preventivo.",
    license: "9876543",
    avatarBg: "linear-gradient(135deg, #c9a6a4 0%, #a87b78 100%)",
  },
  {
    id: "lidia-rodriguez",
    name: "Dra. Lidia Rodriguez Vázquez",
    shortName: "Dra. Lidia Rodriguez Vázquez",
    initials: "CT",
    specialty: "Médico General",
    description:
      "Consulta médica general, valoración inicial, orientación familiar y seguimiento de tratamientos.",
    license: "8765432",
    avatarBg: "linear-gradient(135deg, #b9a08f 0%, #87664f 100%)",
  },
  {
    id: "carolina-vazquez",
    name: "Dra. Carolina Vázquez Montes",
    shortName: "Dra. Carolina Vázquez Montes",
    initials: "SM",
    specialty: "Médico General",
    description:
      "Enfoque preventivo, revisión general, diagnóstico oportuno y acompañamiento cercano del paciente.",
    license: "7654321",
    avatarBg: "linear-gradient(135deg, #d4a373 0%, #9b6b3f 100%)",
  },
];

export function findDoctor(id: string | null | undefined): Doctor | null {
  if (!id) return null;
  return DOCTORS.find((d) => d.id === id) ?? null;
}

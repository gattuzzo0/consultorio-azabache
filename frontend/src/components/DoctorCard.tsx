import type { Doctor } from "../lib/doctors";

type DoctorAvatarProps = {
  doctor: Doctor;
  size?: number;
  rounded?: "full" | "md";
  className?: string;
};

export function DoctorAvatar({
  doctor,
  size = 96,
  rounded = "full",
  className,
}: DoctorAvatarProps) {
  const radius = rounded === "full" ? "9999px" : "12px";
  return (
    <div
      className={["avatar-initials", className].filter(Boolean).join(" ")}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: doctor.avatarBg,
        fontSize: Math.max(14, Math.round(size * 0.32)),
      }}
      aria-hidden="true"
    >
      {doctor.initials}
    </div>
  );
}

type DoctorCardProps = {
  doctor: Doctor;
  variant?: "full" | "compact";
};

export function DoctorCard({ doctor, variant = "full" }: DoctorCardProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-soft">
        <DoctorAvatar doctor={doctor} size={56} rounded="md" />
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {doctor.shortName}
          </h3>
          <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
        </div>
      </div>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="aspect-[4/3] w-full bg-muted-strong">
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ background: doctor.avatarBg }}
        >
          <span className="text-5xl font-bold tracking-wide text-white/95">
            {doctor.initials}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {doctor.shortName}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {doctor.specialty}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-soft">
          {doctor.description}
        </p>
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          Cédula profesional: {doctor.license}
        </p>
      </div>
    </article>
  );
}

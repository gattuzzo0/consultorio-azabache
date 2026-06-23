import type { Doctor } from "../lib/doctors";

type DoctorAvatarProps = {
  doctor: Doctor;
  size?: number;
  rounded?: "full" | "md";
  className?: string;
  onPhotoClick?: () => void;
};

export function DoctorAvatar({
  doctor,
  size = 96,
  rounded = "full",
  className,
  onPhotoClick,
}: DoctorAvatarProps) {
  const radius = rounded === "full" ? "9999px" : "12px";
  const objectPosition = doctor.photoObjectPosition ?? "center 30%";

  if (doctor.photoSrc) {
    const image = (
      <img
        src={doctor.photoSrc}
        alt={`Retrato de ${doctor.shortName}`}
        width={size}
        height={size}
        className={["shrink-0 object-cover", className].filter(Boolean).join(" ")}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          objectPosition,
        }}
        loading="lazy"
        decoding="async"
      />
    );

    if (onPhotoClick) {
      return (
        <button
          type="button"
          onClick={onPhotoClick}
          className="group relative shrink-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          style={{ borderRadius: radius }}
          aria-label={`Ver foto ampliada de ${doctor.shortName}`}
        >
          {image}
          <span
            className="pointer-events-none absolute inset-0 transition-colors group-hover:bg-black/10"
            style={{ borderRadius: radius }}
            aria-hidden
          />
        </button>
      );
    }

    return image;
  }

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
  /** Variante visual para fondos oscuros (glassmorphism en inicio). */
  appearance?: "default" | "premium-dark";
};

export function DoctorCard({
  doctor,
  variant = "full",
  appearance = "default",
}: DoctorCardProps) {
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

  const objectPosition = doctor.photoObjectPosition ?? "center 25%";
  const isPremiumDark = appearance === "premium-dark";

  return (
    <article
      className={
        isPremiumDark
          ? "doctor-card-premium flex h-full flex-col overflow-hidden rounded-xl"
          : "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card"
      }
    >
      <div
        className={
          isPremiumDark
            ? "doctor-card-premium__media aspect-[4/3] w-full overflow-hidden"
            : "aspect-[4/3] w-full overflow-hidden bg-muted-strong"
        }
      >
        {doctor.photoSrc ? (
          <img
            src={doctor.photoSrc}
            alt={`Retrato de ${doctor.shortName}`}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: doctor.avatarBg }}
          >
            <span className="text-5xl font-bold tracking-wide text-white/95">
              {doctor.initials}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3
          className={
            isPremiumDark
              ? "doctor-card-premium__name text-base font-semibold leading-snug"
              : "text-base font-semibold leading-snug text-foreground"
          }
        >
          {doctor.shortName}
        </h3>
        <p
          className={
            isPremiumDark
              ? "doctor-card-premium__specialty mt-0.5 text-sm"
              : "mt-0.5 text-sm text-muted-foreground"
          }
        >
          {doctor.specialty}
        </p>
        <p
          className={
            isPremiumDark
              ? "doctor-card-premium__bio mt-3 text-sm leading-relaxed"
              : "mt-3 text-sm leading-relaxed text-foreground-soft"
          }
        >
          {doctor.description}
        </p>
        <p
          className={
            isPremiumDark
              ? "doctor-card-premium__license mt-4 border-t pt-3 text-xs"
              : "mt-4 border-t border-border pt-3 text-xs text-muted-foreground"
          }
        >
          Cédula profesional: {doctor.license}
        </p>
      </div>
    </article>
  );
}

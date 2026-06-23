import equipoImage from "../assets/paquetes/equipo.jpeg";

export function EquipoSection() {
  return (
    <section
      id="equipo"
      className="team-section py-16 sm:py-20 lg:py-24"
      aria-labelledby="equipo-heading"
    >
      <div className="team-section__ambient" aria-hidden />
      <div className="team-section__inner mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="equipo-heading"
          className="team-section__heading text-center text-3xl tracking-tight sm:text-4xl"
        >
          Nuestro equipo
        </h2>
        <p className="team-section__subheading mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed sm:text-lg">
          Profesionales en laboratorio y consulta médica, listos para atenderte
          con calidad y calidez en recepción y en cada estudio.
        </p>
        <figure className="team-section__photo-wrap mx-auto mt-10 max-w-5xl">
          <img
            src={equipoImage}
            alt="Equipo de ROGA Laboratorio en recepción"
            className="team-section__photo"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

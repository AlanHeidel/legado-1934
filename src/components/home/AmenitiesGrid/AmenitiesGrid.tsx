import './AmenitiesGrid.css'

const HIGHLIGHTS = [
  {
    title: 'Canchas en estado premium',
    detail: 'Pasto sintético cuidado, iluminación pareja y turnos ordenados para jugar cómodo.',
  },
  {
    title: 'Cantina artesanal',
    detail: 'Cervezas artesanales frías, picadas y opciones rápidas para antes o después del partido.',
  },
  {
    title: 'Gestión simple',
    detail: 'Reserva ágil, confirmación rápida y una base ideal para sumar pagos online luego.',
  },
] as const

export function AmenitiesGrid() {
  return (
    <section className="amenities section-shell" aria-labelledby="amenities-title">
      <div className="amenities__head">
        <p className="amenities__label">Experiencia</p>
        <h2 className="amenities__title" id="amenities-title">
          Un complejo pensado para jugar y quedarse
        </h2>
      </div>

      <div className="amenities__grid">
        {HIGHLIGHTS.map((item) => (
          <article className="amenities__item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

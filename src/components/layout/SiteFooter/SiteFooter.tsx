import './SiteFooter.css'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copy">Legado 1934 · Complejo de Futbol 5 y cantina</p>
        <div className="site-footer__actions">
          <a href="#reserva" className="site-footer__link">
            Reservar turno
          </a>
          <span className="site-footer__year">{year}</span>
        </div>
      </div>
    </footer>
  )
}

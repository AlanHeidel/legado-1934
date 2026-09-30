import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { RESERVATION_URL } from '../../lib/site'
import './SiteFooter.css'

const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL?.trim() || 'https://www.instagram.com/legado.1934/'

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Pie de página">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <a className="site-footer__location" href="#ubicacion">San Salvador, Entre Ríos.</a>
          <div className="site-footer__socials" role="group" aria-label="Redes sociales">
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp (abre una pestaña nueva)">
              <FaWhatsapp aria-hidden="true" />
            </a>
            {instagramUrl ? (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                aria-label="Instagram de Legado (abre una pestaña nueva)">
                <FaInstagram aria-hidden="true" />
              </a>
            ) : (
              <button type="button" disabled aria-label="Instagram, próximamente" title="Instagram, próximamente">
                <FaInstagram aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <a className="site-footer__wordmark" href="#inicio" aria-label="Legado, volver al inicio"><span className="site-footer__wordmark-text">LEGADO</span></a>
        <a className="site-footer__credit" href="https://github.com/AlanHeidel" target="_blank" rel="noopener noreferrer"
          aria-label="AH, Alan Heidel en GitHub (abre una pestaña nueva)">AH</a>
      </div>
    </footer>
  )
}

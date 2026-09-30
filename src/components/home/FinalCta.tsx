import { FaWhatsapp } from 'react-icons/fa'
import { RESERVATION_URL } from '../../lib/site'
import divider from '../../assets/divisor.svg'
import './FinalCta.css'

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <img className="final-cta__divider" src={divider} alt="" aria-hidden="true" width="1916" height="283" />
      <h2 id="final-cta-title">¿Armamos partido?</h2>
      <a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">
        <span>Reservar cancha</span>
        <FaWhatsapp className="final-cta__icon" aria-hidden="true" />
        <span className="sr-only"> por WhatsApp (abre una pestaña nueva)</span>
      </a>
    </section>
  )
}

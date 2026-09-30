import type { ReactNode } from 'react'
import { FaExternalLinkAlt, FaCar, FaRegClock, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { RESERVATION_PHONE } from '../../lib/site'
import './Location.css'

const address = import.meta.env.VITE_CLUB_ADDRESS?.trim() || 'Avenida Malarín 2260, San Salvador, Entre Ríos, Argentina'
const hours = import.meta.env.VITE_CLUB_HOURS?.trim() || ''
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY?.trim() || ''
const mapQuery = import.meta.env.VITE_GOOGLE_MAPS_QUERY?.trim() || address
const contactUrl = `https://wa.me/${RESERVATION_PHONE}?text=${encodeURIComponent('¡Hola! Quiero consultar por la ubicación y los horarios de Legado 1934.')}`
const mapUrl = mapQuery
  ? `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query: mapQuery })}`
  : ''
const directionsUrl = mapQuery
  ? `https://www.google.com/maps/dir/?${new URLSearchParams({ api: '1', destination: mapQuery, travelmode: 'driving' })}`
  : ''
const embedUrl = apiKey && mapQuery
  ? `https://www.google.com/maps/embed/v1/place?${new URLSearchParams({ key: apiKey, q: mapQuery, zoom: '16', language: 'es' })}`
  : ''

function MapAction({ href, outline = false, children }: {
  href: string
  outline?: boolean
  children: ReactNode
}) {
  const className = `location__button${outline ? ' location__button--outline' : ''}`
  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> en Google Maps (abre una pestaña nueva)</span>
    </a>
  ) : (
    <button className={className} type="button" disabled title="Ubicación pendiente de confirmación">
      {children}
    </button>
  )
}

export function Location() {
  return (
    <section className="location" id="ubicacion" aria-labelledby="location-title" tabIndex={-1}>
      <div className="location__inner">
        <h2 className="location__title" id="location-title">
          Dónde <span className="location__pencil">estamos</span>
        </h2>
        <div className="location__layout">
          <div className="location__map-frame">
            {embedUrl ? (
              <iframe
                className="location__map"
                title="Ubicación de Legado 1934 en Google Maps"
                src={embedUrl}
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="location__map-placeholder">
                <FaMapMarkerAlt aria-hidden="true" />
                <p>Nos vemos en San Salvador</p>
                <span>Avenida Malarín 2260, San Salvador, Entre Ríos.</span>
                <a href={contactUrl} target="_blank" rel="noopener noreferrer">
                  Consultar ubicación por WhatsApp
                  <span className="sr-only"> (abre una pestaña nueva)</span>
                </a>
              </div>
            )}
          </div>
          <div className="location__info">
            <h3>Estamos en San Salvador, listos para recibirte.</h3>
            <dl className="location__details">
              <div className="location__detail">
                <FaMapMarkerAlt aria-hidden="true" />
                <div>
                  <dt>Dirección</dt>
                  <dd>{address}</dd>
                </div>
              </div>
              <div className="location__detail">
                <FaRegClock aria-hidden="true" />
                <div>
                  <dt>Horarios</dt>
                  <dd>{hours || 'Lun a dom: 09:00 a 23:00'}</dd>
                </div>
              </div>
              <div className="location__detail">
                <FaWhatsapp aria-hidden="true" />
                <div>
                  <dt>Contacto</dt>
                  <dd><a href={contactUrl} target="_blank" rel="noopener noreferrer">
                    Escribinos por WhatsApp
                    <span className="sr-only"> (abre una pestaña nueva)</span>
                  </a></dd>
                </div>
              </div>
            </dl>
            <div className="location__actions">
              <MapAction href={mapUrl}>Ver ubicación <FaExternalLinkAlt aria-hidden="true" /></MapAction>
              <MapAction href={directionsUrl} outline>Cómo llegar <FaCar aria-hidden="true" /></MapAction>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

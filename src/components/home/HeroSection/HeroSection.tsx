import { useState } from 'react'
import './HeroSection.css'

const HERO_IMAGE_URL =
  'https://970universal.com/wp-content/uploads/2022/03/futbol-5-355708-175940.jpg'
const HERO_FALLBACK_URL =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80'

export function HeroSection() {
  const [imageSrc, setImageSrc] = useState(HERO_IMAGE_URL)

  const handleImageError = () => {
    if (imageSrc !== HERO_FALLBACK_URL) {
      setImageSrc(HERO_FALLBACK_URL)
    }
  }

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <img
        className="hero-section__image"
        src={imageSrc}
        alt="Cancha de futbol 5 con jugadores"
        referrerPolicy="no-referrer"
        fetchPriority="high"
        onError={handleImageError}
      />
      <div className="hero-section__overlay" aria-hidden="true" />

      <div className="section-shell hero-section__content">
        <p className="hero-section__eyebrow">Complejo Futbol 5 · Cerveza artesanal · Picadas</p>
        <h1 className="hero-section__title" id="hero-title">
          Reserva rapido, juga mejor
        </h1>
        <p className="hero-section__description">
          Turnos de cancha y cantina en un solo lugar. Minimalista, simple y directo.
        </p>
        <a href="#reserva" className="hero-section__button">
          Reservar turno
        </a>
      </div>
    </section>
  )
}

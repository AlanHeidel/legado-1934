import { useEffect, useRef, useState } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'
import { gsap } from '../../lib/gsap'
import { RESERVATION_PHONE } from '../../lib/site'
import jugar from '../../assets/jugar.webp'
import cumple from '../../assets/cumple.webp'
import torneo from '../../assets/torneo.webp'
import './Experiences.css'

const SLIDE_SECONDS = 10
const experiences = [
  {
    image: jugar, title: ['Jugar', 'un turno'], label: 'Jugar un turno',
    description: 'Alquilá la cancha y armá tu próximo partido con amigos. El encuentro empieza acá.',
    cta: 'Reservar turno',
    message: '¡Hola! Quiero alquilar una cancha para jugar un partido con amigos. ¿Qué turnos tienen disponibles?',
  },
  {
    image: cumple, title: ['Festejar', 'tu cumple'], label: 'Festejar tu cumpleaños',
    description: 'Un cumple con fútbol y tu gente. Alquilá el espacio y celebrá a tu manera.',
    cta: 'Organizar mi cumple',
    message: '¡Hola! Quiero alquilar el complejo para festejar un cumpleaños. ¿Me cuentan las opciones y disponibilidad?',
  },
  {
    image: torneo, title: ['Crear', 'tu encuentro'], label: 'Eventos y torneos',
    description: 'Organizá tu torneo o ese evento especial. Un lugar para reunir a todos y compartir la pasión.',
    cta: 'Consultar por eventos',
    message: '¡Hola! Quiero consultar por el alquiler del complejo para un evento especial o un torneo.',
  },
]

export function Experiences() {
  const [selection, setSelection] = useState({ index: 0, version: 0 })
  const [focused, setFocused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const borderRef = useRef<SVGRectElement>(null)
  const timer = useRef({ progress: 0 })
  const active = experiences[selection.index]

  function select(index: number) {
    timer.current.progress = 0
    setSelection(previous => ({ index, version: previous.version + 1 }))
  }

  useEffect(() => {
    const section = sectionRef.current
    const border = borderRef.current
    if (!section || !border) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = false
    const drawProgress = () => {
      border.style.strokeDashoffset = String(100 * (1 - timer.current.progress))
    }
    drawProgress()
    // A single clock keeps the outline and slide change synchronized through pauses.
    const tween = gsap.to(timer.current, {
      progress: 1,
      duration: SLIDE_SECONDS * (1 - timer.current.progress),
      ease: 'none', paused: true, onUpdate: drawProgress,
      onComplete: () => {
        timer.current.progress = 0
        setSelection(previous => ({
          index: (previous.index + 1) % experiences.length,
          version: previous.version + 1,
        }))
      },
    })
    const syncPlayback = () => {
      tween.paused(focused || !inView || document.hidden || motion.matches)
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.15 })
    observer.observe(section)
    document.addEventListener('visibilitychange', syncPlayback)
    motion.addEventListener('change', syncPlayback)
    return () => {
      tween.kill()
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      motion.removeEventListener('change', syncPlayback)
    }
  }, [selection, focused])

  return (
    <section ref={sectionRef} id="experiencias" className="experiences"
      aria-label="Viví el complejo" aria-roledescription="carrusel"
      onFocusCapture={event => {
        if (event.target.matches(':focus-visible')) setFocused(true)
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <div className="experiences__photos" aria-hidden="true">
        {experiences.map((experience, index) => (
          <img key={experience.image}
            className={`experiences__photo${index === selection.index ? ' is-active' : ''}`}
            src={experience.image} alt="" loading="lazy" decoding="async" />
        ))}
      </div>
      <div className="experiences__layout">
        <div className="experiences__copy" id="experience-content"
          aria-live={focused ? 'polite' : 'off'} aria-atomic="true">
          <div key={selection.index} className="experiences__copy-inner">
            <h2>{active.title.map(line => <span key={line}>{line}</span>)}</h2>
            <p>{active.description}</p>
            <a className="experiences__cta reserve-button"
              href={`https://wa.me/${RESERVATION_PHONE}?text=${encodeURIComponent(active.message)}`}
              target="_blank" rel="noopener noreferrer">
              <span>{active.cta}</span>
              <PiArrowUpRight className="reserve-button__arrow" aria-hidden="true" />
              <span className="sr-only"> por WhatsApp (abre una pestaña nueva)</span>
            </a>
          </div>
        </div>
        <div className="experiences__navigation">
          <div className="experiences__thumbnails" role="group" aria-label="Elegí una experiencia">
            {experiences.map((experience, index) => (
              <button key={experience.image} type="button"
                className={`experiences__thumbnail${index === selection.index ? ' is-active' : ''}`}
                aria-pressed={index === selection.index} aria-controls="experience-content"
                onPointerEnter={event => {
                  if (event.pointerType === 'mouse' && index !== selection.index) select(index)
                }}
                onClick={() => select(index)}>
                <span className="experiences__preview">
                  <img src={experience.image} alt="" loading="lazy" decoding="async" />
                  <span className="experiences__preview-number" aria-hidden="true">0{index + 1}</span>
                  {index === selection.index && (
                    <svg key={selection.version} className="experiences__progress"
                      viewBox="0 0 200 132" preserveAspectRatio="none" aria-hidden="true">
                      <rect ref={borderRef} x="2" y="2" width="196" height="128" rx="6" pathLength="100" />
                    </svg>
                  )}
                </span>
                <span className="experiences__label">{experience.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

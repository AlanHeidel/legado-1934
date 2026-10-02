import { useRef } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'
import background from '../../assets/background-legado.webp'
import overlay from '../../assets/overlay-legado.svg'
import logo from '../../assets/logo-legado.svg'
import { gsap, useGSAP } from '../../lib/gsap'
import { RESERVATION_URL } from '../../lib/site'
import './Hero.css'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      // Separate transform layer so the entrance zoom cannot reset the parallax.
      gsap.to('.hero__parallax', {
        y: () => -Math.min(window.innerHeight * 0.09, 88),
        ease: 'none',
        scrollTrigger: {
          id: 'hero-parallax',
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      })
      // Simple entrance on load, independent of the scroll animation.
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__background', { scale: 1.06, duration: 1.8, clearProps: 'transform' }, 0)
        .fromTo('.hero__overlay',
          { '--overlay-reveal': '0%' },
          { '--overlay-reveal': '120%', duration: 1.8, ease: 'power1.inOut', clearProps: '--overlay-reveal' }, 0)
        .from('.hero__identity', { scale: 0.9, duration: 1.15, clearProps: 'transform' }, 0.12)
        .from('.hero__action', { y: 14, opacity: 0, duration: 0.7, clearProps: 'transform,opacity' }, 0.55)
    })
    return () => media.revert()
  }, { scope: sectionRef })

  return (
    <section className="hero" id="inicio" ref={sectionRef} aria-labelledby="hero-title" tabIndex={-1}>
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__parallax">
          <img className="hero__background" src={background} alt="" width={1672} height={941} fetchPriority="high" />
        </div>
        <img className="hero__overlay" src={overlay} alt="" width={1672} height={941} />
      </div>
      <div className="hero__content">
        <h1 className="hero__identity" id="hero-title">
          <span className="sr-only">Legado 1934, club de fútbol 5</span>
          <img className="hero__logo" src={logo} alt="" width={1536} height={1024} fetchPriority="high" draggable={false} />
        </h1>
        <div className="hero__action">
          <a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">
            <span>Reservar cancha</span>
            <PiArrowUpRight className="reserve-button__arrow" aria-hidden="true" />
            <span className="sr-only"> por WhatsApp (abre una pestaña nueva)</span>
          </a>
        </div>
      </div>
    </section>
  )
}

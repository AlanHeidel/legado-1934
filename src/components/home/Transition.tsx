import { useRef } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'
import { RESERVATION_PHONE } from '../../lib/site'

import backgroundImage from '../../assets/background-tshirts.webp'
import transitionImage from '../../assets/reloj-only.svg?url'

import remera1 from '../../assets/remera1.webp'
import remera2 from '../../assets/remera2.webp'
import remera3 from '../../assets/remera3.webp'

import { gsap, useGSAP } from '../../lib/gsap'

import './Transition.css'

const PRODUCT_INQUIRY_URL = `https://wa.me/${RESERVATION_PHONE}?text=${encodeURIComponent('¡Hola! Quiero consultar por las remeras de Legado 1934. ¿Me cuentan precios y disponibilidad de los cortes Boxy y Clásico en talles S, M, L y XL?')}`

export function Transition() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const merchRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const shirt1Ref = useRef<HTMLDivElement>(null)
  const shirt2Ref = useRef<HTMLDivElement>(null)
  const shirt3Ref = useRef<HTMLDivElement>(null)

  const productInfoRef = useRef<HTMLDivElement>(null)
  const purchaseRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const finaleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const image = imageRef.current

      const merch = merchRef.current
      const title = titleRef.current

      const shirt1 = shirt1Ref.current
      const shirt2 = shirt2Ref.current
      const shirt3 = shirt3Ref.current

      const productInfo = productInfoRef.current
      const purchase = purchaseRef.current
      const cta = ctaRef.current
      const finale = finaleRef.current

      if (
        !section ||
        !image ||
        !merch ||
        !title ||
        !shirt1 ||
        !shirt2 ||
        !shirt3 ||
        !productInfo ||
        !purchase ||
        !cta ||
        !finale
      ) {
        return
      }

      /*
       * ==========================================
       * ESTADOS INICIALES
       * ==========================================
       */

      // On mobile, the clock reaches the viewport center through natural scroll,
      // without the extra 58% → 50% movement when the pin starts.
      const clockStartPosition = () =>
        getComputedStyle(section).getPropertyValue('--clock-start-position').trim()

      // Reloj
      gsap.set(image, {
        WebkitMaskSize: '50vw auto',
        maskSize: '50vw auto',

        WebkitMaskPosition: clockStartPosition,
        maskPosition: clockStartPosition,
      })

      // Merch oculto mientras ocurre el reloj
      gsap.set(merch, {
        visibility: 'hidden',
      })

      // Hidden controls cannot receive focus before the product reveal.
      gsap.set(productInfo, { autoAlpha: 0 })
      const finaleLines = finale.querySelectorAll('.reveal__finale-line')
      gsap.set(finale, { autoAlpha: 0, '--pencil-progress': 0 })
      gsap.set(finaleLines, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set(purchase, { y: 0 })
      gsap.set(cta, { scale: 1 })

      // REMERAS oculto horizontalmente
      gsap.set(title, {
        clipPath: 'inset(0 100% 0 0)',
      })

      /*
       * Las 3 remeras empiezan hacia la derecha.
       *
       * IMPORTANTE:
       * GSAP ahora transforma únicamente las <img>.
       * El centrado lo hacen sus wrappers mediante CSS.
       */
      gsap.set([shirt1, shirt2, shirt3], {
        x: () => window.innerWidth * 0.85,
        opacity: 0,
        scale: 0.94,
        rotation: 4,
      })

      /*
       * ==========================================
       * DISTANCIAS
       * ==========================================
       */

      // Reloj = exactamente 2400
      const CLOCK_CENTER = 10
      const CLOCK_HOLD = 10
      const CLOCK_GROW = 1894

      // Título
      const TITLE_REVEAL = 350
      const ORIGINAL_TITLE_HOLD = 150 // Reference for preserving the original scroll pace.

      // Remera 1
      const SHIRT_1_IN = 500
      const SHIRT_1_HOLD = 350
      const SHIRT_1_OVERLAP = TITLE_REVEAL

      // Transiciones entre remeras
      const SHIRT_SWAP = 600

      // Pausas
      const SHIRT_2_HOLD = 350
      const SHIRT_3_HOLD = 350

      /*
       * 2400 reloj
       * + 350 título
       * + 150 pausa
       * + 500 entrada remera 1
       * + 450 pausa remera 1
       * + 600 cambio 1 → 2
       * + 550 pausa remera 2
       * + 600 cambio 2 → 3
       * + 550 pausa remera 3
       *
       * TOTAL = 6150
       */
      const TOTAL_SCROLL = 6150
      const FINALE_REVEAL = 450
      const FINALE_HOLD = 350
      const FINALE_OVERLAP = SHIRT_SWAP * 0.4
      const originalDuration = CLOCK_CENTER + CLOCK_HOLD + CLOCK_GROW
        + TITLE_REVEAL + ORIGINAL_TITLE_HOLD + SHIRT_1_IN + SHIRT_1_HOLD
        + SHIRT_SWAP * 2 + SHIRT_2_HOLD + SHIRT_3_HOLD
      // Extend the scroll in proportion so the existing phases keep their pace.
      const extendedScroll = TOTAL_SCROLL
        * (originalDuration + SHIRT_SWAP + FINALE_REVEAL + FINALE_HOLD
          - FINALE_OVERLAP - ORIGINAL_TITLE_HOLD - SHIRT_1_OVERLAP)
        / originalDuration

      /*
       * ==========================================
       * TIMELINE
       * ==========================================
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: 'top top',
          end: `+=${extendedScroll}`,

          scrub: 0.8,
          pin: true,

          anticipatePin: window.matchMedia('(max-width: 768px)').matches ? 0 : 1,
          invalidateOnRefresh: true,
        },
      })

      /*
       * ==========================================
       * FASE 1 — RELOJ
       * ==========================================
       */

      // Keep the same duration; on mobile this is a hold, not a sudden recenter.
      timeline.fromTo(image, {
        WebkitMaskPosition: clockStartPosition,
        maskPosition: clockStartPosition,
      }, {
        WebkitMaskPosition: '50% 50%',
        maskPosition: '50% 50%',

        duration: CLOCK_CENTER,
      })

      // Pausa
      timeline.to({}, {
        duration: CLOCK_HOLD,
      })

      // Crecimiento
      timeline.to(image, {
        WebkitMaskSize: '3000vw auto',
        maskSize: '3000vw auto',

        duration: CLOCK_GROW,

        ease: 'power3.in',
      })

      /*
       * ==========================================
       * FASE 2 — TÍTULO
       * ==========================================
       */

      timeline.set(merch, {
        visibility: 'visible',
      })

      timeline.to(title, {
        clipPath: 'inset(0 0% 0 0)',

        duration: TITLE_REVEAL,

        ease: 'power2.out',
      })

      /*
       * ==========================================
       * FASE 3 — REMERA 1
       * ==========================================
       */

      timeline.to(shirt1, {
        x: 0,

        opacity: 1,

        scale: 1,
        rotation: 0,

        duration: SHIRT_1_IN,

        ease: 'power2.out',
      }, `-=${SHIRT_1_OVERLAP}`)

      // Remera 1 quieta
      timeline.to({}, {
        duration: SHIRT_1_HOLD,
      })

      /*
       * ==========================================
       * FASE 4 — REMERA 1 → REMERA 2
       * ==========================================
       */

      timeline.to(shirt1, {
        x: () => -window.innerWidth * 0.85,

        opacity: 0,

        scale: 0.94,
        rotation: -4,

        duration: SHIRT_SWAP,

        ease: 'power2.inOut',
      })

      timeline.to(
        shirt2,
        {
          x: 0,

          opacity: 1,

          scale: 1,
          rotation: 0,

          duration: SHIRT_SWAP,

          ease: 'power2.inOut',
        },
        '<',
      )

      // Remera 2 quieta
      timeline.to({}, {
        duration: SHIRT_2_HOLD,
      })

      /*
       * ==========================================
       * FASE 5 — REMERA 2 → REMERA 3
       * ==========================================
       */

      timeline.to(shirt2, {
        x: () => -window.innerWidth * 0.85,

        opacity: 0,

        scale: 0.94,
        rotation: -4,

        duration: SHIRT_SWAP,

        ease: 'power2.inOut',
      })

      timeline.to(
        shirt3,
        {
          x: 0,

          opacity: 1,

          scale: 1,
          rotation: 0,

          duration: SHIRT_SWAP,

          ease: 'power2.inOut',
        },
        '<',
      )

      /*
       * ==========================================
       * FASE 6 — REMERA 3
       * ==========================================
       */

      timeline.to({}, {
        duration: SHIRT_3_HOLD,
      })

      // Final exit follows the same motion as the other shirts.
      timeline.to(shirt3, {
        x: () => -window.innerWidth * 0.85,
        opacity: 0,
        scale: 0.94,
        rotation: -4,
        duration: SHIRT_SWAP,
        ease: 'power2.inOut',
      })

      // Reveal each line from left to right, then draw the underline.
      // This nested sequence occupies exactly the original closing reveal.
      const finaleReveal = gsap.timeline()
        .set(finale, { autoAlpha: 1 })
        .to(finaleLines, {
          clipPath: 'inset(0 0% 0 0)',
          duration: FINALE_REVEAL * 0.43,
          stagger: FINALE_REVEAL * 0.43,
          ease: 'power1.inOut',
        })
        .to(finale, {
          '--pencil-progress': 1,
          duration: FINALE_REVEAL * 0.14,
          ease: 'none',
        })

      timeline.add(finaleReveal, `-=${FINALE_OVERLAP}`)

      timeline.to(purchase, {
        y: () => -Math.max(116, Math.min(section.clientHeight * 0.18, 150)),
        duration: FINALE_REVEAL,
        ease: 'power2.inOut',
      }, '<')

      timeline.to(cta, {
        scale: 1.08,
        duration: FINALE_REVEAL,
        ease: 'power2.inOut',
      }, '<')

      timeline.to({}, { duration: FINALE_HOLD })

      // Overlay the title reveal without extending or shifting the existing timeline.
      timeline.to(productInfo, {
        autoAlpha: 1,
        duration: TITLE_REVEAL,
        ease: 'power2.out',
      }, CLOCK_CENTER + CLOCK_HOLD + CLOCK_GROW)

      // Mobile browser chrome changes dvh (including the hero above us), but
      // ScrollTrigger ignores small mobile resizes by default. Remeasure this
      // trigger before entry so its cached start matches the current layout.
      // Never refresh an active carousel just because the browser bars move.
      let viewportFrame = 0
      const syncEntryToViewport = () => {
        cancelAnimationFrame(viewportFrame)
        viewportFrame = requestAnimationFrame(() => {
          const trigger = timeline.scrollTrigger
          if (
            window.matchMedia('(max-width: 768px)').matches &&
            (!window.visualViewport || window.visualViewport.scale === 1) &&
            trigger && !trigger.isActive && trigger.progress === 0
          ) {
            trigger.refresh()
          }
        })
      }
      window.addEventListener('resize', syncEntryToViewport)
      window.visualViewport?.addEventListener('resize', syncEntryToViewport)

      return () => {
        cancelAnimationFrame(viewportFrame)
        window.removeEventListener('resize', syncEntryToViewport)
        window.visualViewport?.removeEventListener('resize', syncEntryToViewport)
      }

    },

    {
      scope: sectionRef,
    },
  )

  return (
    <section
      ref={sectionRef}
      className="reveal"
      id="productos"
      tabIndex={-1}
    >
      <div className="reveal__stage">

        {/* =============================
            RELOJ / BACKGROUND
            ============================= */}

        <div
          ref={imageRef}
          className="reveal__image"
          style={{
            backgroundImage: `url("${backgroundImage}")`,

            WebkitMaskImage: `url("${transitionImage}")`,
            maskImage: `url("${transitionImage}")`,

            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',

            WebkitMaskPosition: 'var(--clock-start-position)',
            maskPosition: 'var(--clock-start-position)',

            maskMode: 'alpha',
          }}
        />

        {/* =============================
            REMERAS
            ============================= */}

        <div
          ref={merchRef}
          className="reveal__merch"
        >
          <h2
            ref={titleRef}
            className="reveal__title"
          >
            REMERAS
          </h2>

          <div className="reveal__shirts">

            {/* Wrapper encargado del centrado */}
            <div className="reveal__shirt-slot">
              <div
                ref={shirt1Ref}
                className="reveal__shirt-motion"
              >
                <img
                  src={remera1}
                  className="reveal__shirt"
                  alt="Remera Legado 1934"
                />
                <div className="reveal__shirt-shadow" />
              </div>
            </div>

            <div className="reveal__shirt-slot">
              <div
                ref={shirt2Ref}
                className="reveal__shirt-motion"
              >
                <img
                  src={remera2}
                  className="reveal__shirt"
                  alt="Remera Legado 1934"
                />
                <div className="reveal__shirt-shadow" />
              </div>
            </div>

            <div className="reveal__shirt-slot">
              <div
                ref={shirt3Ref}
                className="reveal__shirt-motion"
              >
                <img
                  src={remera3}
                  className="reveal__shirt"
                  alt="Remera Legado 1934"
                />
                <div className="reveal__shirt-shadow" />
              </div>
            </div>

          </div>

          <div
            ref={productInfoRef}
            className="reveal__product-info"
            aria-label="Información del producto"
          >
            <div className="reveal__product-detail">
              <p className="reveal__detail-label">Cortes disponibles</p>
              <p className="reveal__detail-value">Boxy <span aria-hidden="true">/</span> Clásico</p>
            </div>

            <div ref={purchaseRef} className="reveal__purchase">
              <p ref={finaleRef} className="reveal__finale">
                <span className="reveal__finale-line">Y MUCHOS MÁS</span>{' '}
                <span className="reveal__finale-line">MODELOS</span>
              </p>
              <a
                ref={ctaRef}
                className="reveal__cta"
                href={PRODUCT_INQUIRY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar compra
                <PiArrowUpRight aria-hidden="true" />
                <span className="sr-only"> por WhatsApp (abre una pestaña nueva)</span>
              </a>
            </div>

            <div className="reveal__product-detail reveal__product-detail--sizes">
              <p className="reveal__detail-label">Talles disponibles</p>
              <ul className="reveal__sizes" aria-label="Talles disponibles">
                {['S', 'M', 'L', 'XL'].map(size => <li key={size}>{size}</li>)}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

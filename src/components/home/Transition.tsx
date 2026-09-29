import { useRef } from 'react'

import backgroundImage from '../../assets/background-tshirts.png'
import transitionImage from '../../assets/reloj-only.svg?url'

import remera1 from '../../assets/remera1.png'
import remera2 from '../../assets/remera2.png'
import remera3 from '../../assets/remera3.png'

import { gsap, useGSAP } from '../../lib/gsap'

import './Transition.css'

export function Transition() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const merchRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const shirt1Ref = useRef<HTMLImageElement>(null)
  const shirt2Ref = useRef<HTMLImageElement>(null)
  const shirt3Ref = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const image = imageRef.current

      const merch = merchRef.current
      const title = titleRef.current

      const shirt1 = shirt1Ref.current
      const shirt2 = shirt2Ref.current
      const shirt3 = shirt3Ref.current

      if (
        !section ||
        !image ||
        !merch ||
        !title ||
        !shirt1 ||
        !shirt2 ||
        !shirt3
      ) {
        return
      }

      /*
       * ==========================================
       * ESTADOS INICIALES
       * ==========================================
       */

      // Reloj
      gsap.set(image, {
        WebkitMaskSize: '50vw auto',
        maskSize: '50vw auto',

        WebkitMaskPosition: '50% 58%',
        maskPosition: '50% 58%',
      })

      // Merch oculto mientras ocurre el reloj
      gsap.set(merch, {
        visibility: 'hidden',
      })

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
      const CLOCK_CENTER = 253
      const CLOCK_HOLD = 253
      const CLOCK_GROW = 1894

      // Título
      const TITLE_REVEAL = 350
      const TITLE_HOLD = 150

      // Remera 1
      const SHIRT_1_IN = 500
      const SHIRT_1_HOLD = 450

      // Transiciones entre remeras
      const SHIRT_SWAP = 600

      // Pausas
      const SHIRT_2_HOLD = 550
      const SHIRT_3_HOLD = 550

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

      /*
       * ==========================================
       * TIMELINE
       * ==========================================
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: 'top top',
          end: `+=${TOTAL_SCROLL}`,

          scrub: 0.8,
          pin: true,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      /*
       * ==========================================
       * FASE 1 — RELOJ
       * ==========================================
       */

      // Centrar
      timeline.to(image, {
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

      // Pausa después de REMERAS
      timeline.to({}, {
        duration: TITLE_HOLD,
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
      })

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

            WebkitMaskPosition: '50% 58%',
            maskPosition: '50% 58%',

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
              <img
                ref={shirt1Ref}
                src={remera1}
                className="reveal__shirt"
                alt="Remera Legado 1934"
              />
            </div>

            <div className="reveal__shirt-slot">
              <img
                ref={shirt2Ref}
                src={remera2}
                className="reveal__shirt"
                alt="Remera Legado 1934"
              />
            </div>

            <div className="reveal__shirt-slot">
              <img
                ref={shirt3Ref}
                src={remera3}
                className="reveal__shirt"
                alt="Remera Legado 1934"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
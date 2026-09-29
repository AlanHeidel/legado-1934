import { useRef } from 'react'
import { PiArrowBendLeftUpThin } from 'react-icons/pi'
import aboutImage from '../../assets/about.png'
import aboutImage2 from '../../assets/about2.png'
import aboutImage3 from '../../assets/about3.png'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import './About.css'

// Presentation copy: replace with the club's confirmed history when available.
const INTRO = 'En Legado 1934, el fútbol es la excusa para encontrarnos.'
const PARAGRAPHS = [
  'Somos un club de canchas de fútbol 5 para armar equipo, compartir un partido y disfrutar de estar juntos.',
  'Nuestra historia se escribe en cada encuentro: en los goles, las charlas al costado de la cancha y las ganas de volver a jugar.',
]

function AnimatedCopy({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex}>
            <span className="about__word">
              {Array.from(word).map((letter, letterIndex) => (
                <span className="about__char" key={letterIndex}>{letter}</span>
              ))}
            </span>{' '}
          </span>
        ))}
      </span>
    </>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const photo1Ref = useRef<HTMLElement>(null)
  const photo2Ref = useRef<HTMLElement>(null)
  const photo3Ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const panel = panelRef.current

      const photo1 = photo1Ref.current
      const photo2 = photo2Ref.current
      const photo3 = photo3Ref.current

      if (
        !section ||
        !panel ||
        !photo1 ||
        !photo2 ||
        !photo3
      ) {
        return
      }

      let active = true

      const media = gsap.matchMedia()

      media.add(
        {
          desktop:
            '(min-width: 1024px) and (min-height: 700px)',
          tallMobile:
            '(max-width: 1023px) and (min-height: 820px)',
          motion:
            '(prefers-reduced-motion: no-preference)',
        },
        context => {
          if (!context.conditions?.motion) return

          const chars =
            gsap.utils.toArray<HTMLElement>(
              '.about__char',
              section,
            )

          const pin =
            Boolean(
              context.conditions.desktop ||
              context.conditions.tallMobile,
            ) &&
            panel.offsetHeight <=
            window.innerHeight + 1

          /*
           * Ahora tenemos 3 fotografías, así que damos
           * un poco más de recorrido de scroll.
           */
          const scrollDistance = () =>
            Math.max(
              window.innerHeight * 2.2,
              1600,
            )

          /*
           * ==================================================
           * TEXT READING ANIMATION
           * ==================================================
           */

          const reading = gsap.timeline({
            scrollTrigger: {
              id: 'about-reading',

              trigger: panel,

              start: pin
                ? 'top top'
                : 'top 65%',

              end: pin
                ? () =>
                  `+=${scrollDistance()}`
                : 'bottom 80%',

              pin: pin ? panel : false,
              pinSpacing: true,

              scrub: 0.4,

              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          reading.fromTo(
            chars,
            {
              color: 'var(--about-orange-muted)',
            },
            {
              color: 'var(--color-orange)',

              duration: 0.16,

              stagger: {
                each: 0.012,
              },

              ease: 'none',
            },
          )

          if (pin) {
            reading.to(
              {},
              {
                duration: 0.3,
              },
            )
          }

          /*
           * ==================================================
           * IMAGE CARD STACK
           * ==================================================
           */

          /*
           * PHOTO 1
           *
           * Empieza visible y ligeramente inclinada
           * hacia la izquierda.
           */
          gsap.set(photo1, {
            opacity: 1,

            x: 0,
            y: 0,

            rotation: -2,

            scale: 1,

            zIndex: 1,

            transformOrigin: 'center center',
          })

          /*
           * PHOTO 2
           *
           * Empieza fuera de posición y oculta.
           * Entra desde arriba/derecha.
           */
          gsap.set(photo2, {
            opacity: 0,

            x: 80,
            y: -60,

            rotation: 7,

            scale: 1.06,

            zIndex: 2,

            transformOrigin: 'center center',
          })

          /*
           * PHOTO 3
           *
           * Entra desde el lado contrario para
           * evitar que las tres fotos se muevan igual.
           */
          gsap.set(photo3, {
            opacity: 0,

            x: -80,
            y: -65,

            rotation: -7,

            scale: 1.06,

            zIndex: 3,

            transformOrigin: 'center center',
          })

          const imageTimeline =
            gsap.timeline({
              scrollTrigger: {
                id: 'about-image-stack',

                trigger: panel,

                start: pin
                  ? 'top top'
                  : 'top 65%',

                end: pin
                  ? () =>
                    `+=${scrollDistance()}`
                  : 'bottom 80%',

                scrub: 0.6,

                invalidateOnRefresh: true,
              },
            })

          /*
           * --------------------------------------------------
           * ETAPA 1
           *
           * La foto 1 permanece sola.
           * Esto evita que photo2 aparezca demasiado rápido.
           * --------------------------------------------------
           */

          imageTimeline.to(
            {},
            {
              duration: 2.5,
            },
          )

          /*
           * --------------------------------------------------
           * ETAPA 2
           *
           * Foto 1 se desplaza hacia atrás.
           * --------------------------------------------------
           */

          imageTimeline.to(photo1, {
            x: -30,
            y: 18,

            rotation: -5,

            scale: 0.94,

            opacity: 0.75,

            ease: 'power1.inOut',

            duration: 1,
          })

          /*
           * Foto 2 cae encima.
           */
          imageTimeline.to(
            photo2,
            {
              opacity: 1,

              x: 18,
              y: -8,

              rotation: 2.5,

              scale: 1,

              ease: 'power2.out',

              duration: 1.2,
            },

            '<0.15',
          )

          /*
           * Dejamos visible la composición
           * photo1 + photo2 durante un rato.
           */
          imageTimeline.to(
            {},
            {
              duration: 2,
            },
          )

          /*
           * --------------------------------------------------
           * ETAPA 3
           *
           * Las dos fotografías anteriores
           * se acomodan para recibir photo3.
           * --------------------------------------------------
           */

          imageTimeline.to(photo1, {
            x: -42,
            y: 26,

            rotation: -7,

            scale: 0.9,

            opacity: 0.55,

            ease: 'power1.inOut',

            duration: 1,
          })

          imageTimeline.to(
            photo2,
            {
              x: 34,
              y: 18,

              rotation: 5,

              scale: 0.94,

              opacity: 0.75,

              ease: 'power1.inOut',

              duration: 1,
            },

            '<',
          )

          /*
           * Foto 3 cae encima de las otras dos.
           */
          imageTimeline.to(
            photo3,
            {
              opacity: 1,

              x: -5,
              y: -12,

              rotation: -1.5,

              scale: 1,

              ease: 'power2.out',

              duration: 1.2,
            },

            '<0.2',
          )

          /*
           * Dejamos visible la composición final
           * antes de terminar la sección.
           */
          imageTimeline.to(
            {},
            {
              duration: 1.5,
            },
          )

        },
      )

      /*
       * Al cargar las fuentes puede cambiar el tamaño
       * del texto y por consecuencia las mediciones
       * realizadas por ScrollTrigger.
       */
      void document.fonts.ready.then(() => {
        if (active) {
          ScrollTrigger.refresh()
        }
      })

      return () => {
        active = false
        media.revert()
      }
    },

    {
      scope: sectionRef,
    },
  )

  return (
    <section
      className="about"
      id="nosotros"
      ref={sectionRef}
      aria-labelledby="about-title"
      tabIndex={-1}
    >
      <div
        className="about__panel"
        ref={panelRef}
      >
        <div className="about__inner">
          <div className="about__scribbles" aria-hidden="true">
            <span className="about__scribble about__scribble--friends">Más que fútbol</span>
          </div>

          <h2
            className="about__title"
            id="about-title"
          >
            Sobre <span className="about__pencil">nosotros</span>
          </h2>

          <div className="about__layout">

            {/* ===========================
                PHOTOS
               =========================== */}

            <div className="about__photo-wrapper">

              {/* FOTO 1 */}
              <figure
                className="about__photo about__photo--first"
                ref={photo1Ref}
              >
                <img
                  src={aboutImage}
                  alt="Un partido de fútbol en la cancha de Legado, al atardecer."
                  width={1444}
                  height={1089}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              {/* FOTO 2 */}
              <figure
                className="about__photo about__photo--second"
                ref={photo2Ref}
              >
                <img
                  src={aboutImage2}
                  alt="Equipo celebrando un gol en la cancha de Legado."
                  width={1444}
                  height={1089}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              {/* FOTO 3 */}
              <figure
                className="about__photo about__photo--third"
                ref={photo3Ref}
              >
                <img
                  src={aboutImage3}
                  alt="Cancha de fútbol de Legado al atardecer."
                  width={1444}
                  height={1089}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="about__photo-note">
                <PiArrowBendLeftUpThin aria-hidden="true" />
                <span>El lugar donde<br />todo se encuentra</span>
              </div>
            </div>

            {/* ===========================
                TEXT
               =========================== */}

            <div className="about__description">

              <h3 className="about__intro">
                <AnimatedCopy text={INTRO} />
              </h3>
              {PARAGRAPHS.map(paragraph => (
                <p className="about__paragraph" key={paragraph}>
                  <AnimatedCopy text={paragraph} />
                </p>
              ))}

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
import { useRef, useState, type KeyboardEvent } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { RESERVATION_URL } from '../../lib/site'
import { BurgerButton } from './BurgerButton'
import './SiteHeader.css'

// Fixed body also blocks background scrolling in mobile Safari.
// Restore only the properties we own, including the previous scroll position.
function lockPage() {
  const body = document.body
  const root = document.documentElement
  const x = window.scrollX
  const y = window.scrollY
  const keys = ['position', 'top', 'left', 'right', 'width', 'overflow', 'paddingRight'] as const
  const previous = keys.map(key => [key, body.style[key]] as const)
  const rootOverflow = root.style.overflow
  const scrollbar = window.innerWidth - root.clientWidth
  const padding = parseFloat(getComputedStyle(body).paddingRight) || 0

  Object.assign(body.style, {
    position: 'fixed', top: `-${y}px`, left: '0', right: '0',
    width: '100%', overflow: 'hidden', paddingRight: `${padding + scrollbar}px`,
  })
  root.style.overflow = 'hidden'

  return () => {
    previous.forEach(([key, value]) => { body.style[key] = value })
    root.style.overflow = rootOverflow
    window.scrollTo({ left: x, top: y, behavior: 'instant' })
  }
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const unlockRef = useRef<(() => void) | null>(null)
  const destinationRef = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  function finishClose() {
    dialogRef.current?.close()
    unlockRef.current?.()
    unlockRef.current = null
    setIsOpen(false)
    if (destinationRef.current) {
      const target = document.querySelector<HTMLElement>(destinationRef.current)
      target?.scrollIntoView({ behavior: 'instant' })
      target?.focus({ preventScroll: true })
      destinationRef.current = null
    } else {
      triggerRef.current?.focus({ preventScroll: true })
    }
  }

  useGSAP(() => {
    const dialog = dialogRef.current
    const header = headerRef.current
    const about = document.querySelector('#nosotros')
    const footer = document.querySelector('.site-footer')
    if (header && about && footer) {
      // One rule owns the color; independent section triggers must not compete.
      const updateHeaderColor = () => {
        const headerBounds = header.getBoundingClientRect()
        const buttonCenter = headerBounds.top + headerBounds.height / 2
        const pastHero = about.getBoundingClientRect().top <= buttonCenter
        // The short footer cannot reach the fixed button, so switch on entry.
        const footerVisible = footer.getBoundingClientRect().top < window.innerHeight
        header.classList.toggle('site-header--on-paper', pastHero && !footerVisible)
      }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: updateHeaderColor,
        onRefresh: updateHeaderColor,
      })
      updateHeaderColor()
    }
    const timeline = gsap.timeline({ paused: true, onReverseComplete: finishClose })
      .fromTo('.site-menu__surface',
        { yPercent: -100 },
        { yPercent: 0, duration: 0.7, ease: 'power3.inOut' }, 0)
      .fromTo('.site-menu__close',
        { opacity: 0 },
        { opacity: 1, duration: 0.22 }, 0.18)
      .fromTo('.site-menu__link',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: 'power4.out' }, 0.28)
    timelineRef.current = timeline

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const settleMotion = () => {
      if (motion.matches && dialog?.open) {
        if (timeline.reversed()) finishClose()
        else timeline.progress(1).pause()
      }
    }
    motion.addEventListener('change', settleMotion)

    return () => {
      motion.removeEventListener('change', settleMotion)
      timeline.kill()
      timelineRef.current = null
      dialog?.close()
      unlockRef.current?.()
      unlockRef.current = null
    }
  }, { scope: headerRef })

  function openMenu() {
    if (!dialogRef.current || dialogRef.current.open) return
    destinationRef.current = null
    unlockRef.current = lockPage()
    dialogRef.current.showModal()
    setIsOpen(true)
    closeRef.current?.focus({ preventScroll: true })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timelineRef.current?.progress(1).pause()
    } else {
      timelineRef.current?.timeScale(1).play(0)
    }
  }

  function closeMenu(destination?: string) {
    destinationRef.current = destination ?? null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !timelineRef.current?.progress()) {
      finishClose()
    } else {
      // Keep the modal and scroll lock active until the closing animation ends.
      timelineRef.current.timeScale(1.35).reverse()
    }
  }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <header className="site-header" ref={headerRef}>
      <BurgerButton buttonRef={triggerRef} isOpen={isOpen} toggle={openMenu} controls="site-menu" />
      <dialog
        className="site-menu"
        id="site-menu"
        ref={dialogRef}
        aria-label="Menú principal"
        onKeyDown={trapFocus}
        onCancel={event => { event.preventDefault(); closeMenu() }}
      >
        <div className="site-menu__surface" aria-hidden="true" />
        <div className="site-menu__content">
          <BurgerButton
            buttonRef={closeRef}
            className="site-menu__close"
            isOpen={isOpen}
            toggle={() => closeMenu()}
            controls="site-menu"
          />
          <nav className="site-menu__nav" aria-label="Navegación principal">
            <div className="site-menu__row">
              <a className="site-menu__link" href="#inicio"
                onClick={event => { event.preventDefault(); closeMenu('#inicio') }}>
                INICIO
              </a>
            </div>
            <div className="site-menu__row">
              <a className="site-menu__link" href="#nosotros"
                onClick={event => { event.preventDefault(); closeMenu('#nosotros') }}>
                NOSOTROS
              </a>
            </div>
            <div className="site-menu__row">
              <a className="site-menu__link" href="#productos"
                onClick={event => { event.preventDefault(); closeMenu('#productos') }}>
                PRODUCTOS
              </a>
            </div>
            <div className="site-menu__row">
              <a className="site-menu__link" href="#ubicacion"
                onClick={event => { event.preventDefault(); closeMenu('#ubicacion') }}>
                UBICACION
              </a>
            </div>
            <div className="site-menu__row">
              <a className="site-menu__link" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => closeMenu()}>
                RESERVAR
                <span className="sr-only"> por WhatsApp (abre una pestaña nueva)</span>
              </a>
            </div>
          </nav>
        </div>
      </dialog>
    </header>
  )
}

import type { Ref } from 'react'
import './BurgerButton.css'

type BurgerButtonProps = {
  isOpen: boolean
  toggle: () => void
  className?: string
  buttonRef?: Ref<HTMLButtonElement>
  controls: string
}

export function BurgerButton({ isOpen, toggle, className = '', buttonRef, controls }: BurgerButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`burger-button ${className} ${isOpen ? 'open' : ''}`}
      onClick={toggle}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      <span className="top" aria-hidden="true" />
      <span className="middle" aria-hidden="true" />
      <span className="bottom" aria-hidden="true" />
    </button>
  )
}

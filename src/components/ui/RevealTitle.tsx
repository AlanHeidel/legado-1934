import { Children, cloneElement, isValidElement, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useScrollEntrance } from '../../hooks/useScrollEntrance'
import './RevealTitle.css'

type TextElement = { children?: ReactNode }

function plainText(children: ReactNode): string {
  return Children.toArray(children).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child)
    return isValidElement<TextElement>(child) ? plainText(child.props.children) : ''
  }).join('')
}

function lettering(children: ReactNode): ReactNode {
  return Children.map(children, child => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((word, index) =>
        /^\s*$/.test(word) ? word : (
          <span className="reveal-title__word" key={index}>
            {Array.from(word).map((letter, letterIndex) => (
              <span className="reveal-title__letter" key={letterIndex}>{letter}</span>
            ))}
          </span>
        ),
      )
    }
    return isValidElement<TextElement>(child)
      ? cloneElement(child, {}, lettering(child.props.children))
      : child
  })
}

function titleEntrance(element: HTMLHeadingElement) {
  const letters = element.querySelectorAll('.reveal-title__letter')
  gsap.set(element, { '--title-underline': 0, '--title-underline-tail': 0 })
  return gsap.timeline({ paused: true })
    .fromTo(letters, { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.22,
      stagger: 0.035,
      ease: 'power1.out',
      clearProps: 'opacity,clipPath',
    })
    .to(element, { '--title-underline': 1, duration: 0.35, ease: 'power2.out' })
    .to(element, { '--title-underline-tail': 1, duration: 0.2, ease: 'power2.out' })
}

export function RevealTitle({ id, className, children }: {
  id: string
  className: string
  children: ReactNode
}) {
  const ref = useScrollEntrance<HTMLHeadingElement>(titleEntrance)
  return (
    <h2 ref={ref} id={id} className={className} aria-label={plainText(children)}>
      <span aria-hidden="true">{lettering(children)}</span>
    </h2>
  )
}

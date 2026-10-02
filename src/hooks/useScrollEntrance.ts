import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// The observer follows actual screen visibility, including sections pinned by GSAP.
export function useScrollEntrance<T extends HTMLElement>(
  createAnimation: (element: T) => gsap.core.Timeline,
) {
  const ref = useRef<T>(null)
  const played = useRef(false)

  useGSAP(() => {
    const element = ref.current
    if (!element) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (played.current) return
      const animation = createAnimation(element).pause()
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        played.current = true
        observer.disconnect()
        animation.play()
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 })
      observer.observe(element)

      // Keyboard navigation must never land on a visually hidden control.
      const showOnFocus = () => {
        played.current = true
        observer.disconnect()
        animation.progress(1).pause()
      }
      element.addEventListener('focusin', showOnFocus)
      return () => {
        observer.disconnect()
        element.removeEventListener('focusin', showOnFocus)
      }
    })
    return () => media.revert()
  }, { scope: ref })

  return ref
}

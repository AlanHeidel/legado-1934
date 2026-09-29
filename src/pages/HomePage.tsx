import { Hero } from '../components/home/Hero.tsx'
import { About } from '../components/home/About.tsx'
import { Transition } from '../components/home/Transition.tsx'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Transition />
    </>
  )
}

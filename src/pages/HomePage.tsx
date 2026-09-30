import { Hero } from '../components/home/Hero.tsx'
import { About } from '../components/home/About.tsx'
import { FinalCta } from '../components/home/FinalCta.tsx'
import { Location } from '../components/home/Location.tsx'
import { Experiences } from '../components/home/Experiences.tsx'
import { VisualBreak } from '../components/home/VisualBreak.tsx'
import { Transition } from '../components/home/Transition.tsx'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Transition />
      <VisualBreak />
      <Experiences />
      <Location />
      <FinalCta />
    </>
  )
}

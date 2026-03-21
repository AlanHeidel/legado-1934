import { AmenitiesGrid } from '../../components/home/AmenitiesGrid/AmenitiesGrid.tsx'
import { HeroSection } from '../../components/home/HeroSection/HeroSection.tsx'
import { QuickReserve } from '../../components/home/QuickReserve/QuickReserve.tsx'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="home-page">
      <div className="home-band home-band--hero">
        <HeroSection />
      </div>

      <div className="home-band home-band--cream">
        <QuickReserve />
      </div>

      <div className="home-band home-band--green">
        <AmenitiesGrid />
      </div>
    </div>
  )
}

import './SiteHeader.css'
import { LuHourglass } from 'react-icons/lu'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <nav className="site-header__nav" aria-label="Navegacion principal">
          <a className="brand-logo" href="/" aria-label="Legado 1934">
            <span className="brand-logo__digit">19</span>
            <span className="brand-logo__hourglass" aria-hidden="true">
              <LuHourglass />
            </span>
            <span className="brand-logo__digit">34</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

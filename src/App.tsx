import { SiteFooter } from './components/layout/SiteFooter.tsx'
import { SiteHeader } from './components/layout/SiteHeader.tsx'
import { HomePage } from './pages/HomePage.tsx'

function App() {
  return (
    <>
      <a className="skip-link" href="#inicio">Ir al contenido</a>
      <SiteHeader />
      <main>
        <HomePage />
      </main>
      <SiteFooter />
    </>
  )
}

export default App

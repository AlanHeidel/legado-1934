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
    </>
  )
}

export default App

import './App.css'
import { SiteFooter } from './components/layout/SiteFooter/SiteFooter.tsx'
import { SiteHeader } from './components/layout/SiteHeader/SiteHeader.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="app-main">
        <HomePage />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App

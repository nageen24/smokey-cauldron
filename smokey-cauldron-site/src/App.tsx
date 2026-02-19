import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { useTheme } from './lib/theme'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { MenuCategory } from './pages/MenuCategory'
import { Contact } from './pages/Contact'
import { Reservation } from './pages/Reservation'

export default function App() {
  const [theme, toggleTheme] = useTheme()

  return (
    <div className="min-h-dvh">
      <ScrollToTop />
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:categoryId" element={<MenuCategory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
      <Footer />
    </div>
  )
}


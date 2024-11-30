import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextModule from './context/AuthContext'
import Galeria from './pages/Galeria'
import Footer from './components/shared/Footer'
import NavBar from './components/shared/NavBar'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <AuthContextModule.AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/galeria/:categoriaId" element={<Galeria />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthContextModule.AuthProvider>
  )
}

export default App


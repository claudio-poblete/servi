import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextModule from "./context/AuthContext";
import Galeria from "./pages/Galeria";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import Dashboard from "./pages/Dashboard";
import Hero from "./components/shared/Hero";
import ComoFunciona from "./components/shared/ComoFunciona";
import BannerServiGallery from "./components/shared/BannerServiGallery";
import CarruselCategorias from "./components/shared/CarruselCategorias";

function App() {
  return (
    <AuthContextModule.AuthProvider>
      <Router>
        <div className="main-wrapper">
          <NavBar />
          <Routes>
            <Route path="/galeria/:categoriaId" element={<Galeria />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Hero />
          <ComoFunciona />
          <BannerServiGallery />
          <CarruselCategorias />
          <Footer />
        </div>
      </Router>
    </AuthContextModule.AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextModule from "./context/AuthContext";
import Galeria from "./pages/Galeria";
import NavBar from "./components/shared/NavBar";
import Dashboard from "./pages/Dashboard";
import ComoFunciona from "./components/shared/ComoFunciona";
import Login from "./pages/Login"; // Componente Login que has creado
import Home from "./pages/Home";
import PrivateRoute from "./components/utils/PrivateRoute"
import Footer from "./components/shared/Footer";

function App() {
  return (
    <AuthContextModule.AuthProvider>
      <Router>
        <div className="main-wrapper">
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/galeria/:categoriaId" element={<Galeria />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthContextModule.AuthProvider>
  );
}

export default App;

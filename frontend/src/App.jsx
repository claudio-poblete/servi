import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthContextModule from "./context/AuthContext";
import NavBar from "./components/shared/NavBar";
import Dashboard from "./pages/Dashboard";
import ComoFunciona from "./pages/ComoFunciona";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./components/shared/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import PedirUnServi from "./pages/PedirUnServi"
import HazUnServi from "./pages/HazUnServi";
import Ofertar from "./pages/Ofertar";

function App() {
  return (
    <Router>
      <AuthContextModule.AuthProvider>
        <ScrollToTop />
        <div className="main-wrapper">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/haz-un-servi/:categoriaId" element={<HazUnServi />} />
            <Route path="/haz-un-servi" element={<HazUnServi />}/>
            <Route path="/post-service" element={<PedirUnServi />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/ofertar/:id_servicio" element={<Ofertar />} />
          </Routes>
          <Footer />
        </div>
      </AuthContextModule.AuthProvider>
    </Router>
  );
}

export default App;

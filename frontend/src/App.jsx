import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthContextModule from "./context/AuthContext";
import Galeria from "./pages/Galeria";
import NavBar from "./components/shared/NavBar";
import Dashboard from "./pages/Dashboard";
import ComoFunciona from "./pages/ComoFunciona";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/utils/PrivateRoute";
import Footer from "./components/shared/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";


function App() {
  return (
    <AuthContextModule.AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="main-wrapper">
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
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

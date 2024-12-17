import { useNavigate } from "react-router-dom";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileOffer from "../components/profile/ProfileOffer";
import ProfileServices from "../components/profile/ProfileServices";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";
import AuthContextModule from "../context/AuthContext";

const Dashboard = () => {
  const { user } = AuthContextModule.useAuth();
  const navigate = useNavigate();

  // Redirige al usuario si no está autenticado
  if (!user) {
    console.log("No user detected");
    navigate("/login");
    return null;
  }

  return (
    <section className="dashboard">
      {/* Información del perfil */}
      <ProfileInfo />

      {/* Ofertas recibidas */}
      <div className="dashboard-section">
        <h3 className="visually-hidden">Ofertas Recibidas</h3>
        <ProfileOffer />
      </div>

      {/* Servicios publicados */}
      <div className="dashboard-section">
        <h3 className="visually-hidden">Mis Servicios</h3>
        <ProfileServices />
      </div>

      {/* Información personal */}
      <div className="dashboard-section">
        <h3 className="visually-hidden">Información Personal</h3>
        <PersonalInfoSection />
      </div>
    </section>
  );
};

export default Dashboard;

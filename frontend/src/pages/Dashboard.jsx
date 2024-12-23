import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileOffer from "../components/profile/ProfileOffer";
import ProfileServices from "../components/profile/ProfileServices";
import ProfileMyOffers from "../components/profile/ProfileMyOffers"; // Nuevo componente para las ofertas realizadas
import AuthContextModule from "../context/AuthContext";

const Dashboard = () => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    return <div>Redirigiendo al inicio de sesión...</div>;
  }

  return (
    <section className="dashboard">
      <ProfileInfo />
      <div className="dashboard-section">
        <h3 className="visually-hidden">Ofertas a mis Servicios</h3>
        <ProfileOffer />
      </div>
      <div className="dashboard-section">
        <h3 className="visually-hidden">Servicios Solicitados</h3>
        <ProfileServices />
      </div>
      <div className="dashboard-section">
        <h3 className="visually-hidden">Ofertas Realizadas</h3>
        <ProfileMyOffers /> {/* Nueva sección */}
      </div>
    </section>
  );
};

export default Dashboard;

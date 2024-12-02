import ProfileInfo from '../components/profile/ProfileInfo'
import ProfileOffer from '../components/profile/ProfileOffer'
import ProfileServices from '../components/profile/ProfileServices'
import PersonalInfoSection from '../components/profile/PersonalInfoSection'
import ProfileHistorial from '../components/profile/ProfileHistorial'
import AuthContextModule from "../context/AuthContext";



const Dashboard = () => {
  const { user, logout } = AuthContextModule.useAuth();

  if (!user) {
    console.log("No user detected");
    return <p>No estás logueado. Por favor, inicia sesión.</p>; // Si no hay usuario logueado
  }

  console.log("User detected:", user);
  return(
    <section className='dashboard'>
      <ProfileInfo />
      {/* <ProfileOffer />
      <ProfileServices />
      <ProfileHistorial />
      <PersonalInfoSection /> */}
      <button onClick={logout}>Cerrar sesión</button>
    </section>
  )
}

export default Dashboard
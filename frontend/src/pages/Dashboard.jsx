import ProfileInfo from '../components/profile/ProfileInfo'
import ProfileOffer from '../components/profile/ProfileOffer'
import ProfileServices from '../components/profile/ProfileServices'
import PersonalInfoSection from '../components/profile/PersonalInfoSection'
import AuthContextModule from "../context/AuthContext";



const Dashboard = () => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    console.log("No user detected");
    return <h4>No estás logueado. Por favor, inicia sesión.</h4>;
  } else {
    console.log("User detected:", user);
  }
  return(
    <section className='dashboard'>
      <ProfileInfo />
      <ProfileOffer />
      <ProfileServices />
      <PersonalInfoSection />
    </section>
  )
}

export default Dashboard
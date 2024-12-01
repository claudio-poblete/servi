import ProfileInfo from '../components/profile/ProfileInfo'
import ProfileOffer from '../components/profile/ProfileOffer'
import ProfileServices from '../components/profile/ProfileServices'
import PersonalInfoSection from '../components/profile/PersonalInfoSection'
import ProfileHistorial from '../components/profile/ProfileHistorial'

const Dashboard = () => {
  return(
    <section className='dashboard'>
      <ProfileInfo />
      <ProfileOffer />
      <ProfileServices />
      <ProfileHistorial />
      <PersonalInfoSection />
    </section>
  )
}

export default Dashboard
import MetodoPago from './MetodoPago'
import PersonalInfo from './PersonalInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import '../../assets/styles/dashboard_styles/personalinfo.css'

const PersonalInfoSection = () => {
  return (
    <section className='info-section'>
      <div className='info-title-container'>
        <div>
        <h4 className='title'>Información Personal</h4>
      </div>
        <div>
          <Link to='/edit-info' className='profile-button'>
            Editar <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
      <div className='info-container'>
        <div className='personal-info'>
          <PersonalInfo />
        </div>
        <div className='metodo-pago'>
          <MetodoPago />
        </div>
      </div>
    </section>
   )
}

export default PersonalInfoSection

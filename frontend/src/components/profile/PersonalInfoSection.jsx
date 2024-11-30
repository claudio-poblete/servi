import MetodoPago from './MetodoPago'
import PersonalInfo from './PersonalInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PersonalInfoSection = () => {
   return (
     <section className='info-section'>
       <div className='info-title-container'>
        <h4>Información Personal</h4>
        <Link to='/edit-info' className='profile-button'>
          Editar <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
       <div className='info-container'>
         <div className='metodo-pago'>
           <MetodoPago />
         </div>
         <div className='personal-info'>
           <PersonalInfo />
         </div>
       </div>
     </section>
   )
}

export default PersonalInfoSection

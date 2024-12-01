import { mockData } from '../../data/mockData'
import ServiceCard  from '../cards/ServiceCard'
import AuthContextModule from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ProfileServices = () => {
  const { user } = AuthContextModule.useAuth()

  if (!user) {
    return <h4>Cargando servicios...</h4>
  }

  const serviciosFiltrados = mockData.servicios.filter(servicio => servicio.idCategoria === user.idCategoria)  || []

  return(
    <section className='services-section'>
      <div className='services-title-container'>
        <h4>Servicios solicitados</h4>
        <Link to='/solicitudes' className='profile-button'>
          Ver todas <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className='services-card-container'>
        {serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.slice(0, 3).map(servicio => {
            const oferta = mockData.ofertas?.find(oferta => oferta.idServicio === servicio.id)
            return oferta ? (
              <ServiceCard key={servicio.id} oferta={oferta} />
            ) : (
              <h4>Aun no existen servicios solicitados</h4>
            )
          })
        ) : (
          <h4>No se encontraron servicios en tu categoria</h4>
        )}
      </div>
    </section>
  )
}

export default ProfileServices
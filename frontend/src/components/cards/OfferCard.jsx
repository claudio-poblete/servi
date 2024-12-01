/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const OfferCard = ({ oferta, usuario, servicio}) => {
  return(
    <div className='card'>
      <div className='card-title-container'>
        <div>
          <img
             src={usuario.fotoPerfil || 'foto de perfil generica'}
             alt={`Foto de perfil de ${usuario.nombre}`}
          />
          <div>
            <h5>
              <Link to={`/perfil/${usuario.id}`}>{usuario.nombre}</Link>
            </h5>
            <span>
              {usuario.valoracion} <FontAwesomeIcon icon={faStar}/>
            </span>
          </div>
        </div>
        <h4>CLP ${oferta.oferta.toLocaleString('es-CL')}</h4>
      </div>
      <div className='card-detail-container'>
        <p>Ubicación: {servicio.ubicacion}</p>
        <h4>{servicio.titulo}</h4>
        <h5>CLP ${oferta.oferta.toLocaleString('es-CL')}</h5>
      </div>
      <button>Aceptar Oferta</button>
    </div>
  )
}

export default OfferCard
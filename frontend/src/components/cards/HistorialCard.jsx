/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const HistorialCard = ({ servicio, solicitante, resena, valoracion, valor}) => {
  return (
    <div className='card'>
      <div className='card-title-container'>
        <h3>{servicio}</h3>
        <div>
          <img
            src={solicitante?.fotoPerfil || 'Foto generica'}
            alt={`Foto de perfil de ${solicitante?.nombre || 'usuario desconocido'}`}
          />
          <p>Nombre de solicitante: {solicitante?.nombre || 'Desconocido'}</p>
        </div>
      </div>
      <p>{resena|| 'Sin reseña disponible'}</p>
      <div className='card-footer'>
         <span>
           {valoracion || '0.0'}{' '}
           <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }}/>
         </span>
         <p>CLP ${valor.toLocaleString('es-CL') || '0'}</p>
      </div>
    </div>
  )
}

export default HistorialCard
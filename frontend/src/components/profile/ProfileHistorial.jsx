import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { mockData } from '../../data/mockData'
import { Link } from 'react-router-dom'
import HistorialCard from '../cards/HistorialCard'


const ProfileHistorial = () => {
  const usuarioActual = mockData.usuarioActual
  const historialServicios = mockData.historial.filter(
    (historial) => historial.idUsuario === usuarioActual.id
  )

  return(
    <section className='historial-section'>
      <div className='historial-title-container'>
        <h4>Historial de servicios</h4>
        <Link to='/historial' className='profile-button'>
          Ver historial <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className='historial-card-container'>
        {historialServicios.length > 0 ? (
          historialServicios.map((item) => {
            const solicitante = mockData.usuarios.find(
              (usuario) => usuario.id === item.idSolicitante
            )

            return(
              <HistorialCard
                key={item.id}
                servicio={item.servicio}
                solicitante={solicitante}
                resena={item.resena || 'Sin reseña disponible'}
                valoracion={item.valoracion || 0}
                valor={item.valor || 0}
              />
            )
          })
        ) : (
          <h4>No hay historial de servicio realizados</h4>
        )}
      </div>
    </section>
  )
}

export default ProfileHistorial
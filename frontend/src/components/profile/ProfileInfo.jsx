import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import AuthContextModule from '../../context/AuthContext'

const ProfileInfo = () => {
  const { user } = AuthContextModule.useAuth()

  if (!user) {
    return <h2>Cargando datos del usuario</h2>
  }

  return(
    <section className='perfil-hero'>
      <div className='perfil-img'>
        <img
          src={user.fotoPerfil || 'url_foto_perfil_predeterminada'}
          alt={`Foto del perfil de ${user.nombre}`}
        />
        <span>
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: user.isVerified ? 'lightblue' : 'gray' }}
          />
          {user.isVerified ? ' Servi Verificado ' : ' No Verificado '}
        </span>
      </div>
      <div className='perfil-main'>
        <div className='perfil-info'>
          <h2>{user.nombre || 'Usuario anónimo'}</h2>
          <span>
            {user.valoracion !== undefined ? user.valoracion : 'N/A'}
            <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
          </span>
        </div>
        <p>{user.descripcion || 'Sin descripción disponible'}</p>
        <div className='perfil-footer'>
          <p>
            {user.serviciosCompletados !== undefined
              ? `${user.serviciosCompletados} Servicios Completados`
              : 'Servicios completados no disponibles'}
          </p>
          <p>
            {user.solicitudesServicios !== undefined
              ?  `${user.solicitudesServicios} Solcitudes disponibles`
              :  'Solicitudes de servicio no disponibles'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProfileInfo
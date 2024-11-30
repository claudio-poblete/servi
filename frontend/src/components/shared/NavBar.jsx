import { Link } from 'react-router-dom'
import AuthContextModule from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope,  faCog} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
   const { user, logout } = AuthContextModule.useAuth()

   const handleLogout = () => {
     logout()
   }
  return(
    <nav>
      <div>
        <img src='...' alt='Logo de Servi' />
      </div>
      <ul>
      {!user ? (
        <>
          <li>
            <Link to='/about'>Cómo Funciona</Link>
          </li>
          <li>
            <Link to='/login'>Conéctate</Link>
          </li>
          <li>
            <Link to='/register'>Regístrate</Link>
          </li>
          <li>
            <Link to='/post-service'>Pide un Servicio</Link>
          </li>
        </>
      ) : (
         <>
           <li>
            <Link to='/perfil'>¡ Hola ! {user.nombre}</Link>
          </li>
          <li>
            <Link>
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </li>
          <li>
            <Link>
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>
          </li>
          <li>
            <Link>
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </li>
          <li>
            <Link to='/post-service'>Pide un Servicio</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </li>
         </>
      )}
    </ul>
    </nav>
  )
}

export default NavBar

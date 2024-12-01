import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthContextModule from '../../context/AuthContext'

const MetodoPago = () => {
  const { user } = AuthContextModule.useAuth()
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false)

  const tarjeta = user?.numeroTajeta || '0000000000000000'
  const ultimos4 = tarjeta.slice(-4)
  const primeros12 = tarjeta.slice(0, -4)

  if (!user) {
    return <h2>Cargando...</h2>
  }

  const handleMostrarTarjeta = () => {
    setMostrarTarjeta(!mostrarTarjeta)
  }

  return(
    <div className='metodo-pago'>
      <h4>Método de Pago</h4>
      <div className='datos-tarjeta'>
        <span>
          {mostrarTarjeta ? `${primeros12}${ultimos4}` :  `*************${ultimos4}`}
        </span>
        <button onClick={handleMostrarTarjeta}>
          <FontAwesomeIcon icon={mostrarTarjeta ?  faEyeSlash : faEye} />
        </button>
      </div>
      <button className='modificar-pago-btn'>Modificar método de pago</button>
    </div>
  )
}

export default MetodoPago
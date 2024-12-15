import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthContextModule from '../../context/AuthContext'
import api from '../../api'

const MetodoPago = () => {
  const { user } = AuthContextModule.useAuth()
  const [mostrarCuenta, setMostrarCuenta] = useState(false)
  const [datosBancarios, setDatosBancarios] = useState(null)

  useEffect(() => {
    const obtenerDatosBancarios = async () => {
      try {
        const response = await api.get(`/datos-bancarios/${user.id}`)
        setDatosBancarios(response.data)
      } catch (error) {
        console.error('Error al obtener los datos bancarios:', error)
      }
    }

    if (user) {
      obtenerDatosBancarios()
    }
  }, [user])

  if (!user) {
    return <h2>Cargando...</h2>
  }

  if (!datosBancarios) {
    return (
      <div className='metodo-pago'>
        <h4 className='pago-title'>Método de Pago</h4>
        <p>No se han encontrado datos bancarios para este usuario.</p>
      </div>
    )
  }

  const handleMostrarCuenta = () => {
    setMostrarCuenta(!mostrarCuenta)
  }

  const ultimos4 = datosBancarios.numero_cuenta.slice(-4)
  const primeros12 = datosBancarios.numero_cuenta.slice(0, -4)

  return (
    <div className='metodo-pago'>
      <h4>Método de Pago</h4>
      <div className='datos-tarjeta'>
        <p><strong>Banco:</strong> {datosBancarios.banco}</p>
        <p><strong>Tipo de Cuenta:</strong> {datosBancarios.tipo_de_cuenta}</p>
        <span>
          {mostrarCuenta ? `${primeros12}${ultimos4}` : `*************${ultimos4}`}
        </span>
        <button onClick={handleMostrarCuenta}>
          <FontAwesomeIcon icon={mostrarCuenta ? faEyeSlash : faEye} />
        </button>
      </div>
      <button className='modificar-pago-btn'>Modificar método de pago</button>
    </div>
  )
}

export default MetodoPago

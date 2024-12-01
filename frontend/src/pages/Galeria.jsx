import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { mockData } from '../data/mockData'
import ServiceCard from '../components/cards/ServiceCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const Galeria = () => {
  const { categoriaId } = useParams()
  const servicios = mockData.servicios
  const categorias = mockData.categorias

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaId || 'Todos')

  useEffect(() => {
    setCategoriaSeleccionada(categoriaId || 'Todos')
  }, [categoriaId])

  const serviciosFiltrados = categoriaSeleccionada === 'Todos'
    ? servicios
    : servicios.filter(servicio => servicio.idCategoria === parseInt(categoriaSeleccionada))

  return (
    <section className='galeria'>
      <div className='galeria-header'>
        <h2>Sé un Servi, y da una mano</h2>
      </div>

      <div className='galeria-body'>
        <div className='galeria-filtro'>
          <h4>Servicios Solicitados</h4>
          <div className='filtro'>
            <FontAwesomeIcon icon={faFilter} className='filtro-icono' />
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className='filtro-select'
            >
              <option value='Todos'>Todos</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='galeria-cards'>
          {serviciosFiltrados.length > 0 ? (
            serviciosFiltrados.map(servicio => {
              const oferta = mockData.ofertas.find(of => of.idServicio === servicio.id)
              return (
                <ServiceCard
                  key={servicio.id}
                  servicio={servicio}
                  oferta={oferta || { oferta: 0 }}
                />
              )
            })
          ) : (
            <p>No hay servicios disponibles actualmente en esta categoría</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Galeria



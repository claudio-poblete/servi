import { Link } from 'react-router-dom'
import { mockData } from '../../data/mockData'

const Footer = () => {
  const categorias = mockData.categorias

  return (
    <footer>
      <div className='container'>
        <h5>Descubre</h5>
        <ul className='links-container'>
          <li className='link'>
            <Link to='/post-tarea'>Postea una tarea</Link>
          </li>
          <li className='link'>
            <Link to='/about'>Cómo funciona</Link>
          </li>
          <li className='link'>
            <Link to='/categories'>Categorías</Link>
          </li>
          <li className='link'>
            <Link to='/help'>Ayuda</Link>
          </li>
        </ul>
      </div>
      <div className='container'>
        <h5>Compañía</h5>
        <ul className='links-container'>
          <li className='link'>
            <Link to='/faq'>FAQ</Link>
          </li>
          <li className='link'>
            <Link to='/terms'>Términos y condiciones</Link>
          </li>
          <li className='link'>
            <Link to='/policy'>Política de privacidad</Link>
          </li>
        </ul>
      </div>
      <div className='container'>
        <h5>Todas las categorías</h5>
        <div>
          <ul className='links-container'>
            {categorias.slice(0, Math.ceil(categorias.length / 2)).map((categoria) => (
              <li key={categoria.id} className='link'>
                <Link to={`/galeria/${categoria.id}`}>{categoria.nombre}</Link>
              </li>
            ))}
          </ul>
          <ul className='links-container'>
            {categorias.slice(Math.ceil(categorias.length / 2)).map((categoria) => (
              <li key={categoria.id} className='link'>
                <Link to={`/galeria/${categoria.id}`}>{categoria.nombre}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer


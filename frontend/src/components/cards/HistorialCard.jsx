import PropTypes from 'prop-types'; // Importar PropTypes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const HistorialCard = ({ servicio, solicitante, resena, valoracion, valor }) => {
  return (
    <div className="historial-card">
      <div className="historial-card-title-container">
        <h3>{servicio}</h3>
        <div>
          <img
            src={solicitante?.fotoPerfil || 'Foto generica'}
            alt={`Foto de perfil de ${solicitante?.nombre || 'usuario desconocido'}`}
          />
          <p>Nombre de solicitante: {solicitante?.nombre || 'Desconocido'}</p>
        </div>
      </div>
      <p>{resena || 'Sin reseña disponible'}</p>
      <div className="historial-card-footer">
        <span>
          {valoracion || '0.0'}{' '}
          <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
        </span>
        <p>CLP ${valor.toLocaleString('es-CL') || '0'}</p>
      </div>
    </div>
  );
};

// Validación de props con PropTypes
HistorialCard.propTypes = {
  servicio: PropTypes.string.isRequired, // Título del servicio
  solicitante: PropTypes.shape({
    nombre: PropTypes.string,
    fotoPerfil: PropTypes.string,
  }), // Datos del solicitante (pueden ser opcionales)
  resena: PropTypes.string, // Reseña opcional
  valoracion: PropTypes.number, // Valoración opcional (default a 0.0 si falta)
  valor: PropTypes.number.isRequired, // Precio del servicio
};

export default HistorialCard;

/* eslint-disable react/prop-types */
const ServiceCard = ({ servicio, oferta }) => {
 return(
   <div className='card'>
     <div className='card-main'>
       <p>Ubicación: {servicio.ubicacion}</p>
       <h4>{servicio.titulo}</h4>
     </div>
     <h4>CLP ${oferta.oferta.toLocaleString('es-CL')}</h4>
     <button>Enviar Oferta</button>
   </div>
 )
}

export default ServiceCard
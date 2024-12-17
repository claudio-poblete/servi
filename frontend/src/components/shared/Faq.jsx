import { useState } from 'react';
import { handleToggle } from '../utils/Utils';

const Faq = () => {
  const [preguntas, setPreguntas] = useState([
    {
      id: 1,
      pregunta: '¿Qué es Servi?',
      respuesta: 'Lorem ipsum dolor sit amet consecteur.',
      abierto: false
    },
    {
      id: 2,
      pregunta: '¿Cómo se utiliza Servi?',
      respuesta: 'React se utiliza para construir componentes reutilizables que se pueden combinar para crear interfaces de usuario complejas.',
      abierto: false
    },
    {
      id: 3,
      pregunta: '¿Qué es ser un Servi?',
      respuesta: 'JSX es una extensión de JavaScript que permite escribir código HTML en archivos JavaScript.',
      abierto: false
    }
  ]);

  return (
    <div className="faq">
      <h2>Preguntas frecuentes</h2>
      <ul>
        {preguntas.map((pregunta) => (
          <li key={pregunta.id}>
            <button onClick={() => handleToggle(pregunta.id, setPreguntas, preguntas)}>
              {pregunta.pregunta}
              {pregunta.abierto ? <span>&#8597;</span> : <span>&#8593;</span>}
            </button>
            {pregunta.abierto && <p>{pregunta.respuesta}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
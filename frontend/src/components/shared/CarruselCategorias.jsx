import { useState } from "react";
import { mockData } from "../../data/mockData";
import ButtonLink from "../buttons/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faKey,
  faPaintBrush,
  faWrench,
  faTruck,
  faTrash,
  faQuestionCircle,
  faHandsHelping,
  faCogs,
  faTree,
  faBroom,
} from "@fortawesome/free-solid-svg-icons";

const iconosCategoria = {
  Cerrajería: faKey,
  "Diseño gráfico": faPaintBrush,
  Electricidad: faWrench,
  Gasfitería: faWrench,
  Mudanzas: faTruck,
  Basura: faTrash,
  "Lo que sea": faQuestionCircle,
  Servir: faHandsHelping,
  Pintura: faPaintBrush,
  Instalación: faCogs,
  Jardinería: faTree,
  Limpieza: faBroom,
};

const CarruselCategorias = () => {
  const categorias = mockData.categorias;
  const [indiceActivo, setIndiceActivo] = useState(0);
  const categoriasPorVista = 5;

  const siguienteCategoria = () => {
    setIndiceActivo((prevIndice) => {
      if (prevIndice + categoriasPorVista >= categorias.length) {
        return 0;
      }
      return prevIndice + 1;
    });
  };

  const anteriorCategoria = () => {
    setIndiceActivo((prevIndice) => {
      if (prevIndice === 0) {
        return categorias.length - categoriasPorVista;
      }
      return prevIndice - 1;
    });
  };


  const categoriasVisibles = categorias.slice(
    indiceActivo,
    indiceActivo + categoriasPorVista
  );

  return (
    <div className="carrusel-container">
      <div className="heading-carrusel">
        <h2>Categorías</h2>
        <ButtonLink to="/categorias" className="btn-terciary">
          Ver Todas <FontAwesomeIcon icon={faArrowRightLong} />
        </ButtonLink>
      </div>
      <div className="carrusel">
        <button onClick={anteriorCategoria}><FontAwesomeIcon icon={faArrowLeftLong} /></button>
        <div className="categorias-container">
          {categoriasVisibles.map((categoria) => (
            <div key={categoria.id} className="categoria">
              <FontAwesomeIcon className="icono-categoria" icon={iconosCategoria[categoria.nombre]} />
              <h3>{categoria.nombre}</h3>
            </div>
          ))}
        </div>
        <button onClick={siguienteCategoria}><FontAwesomeIcon icon={faArrowRightLong} /></button>
      </div>
    </div>
  );
};

export default CarruselCategorias;

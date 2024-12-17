import { useEffect, useState } from "react";
import api from "../../api";
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
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indiceActivo, setIndiceActivo] = useState(0);
  const categoriasPorVista = 3;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        if (Array.isArray(response.data)) {
          setCategorias(response.data);
        } else {
          throw new Error("Datos inválidos desde el servidor.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener las categorías:", err);
        setError("No se pudieron cargar las categorías.");
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

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

  const categoriasVisibles = Array.isArray(categorias)
    ? categorias.slice(indiceActivo, indiceActivo + categoriasPorVista)
    : [];

  if (loading) {
    return <div className="loading">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="carrusel-container">
      <div className="heading-carrusel">
        <h2>Categorías</h2>
        <ButtonLink to="/categorias" className="btn-terciary">
          Ver Todas <FontAwesomeIcon icon={faArrowRightLong} />
        </ButtonLink>
      </div>
      <div className="carrusel">
        <button onClick={anteriorCategoria} aria-label="Categoría anterior">
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div className="categorias-container">
          {categoriasVisibles.map((categoria) => (
            <div key={categoria.id} className="categoria">
              <FontAwesomeIcon
                className="icono-categoria"
                icon={iconosCategoria[categoria.nombre] || faQuestionCircle}
              />
              <h3>{categoria.nombre}</h3>
            </div>
          ))}
        </div>
        <button onClick={siguienteCategoria} aria-label="Siguiente categoría">
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
    </div>
  );
};

export default CarruselCategorias;

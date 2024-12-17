import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "../components/cards/ServiceCard";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const HazUnServi = () => {
  const { categoriaId } = useParams();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ ubicacion: "", presupuesto: "" });

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const response = await api.get("/servicios", {
          params: { categoriaId, ...filtros },
        });
        setServicios(response.data);
      } catch (err) {
        setError("No pudimos cargar los servicios. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, [categoriaId, filtros]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFiltros({ ubicacion: "", presupuesto: "" });
  };

  const handleOfferClick = (servicioId) => {
    api.post(`/ofertas`, {
      id_servicio: servicioId,
      id_usuario: 1,
      oferta: 50000,
    })
      .then(() => {
        alert("Oferta enviada con éxito!");
      })
      .catch((error) => {
        console.error("Error al enviar oferta:", error);
      });
  };

  if (loading) {
    return <div className="loading-container">Cargando servicios...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h4>Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="servi-gallery">
      <div className="gallery-filters">
        <h3>Filtrar Servicios</h3>
        <div className="filter-container">
          <label>
            Ubicación:
            <input
              type="text"
              name="ubicacion"
              value={filtros.ubicacion}
              onChange={handleFilterChange}
              placeholder="Ej: Ñuñoa"
            />
          </label>
          <label>
            Presupuesto Máximo:
            <input
              type="number"
              name="presupuesto"
              value={filtros.presupuesto}
              onChange={handleFilterChange}
              placeholder="Ej: 20000"
            />
          </label>
        </div>
        <button className="btn-primary" onClick={handleClearFilters}>
          <FontAwesomeIcon icon={faFilter} /> Limpiar Filtros
        </button>
      </div>

      <div className="services-card-container">
        {servicios.length > 0 ? (
          servicios.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              servicio={servicio}
              onOfferClick={handleOfferClick}
            />
          ))
        ) : (
          <h4>No hay servicios disponibles con los filtros seleccionados.</h4>
        )}
      </div>
    </section>
  );
};

export default HazUnServi;

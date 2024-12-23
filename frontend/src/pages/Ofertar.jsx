import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const Ofertar = () => {
  const { id_servicio } = useParams();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState("");
  const [error, setError] = useState("");
  const [yaOfertado, setYaOfertado] = useState(false);

  useEffect(() => {
    const checkExistingOffer = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get(`/ofertas/usuario/${id_servicio}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length > 0) {
          setYaOfertado(true);
        }
      } catch (err) {
        console.error("Error al verificar oferta existente:", err.message);
      }
    };

    checkExistingOffer();
  }, [id_servicio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (yaOfertado) {
      setError("Ya has realizado una oferta para este servicio.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      const response = await api.post(
        "/ofertas",
        { id_servicio, oferta: parseInt(oferta) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Oferta enviada:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Error al enviar la oferta:",
        err.response?.data || err.message
      );
      setError("Hubo un error al enviar la oferta. Inténtalo de nuevo.");
    }
  };

  return (
    <section className="ofertar-section">
      <h2>Enviar Oferta</h2>
      {error && <p className="error-message">{error}</p>}
      {yaOfertado ? (
        <p>Ya has realizado una oferta para este servicio.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="oferta">Monto de la Oferta (CLP):</label>
          <input
            type="number"
            id="oferta"
            value={oferta}
            onChange={(e) => setOferta(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Enviar Oferta
          </button>
        </form>
      )}
    </section>
  );
};

export default Ofertar;

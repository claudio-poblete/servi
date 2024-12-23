const db = require('../config/database');

// Crear una nueva oferta
const createOferta = async (id_servicio, id_usuario, oferta) => {
  try {
    const checkQuery = 'SELECT * FROM ofertas WHERE id_servicio = $1 AND id_usuario = $2';
    const checkResult = await db.query(checkQuery, [id_servicio, id_usuario]);

    if (checkResult.rows.length > 0) {
      throw new Error('Ya existe una oferta para este servicio por este usuario');
    }

    const query = 'INSERT INTO ofertas (id_servicio, id_usuario, oferta) VALUES ($1, $2, $3) RETURNING *';
    const params = [id_servicio, id_usuario, oferta];
    const result = await db.query(query, params);

    return result.rows[0];
  } catch (error) {
    console.error('Error al crear la oferta:', error);
    throw error;
  }
};

// Obtener todas las ofertas
const getAllOfertas = async () => {
  try {
    const query = 'SELECT * FROM ofertas';
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener todas las ofertas:', error);
    throw error;
  }
};

// Obtener una oferta por su ID
const getOfertaById = async (id_oferta) => {
  try {
    const query = `
      SELECT
        o.id AS id_oferta,
        o.oferta,
        o.estado AS estado_oferta,
        u.id AS id_usuario,
        u.nombre AS nombre_usuario,
        u.foto_perfil AS foto_perfil_usuario,
        s.id AS id_servicio,
        s.titulo AS titulo_servicio,
        s.ubicacion AS ubicacion_servicio
      FROM ofertas o
      JOIN servicio s ON o.id_servicio = s.id
      JOIN usuario u ON o.id_usuario = u.id
      WHERE o.id = $1
    `;
    const result = await db.query(query, [id_oferta]);

    if (result.rowCount === 0) {
      throw new Error('Oferta no encontrada');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la oferta por ID:', error);
    throw error;
  }
};

// Obtener ofertas realizadas por un usuario
const getOfertasByUsuario = async (id_usuario) => {
  try {
    const query = `
      SELECT
        o.id AS id_oferta,
        o.oferta,
        o.estado AS estado_oferta,
        s.id AS id_servicio,
        s.titulo AS titulo_servicio,
        s.ubicacion AS ubicacion_servicio
      FROM ofertas o
      JOIN servicio s ON o.id_servicio = s.id
      WHERE o.id_usuario = $1
    `;
    const result = await db.query(query, [id_usuario]);

    return result.rows;
  } catch (error) {
    console.error('Error al obtener las ofertas del usuario:', error);
    throw error;
  }
};

// Obtener ofertas recibidas para los servicios de un usuario
const getOfertasRecibidas = async (id_usuario) => {
  try {
    const query = `
      SELECT
        o.id AS id_oferta,
        o.oferta,
        o.estado AS estado_oferta,
        u.id AS id_usuario,
        u.nombre AS nombre_usuario,
        u.foto_perfil AS foto_perfil_usuario,
        s.id AS id_servicio,
        s.titulo AS titulo_servicio,
        s.ubicacion AS ubicacion_servicio
      FROM ofertas o
      JOIN servicio s ON o.id_servicio = s.id
      JOIN usuario u ON o.id_usuario = u.id
      WHERE s.id_usuario = $1
    `;
    const result = await db.query(query, [id_usuario]);

    return result.rows;
  } catch (error) {
    console.error('Error al obtener las ofertas recibidas:', error);
    throw error;
  }
};

// Eliminar una oferta
const deleteOferta = async (id_oferta) => {
  try {
    const query = 'DELETE FROM ofertas WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id_oferta]);

    if (result.rowCount === 0) {
      throw new Error('Oferta no encontrada');
    }

    return { message: 'Oferta eliminada correctamente', oferta: result.rows[0] };
  } catch (error) {
    console.error('Error al eliminar la oferta:', error);
    throw error;
  }
};

// Aceptar una oferta
const acceptOferta = async (id_oferta) => {
  try {
    const query = `
      UPDATE ofertas
      SET estado = TRUE
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id_oferta]);

    if (result.rowCount === 0) {
      throw new Error('Oferta no encontrada');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error al aceptar la oferta:', error);
    throw error;
  }
};

module.exports = {
  createOferta,
  getAllOfertas,
  getOfertaById,
  getOfertasByUsuario,
  getOfertasRecibidas,
  deleteOferta,
  acceptOferta,
};

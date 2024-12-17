const db = require('../config/database');

const crearServicio = async (titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria) => {
  try {
    const queryCheck = 'SELECT * FROM servicio WHERE titulo = $1 AND id_usuario = $2';
    const checkResult = await db.query(queryCheck, [titulo, id_usuario]);

    if (checkResult.rows.length > 0) {
      throw new Error('Ya existe un servicio con este título para el usuario');
    }

    const query = 'INSERT INTO servicio (titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const params = [titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria];
    const result = await db.query(query, params);

    return result.rows[0];
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    throw error;
  }
};

const obtenerServicios = async ({ categoriaId, ubicacion, presupuesto }) => {
  try {
    let query = 'SELECT * FROM servicio WHERE estado = TRUE'; // Solo servicios activos
    const params = [];

    // Agregar filtros dinámicamente
    if (categoriaId) {
      query += ` AND id_categoria = $${params.length + 1}`;
      params.push(categoriaId);
    }

    if (ubicacion) {
      query += ` AND ubicacion ILIKE $${params.length + 1}`;
      params.push(`%${ubicacion}%`);
    }

    if (presupuesto) {
      query += ` AND presupuesto <= $${params.length + 1}`;
      params.push(presupuesto);
    }

    const result = await db.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los servicios con filtros:', error);
    throw error;
  }
};

const obtenerServiciosPorUsuario = async (id_usuario) => {
  try {
    const query = 'SELECT * FROM servicio WHERE id_usuario = $1 AND estado = TRUE'; // Solo los servicios activos
    const result = await db.query(query, [id_usuario]);

    return result.rows;
  } catch (error) {
    console.error('Error al obtener los servicios del usuario:', error);
    throw error;
  }
};

const obtenerServiciosPorId = async (id_servicio) => {
  try {
    const query = 'SELECT * FROM servicio WHERE id = $1';
    const result = await db.query(query, [id_servicio]);

    if (result.rows.length === 0) {
      throw new Error('Servicio no encontrado');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener el servicio:', error);
    throw error;
  }
};

const actualizarServicios = async (id_servicio, titulo, descripcion, presupuesto, ubicacion, id_categoria, estado) => {
  try {
    const checkQuery = 'SELECT * FROM servicio WHERE id = $1';
    const checkResult = await db.query(checkQuery, [id_servicio]);

    if (checkResult.rows.length === 0) {
      throw new Error('Servicio no encontrado');
    }

    const query = `
      UPDATE servicio
      SET titulo = $1, descripcion = $2, presupuesto = $3, ubicacion = $4, id_categoria = $5, estado = $6 
      WHERE id = $7 RETURNING *`;
    const params = [titulo, descripcion, presupuesto, ubicacion, id_categoria, estado, id_servicio];
    const result = await db.query(query, params);

    return result.rows[0];
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    throw error;
  }
};

const eliminarServicio = async (id_servicio) => {
  try {
    const checkQuery = 'SELECT * FROM servicio WHERE id = $1';
    const checkResult = await db.query(checkQuery, [id_servicio]);

    if (checkResult.rows.length === 0) {
      throw new Error('Servicio no encontrado');
    }

    const deleteQuery = 'DELETE FROM servicio WHERE id = $1';
    await db.query(deleteQuery, [id_servicio]);

    return { message: 'Servicio eliminado correctamente' };
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    throw error;
  }
};

module.exports = {
  crearServicio,
  obtenerServicios,
  obtenerServiciosPorUsuario,
  obtenerServiciosPorId,
  actualizarServicios,
  eliminarServicio
};


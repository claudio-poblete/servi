const db = require('../config/database')

const createPago = async (id_oferta, id_usuario) => {
  try {
    const checkQuery = `
      SELECT * FROM ofertas
      WHERE id = $1 AND id_usuario = $2
    `
    const checkResult = await db.query(checkQuery, [id_oferta, id_usuario])

    if (checkResult.rows.length === 0) {
      throw new Error('La oferta no existe o el usuario no tiene una oferta válida para este pago')
    }

    const checkPagoQuery = 'SELECT * FROM pago WHERE id_oferta = $1 AND id_usuario = $2'
    const checkPagoResult = await db.query(checkPagoQuery, [id_oferta, id_usuario])

    if (checkPagoResult.rows.length > 0) {
      throw new Error('Este usuario ya ha pagado por esta oferta')
    }

    const query = 'INSERT INTO pago (id_oferta, id_usuario) VALUES ($1, $2) RETURNING *'
    const params = [id_oferta, id_usuario]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear el pago:', error)
    throw error
  }
}

const getPagosByUsuario = async (id_usuario) => {
  try {
    const query = 'SELECT * FROM pago WHERE id_usuario = $1'
    const result = await db.query(query, [id_usuario])

    return result.rows
  } catch (error) {
    console.error('Error al obtener los pagos por usuario:', error)
    throw error
  }
}

const getPagosByOferta = async (id_oferta) => {
  try {
    const query = 'SELECT * FROM pago WHERE id_oferta = $1'
    const result = await db.query(query, [id_oferta])

    return result.rows
  } catch (error) {
    console.error('Error al obtener los pagos por oferta:', error)
    throw error
  }
}

const getAllPagos = async () => {
  try {
    const query = 'SELECT * FROM pago'
    const result = await db.query(query)

    return result.rows
  } catch (error) {
    console.error('Error al obtener los pagos:', error)
    throw error
  }
}

const getPagoById = async (id_pago) => {
  try {
    const query = 'SELECT * FROM pago WHERE id = $1'
    const result = await db.query(query, [id_pago])

    if (result.rows.length === 0) {
      throw new Error('Pago no encontrado')
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener el pago:', error)
    throw error
  }
}

const updatePago = async (id_pago, id_oferta, id_usuario) => {
  try {
    const checkQuery = 'SELECT * FROM pago WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_pago])

    if (checkResult.rows.length === 0) {
      throw new Error('Pago no encontrado')
    }

    const checkOfertaQuery = 'SELECT * FROM ofertas WHERE id = $1'
    const checkOfertaResult = await db.query(checkOfertaQuery, [id_oferta])

    if (checkOfertaResult.rows.length === 0) {
      throw new Error('Oferta no encontrada')
    }

    const checkUserQuery = 'SELECT * FROM ofertas WHERE id = $1 AND id_usuario = $2'
    const checkUserResult = await db.query(checkUserQuery, [id_oferta, id_usuario])

    if (checkUserResult.rows.length === 0) {
      throw new Error('El usuario no tiene una oferta válida para este pago')
    }

    const query = 'UPDATE pago SET id_oferta = $1, id_usuario = $2 WHERE id = $3 RETURNING *'
    const params = [id_oferta, id_usuario, id_pago]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al actualizar el pago:', error)
    throw error
  }
}

const deletePago = async (id_pago) => {
  try {
    const checkQuery = 'SELECT * FROM pago WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_pago])

    if (checkResult.rows.length === 0) {
      throw new Error('Pago no encontrado')
    }

    const deleteQuery = 'DELETE FROM pago WHERE id = $1'
    const result = await db.query(deleteQuery, [id_pago])

    return { message: 'Pago eliminado correctamente' }
  } catch (error) {
    console.error('Error al eliminar el pago:', error)
    throw error
  }
}

module.exports = {
  createPago,
  getAllPagos,
  getPagoById,
  updatePago,
  deletePago,
  getPagosByUsuario,
  getPagosByOferta
}
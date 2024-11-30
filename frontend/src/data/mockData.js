const usuarios = [
  {
    id: 1,
    nombre: 'Claudio Poblete',
    contraseña: '12345678',
    email: 'ejemplo@email.com',
    fotoPerfil: 'url',
    descripcion: 'Cerrajero con 10 años de experiencia en reparación de cerraduras y seguridad',
    valoracion: 4.8,
    isVerified: true,
    serviciosCompletados: 42,
    solicitudesServicios: 2,
    informacionPersonal: {
      telefono: '987654321',
      direccion: 'Av. calle 123, Chile'
    },
  },

  {
    id: 2,
    nombre: 'Sebastian Peña',
    contraseña: '87654321',
    email: 'email@ejemplo.com',
    fotoPerfil: 'url',
    descripcion: 'Diseñador gráfico especializado en branding y diseño web',
    valoracion: 4.8,
    isVerified: false,
    serviciosCompletados: 35,
    solicitudesServicios: 3,
    informacionPersonal: {
      telefono: '12345678',
      direccion: 'Calle avenida 321, Chile'
    },
  },
]

const servicios = [
  {
    id: 1,
    titulo: 'Reparación de cerraduras',
    ubicacion: 'Santiago, Chile',
    fechaPublicacion: '2024-11-26',
    idUsuario: 1,
    idCategoria: 1,
    estado: 'pendiente',
  },

  {
    id: 2,
    titulo: 'Reparación de cerraduras',
    ubicacion: 'Providencia, Chile',
    fechaPublicacion: '2024-11-25',
    idUsuario: 2,
    idCategoria: 2,
    estado: 'completado',
  },
]

const categorias = [
  { id: 1, nombre: 'Cerrajería' },
  { id: 2, nombre: 'Diseño gráfico'},
  { id: 3, nombre: 'Electricidad' },
  { id: 4, nombre: 'Gasfitería' },
]

const ofertas = [
  {
    id: 1,
    idUsuario: 1,
    idServicio: 1,
    titulo: 'Cambio de cerradura principal',
    descripcion: 'Busco un cerrajero para cambiar la cerradura de la puerta principal',
    oferta: 30000,
    estado: 'pendiente',
  },

  {
    id: 2,
    idUsuario: 2,
    idServicio: 2,
    titulo: 'Rediseño de sitio web',
    descripcion: 'Necesito rediseñar el sitio web de mi negocio',
    oferta: 50000,
    estado: 'aceptado',
  },
]

export const mockData = {
  usuarios,
  servicios,
  categorias,
  ofertas,
}


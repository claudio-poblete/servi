const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/
  const isValidExt = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
  const isValidMime = allowedFileTypes.test(file.mimetype)

  if (isValidExt && isValidMime) {
    cb(null, true)
  } else {
    cb(new Error('Formato de archivo inválido. Solo se permiten imágenes JPG y PNG.'), false)
  }
}

const maxSize = 5 * 1024 * 1024

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
})

const uploadServiceImage = upload.single('imagen_servicio')

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Error de subida: ${err.message}` })
  } else if (err) {
    return res.status(400).json({ error: err.message })
  }
  next()
}


module.exports = {
  uploadServiceImage,
  handleUploadErrors,
}
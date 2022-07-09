const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './imagenes')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname )
    }
  })
  
  exports.upload = multer({ storage: storage })

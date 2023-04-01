const multer = require('multer')
const path = require('path')

  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  exports.upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5,},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
  });
  
  function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
  
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
  }
  

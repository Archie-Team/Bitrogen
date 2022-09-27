const multer = require('multer');
const mkdirp = require('mkdirp');
const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = './public/signals'
        mkdirp(path).then(made =>
            cb(made, path))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const ImageFilter = (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadauth = multer({
    storage: ImageStorage,
    fileFilter: ImageFilter
})

module.exports = {
    uploadauth
}
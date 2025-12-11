import multer from 'multer'

const uploadLocal = multer({
    storage: multer.memoryStorage()
});

export default uploadLocal;
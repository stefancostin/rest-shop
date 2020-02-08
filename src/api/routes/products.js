const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif') {

    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const ProductController = require('../controllers/products');

router.get('/', ProductController.getAllProducts);

router.get('/:productId', ProductController.getProduct);

router.post('/', auth, upload.single('productImage'), ProductController.createProduct);

router.patch('/:productId', auth, upload.single('productImage'), ProductController.updateProduct);

router.delete('/:productId', auth, ProductController.deleteProduct);

module.exports = router;
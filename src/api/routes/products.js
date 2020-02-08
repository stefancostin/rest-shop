const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

const ProductsController = require('../controllers/products');

router.get('/', ProductsController.getAllProducts);

router.get('/:productId', ProductsController.getProduct);

router.post('/', auth, upload.single('productImage'), ProductsController.createProduct);

router.patch('/:productId', auth, upload.single('productImage'), ProductsController.updateProduct);

router.delete('/:productId', auth, ProductsController.deleteProduct);

module.exports = router;
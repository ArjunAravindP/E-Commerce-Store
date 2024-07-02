const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/admin');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Export the router and upload middleware

router.get('/products', adminController.getProducts);
router.post(
  '/add-product',
  upload.single('image'), // Apply the middleware to handle file upload
  adminController.postAddProduct
);

router.post(
  '/update-product/:id',
  upload.single('image'), // Apply the middleware to handle file upload
  adminController.postUpdateProduct
);

router.post('/delete/:id', adminController.deleteProduct);
router.post('/set-order-status/:id', adminController.setStatus);
router.get('/users', adminController.getUsers);
router.post('/user/delete/:id', adminController.deleteUser);

module.exports = router;

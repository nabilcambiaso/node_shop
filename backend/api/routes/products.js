const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const productController = require('../controllers/products');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File type must be either png or jpeg'), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.get("/", productController.get_all_products);

router.post("/", checkAuth, upload.single('productImage'), productController.create_product);

router.get("/:productId", productController.get_product);

router.patch("/:productId", checkAuth, productController.update_product);

router.delete("/:productId", checkAuth, productController.delete_product);

module.exports = router;

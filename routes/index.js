var express = require('express');
var router = express.Router();
const index = require('../controllers/index-controller');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

/* GET home page. */
router.route('/')
  .get(catchAsync(index.index))
  .post(upload.single('image'), catchAsync(index.uploadImage));

module.exports = router;

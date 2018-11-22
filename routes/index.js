const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/picture');
const upload = multer({ dest: './public/uploads/' });


//image rendering
router.get('/', function (req, res, next) {
  //mongoose finds all the photos in the db and passes them to the view
  Picture.find((err, pictures) => {
    //here we pass the pictures array to the view
    res.render('index', {
      pictures
    })
  })
});


//endpoint for image upload using multer
router.post('/upload', upload.single('photo'), (req, res) => {
  //mongo save action via mongoose
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  //actual db save via mongoose
  pic.save((err) => {
    res.redirect('/');
  });
});

module.exports = router;
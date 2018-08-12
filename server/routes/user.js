const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {maxFileSize: 1024*1024*5}}).single('file');

const base64 = require('base-64');



router.post('/upload' , (req,res) => {

  upload(req,res , (err) => {
    if(err){
      console.log(err);
    }
    else{
      const body = req.file;
      console.log(req.file);

      const base64Data = body.buffer.toString("base64");
      console.log(base64Data);
    }
  });
});

router.post('/submit', (req,res) => {
  console.log(req.body);
});

module.exports = router;

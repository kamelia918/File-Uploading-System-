// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fileController = require('../controllers/fileController');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// router.post('/upload', upload.single('file'), fileController.uploadFile);
// router.get('/files/:id', fileController.getFileInfo);
// router.get('/download/:id', fileController.downloadFile);
// router.put('/files/:id', fileController.updateFileInfo);
// router.delete('/files/:id', fileController.deleteFile);

// module.exports = router;


const express=require("express");
const router=express.Router();
const {getFileName,UpdateFileName}=require("../controllers/fileController");

router.route('/:id').get(getFileName);
router.route('/:id').put(UpdateFileName);


module.exports=router;
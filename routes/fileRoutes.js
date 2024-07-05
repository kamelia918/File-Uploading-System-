const express=require("express");
const router=express.Router();
const {getFileName,UpdateFileName,deleteFileName,downloadFile}=require("../controllers/fileController");

router.route('/:id').get(getFileName);
router.route('/:id').put(UpdateFileName);
router.route('/:id').delete(deleteFileName);
router.route('/download/:id').get(downloadFile);
module.exports=router;
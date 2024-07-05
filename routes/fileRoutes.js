const express=require("express");
const router=express.Router();
const {getFileName,UpdateFileName,deleteFileName}=require("../controllers/fileController");

router.route('/:id').get(getFileName);
router.route('/:id').put(UpdateFileName);
router.route('/:id').delete(deleteFileName);
module.exports=router;
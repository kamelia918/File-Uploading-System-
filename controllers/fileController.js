// const File = require('../models/file');
// const fs = require('fs');
// const path = require('path');

// exports.uploadFile = async (req, res) => {
//   try {
//     const file = req.file;
//     const { description } = req.body;

//     const fileDoc = new File({
//       name: file.filename,
//       size: file.size,
//       description,
//       mime_type: file.mimetype,
//       path: file.path
//     });

//     await fileDoc.save();
//     res.status(201).json({ file_id: fileDoc._id });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to upload file' });
//   }
// };

// exports.getFileInfo = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     if (!file) return res.status(404).json({ error: 'File not found' });

//     res.json(file);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve file information' });
//   }
// };

// exports.downloadFile = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     if (!file) return res.status(404).json({ error: 'File not found' });

//     res.download(file.path, file.name);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to download file' });
//   }
// };

// exports.updateFileInfo = async (req, res) => {
//   try {
//     const { description } = req.body;
//     const file = await File.findById(req.params.id);
//     if (!file) return res.status(404).json({ error: 'File not found' });

//     if (description) file.description = description;
//     await file.save();

//     res.json({ message: 'File information updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update file information' });
//   }
// };

// exports.deleteFile = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     if (!file) return res.status(404).json({ error: 'File not found' });

//     fs.unlinkSync(file.path);
//     await file.remove();

//     res.json({ message: 'File deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete file' });
//   }
// };



const asyncHandler=require("express-async-handler");
const fileInfo=require("../models/fileModel");

//@desc get a file information by ID
//@route Get/api/filesname/:id
//@access public

const getFileName= asyncHandler(async(req,res)=>{
    const fileName=await  fileInfo.findById(req.params.id);
    if(!fileName){
        res.status(404);
        throw new Error("Contact NOT FOUND");
    }
    // res.status(200).json({message:`get contact for ${req.params.id}`});
    res.status(200).json(fileName);
});

// const getFileName= asyncHandler(async(req,res)=>{
//     res.status(200).json({message:`get contact for ${req.params.id}`});
// });


//@desc update a file information by ID
//@route Put/api/filesname/:id
//@access public

const UpdateFileName= asyncHandler(async(req,res)=>{
    const fileName=await  fileInfo.findById(req.params.id);
    if(!fileName){
        res.status(404);
        throw new Error("Contact NOT FOUND");
    }
    const updatedFileName=await fileInfo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    // res.status(200).json({message:"update contact for "+req.params.id});
    res.status(200).json(updatedFileName);
});

// const UpdateFileName= asyncHandler(async(req,res)=>{
//     res.status(200).json({message:"update contact for "+req.params.id});
// });


module.exports={getFileName,UpdateFileName};

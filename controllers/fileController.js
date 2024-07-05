const asyncHandler=require("express-async-handler");
const fileInfo=require("../models/fileModel");



//@desc get a file information by ID
//@route Get/api/filesname/:id
//@access public
//The api should have an endpoint to retrieve file information by id.


const getFileName= asyncHandler(async(req,res)=>{
    const fileName=await  fileInfo.findById(req.params.id);
    if(!fileName){
        res.status(404);
        throw new Error("Contact NOT FOUND");
    }
    res.status(200).json(fileName);
});



//@desc update a file information by ID
//@route Put/api/filesname/:id
//@access public
//The api should have an endpoint to update file information

const UpdateFileName= asyncHandler(async(req,res)=>{
    const fileName=await  fileInfo.findById(req.params.id);
    if(!fileName){
        res.status(404);
        throw new Error("Contact NOT FOUND");
    }

    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.description) updateFields.description = req.body.description;

    const updatedFileName=await fileInfo.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        {new:true}
    );

    res.status(200).json(updatedFileName);
});

//@desc delete a file  by ID
//@route DELETE/api/filesname/:id
//@access public
//The api should have and endpoint to delete file by id.

const fs = require('fs');
const deleteFileName= asyncHandler(async(req,res)=>{
    // make sure that the file existe
    const fileName=await  fileInfo.findById(req.params.id);
    if(!fileName){
        res.status(404);
        throw new Error("Contact NOT FOUND");
    }
    
    // Delete the file from the filesystem
    fs.unlink(fileName.path, async (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting file' });
        return;
      }
  
     
    });

    //Delete File Informations from the data base
    await fileInfo.deleteOne({ _id: req.params.id });
    res.status(200).json("File deleted successfully from the data base and the server ");

});


//@desc delete a file  by ID
//@route DELETE/api/filesname/:id
//@access public
//The api should have an endpoint to retrieve file by id.



// Requiring express-zip for downloading a zip file
const zip = require('express-zip');


const downloadFile= asyncHandler(async(req,res)=>{
    console.log("downloading");
    // make sure that the file existe
    const fileName=await  fileInfo.findById(req.params.id);
    if(!fileName){
        res.status(404);
        throw new Error("Contact NOT FOUND");
    }

    // Download function provided by express
    res.download(fileName.path, fileName.name,function(err) {
        if(err) {
            console.log(err);
        }
    })
});





  


module.exports={getFileName,UpdateFileName,deleteFileName,downloadFile};

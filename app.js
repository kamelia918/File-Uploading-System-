const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require("./config/dbConnection");
const File = require('./models/fileModel'); // Import the File model

require("dotenv").config();
const app = express();
const port = 3000;

connectDB();

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Parser to parse the data that we received from the client to the server side
app.use(express.json());

app.use("/api/filesname", require("./routes/fileRoutes"));

// Require the upload middleware
const upload = require('./upload');

// Set up a route for file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, size, mimetype, path } = req.file;

    // Create a new file document
    const file = new File({
      name: originalname,
      size: size,
      mime_type: mimetype,
      path: path,
      description: req.body.description || '' // Optional description from the form
    });

    // Save the file information in the database
    await file.save();

    res.json({ message: 'File uploaded and saved successfully!', file: req.file });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

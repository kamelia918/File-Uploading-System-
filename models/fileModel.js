const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  description: { type: String, default: '' },
  mime_type: { type: String, required: true },
  path: { type: String, required: true }
});

module.exports = mongoose.model('File', fileSchema);

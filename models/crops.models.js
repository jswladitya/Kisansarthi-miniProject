const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  Temperature: Number,
  Humidity: Number,
  Moisture: Number,
  Soil_Type: String,
  Crop_Type: String,
  Nitrogen: Number,
  Potassium: Number,
  Phosphorous: Number,
  Fertilizer: String,
});

module.exports = mongoose.model('Crop', CropSchema);

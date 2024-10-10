// routes/crop.js
const express = require('express');
const router = express.Router();
const Crop = require('../models/crops.models');

// Route to render the form
router.get('/find-fertilizer', (req, res) => {
  res.render('fertilizerForm');
});

// Route to handle form submission and find the fertilizer
router.post('/find-fertilizer', async (req, res) => {
  try {
    // Destructure form input data from the request body
    const { Temperature, Humidity, Moisture, Soil_Type, Crop_Type, Nitrogen, Potassium, Phosphorous } = req.body;
    

    // Query the database for matching crop details
    const crop = await Crop.findOne({
      Temperature: Number(Temperature),
      Humidity: Number(Humidity),
      Moisture: Number(Moisture),
      Soil_Type,
      Crop_Type,
      Nitrogen: Number(Nitrogen),
      Potassium: Number(Potassium),
      Phosphorous: Number(Phosphorous),
    });


    // If no crop is found, show a message
    if (!crop) {
      return res.render('fertilizerResult', { message: 'No matching crop found for the given details.', crop: null });
    }

    // If crop is found, render the result page with crop details
    return res.render('fertilizerResult', { message: 'Recommended Fertilizer Found:', crop });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;

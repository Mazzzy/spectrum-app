const express = require('express');
const spectrumController = require('../controllers/spectrum');

const spectrumRouter = express.Router();

spectrumRouter.route('/')
  .get(spectrumController.getAllSpectrum);

spectrumRouter.route('/:area')
  .get(spectrumController.getSpectrumByArea);

module.exports = spectrumRouter;
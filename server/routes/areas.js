const express = require('express');
const areasController = require('../controllers/areas');

const areasRouter = express.Router();

areasRouter.route('/')
  .get(areasController.getAllAreas)
  .post(areasController.createArea);


areasRouter.route('/:id')
  .get(areasController.getOneArea)
  .patch(areasController.updateArea)
  .delete(areasController.deleteArea);

module.exports = areasRouter;
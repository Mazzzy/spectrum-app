const fileOperations = require("../utils/fileOperations");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const areasFileContext = new fileOperations('./data/areas/areas.json');

// GET
exports.getAllAreas = catchAsync(async (req, res, next) => {
  try {
    await areasFileContext.readFile(data => {
      if (!data && !data.length > 0) {
        return next(new AppError("Couldn't find areas in storage", 404));
      }
      // return all available areas from storage
      res.status(200).json({
        status: "success",
        results: data.length,
        data: data,
      });
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while getting all areas from storage", 500));
  } 
});

exports.getOneArea = catchAsync(async (req, res, next) => {
  try {
    await areasFileContext.readFile(data => {
      // find area by id
      const areaId = req.params.id;
      let foundArea = data.find(el => el.id == areaId);
      
      if (!foundArea) {
        return next(new AppError(`Couldn't find a area with id: ${areaId}`, 404));
      }
      // return area with matched if from storage
      res.status(200).json({
        status: "success",
        data: foundArea,
      });
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while getting specific area by id from storage", 500));
  } 
});

// POST
exports.createArea = catchAsync(async (req, res, next) => {
  try {
    await areasFileContext.readFile(data => {
      /**
       * Check if current area with id is already present
       * if yes, send an message and return
       * this function
       */
      let currentArea = req.body.area;
      const foundArea = data.some(el => el.name === currentArea.name);
      if (foundArea) {
        return next(
          new AppError(
            `You already had a area with given name: ${currentArea.name}. Please create with different name`,
            405,
          ),
        );
      }

      /**
      * If everything is good, create a new area
      */

      const newAreaId = data.length + 1;
      
      // add the new area
      const newArea = {
        id: newAreaId,
        ...req.body.area
      };
    
      data.push(newArea);
    
      areasFileContext.writeFile(JSON.stringify(data, null, 2), () => {
        // return newly created area item
        res.status(201).json({
          status: "success",
          data: newArea,
        });
      });
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while adding area in storage", 500));
  } 
});

//PATCH
exports.updateArea = catchAsync(async (req, res, next) => {
  try {
    await areasFileContext.readFile(data => {
      /**
       * Check if current area with id is already existing
       * if not return error
       */
      const currentArea = req.body.area;
      const currentAreaId = req.params.id;
      let foundArea = data.find(el => el.id == currentAreaId);
      
      if (!foundArea) {
        return next(new AppError(`Couldn't find a area with id: ${currentAreaId}`, 404));
      }

      /**
       * If it is true that the update the area
       */
      
      foundArea.name = currentArea.name;
      foundArea.frequencies = currentArea.frequencies;
      
      areasFileContext.writeFile(JSON.stringify(data, null, 2), () => {
        // return updated area item
        res.status(200).json({
          status: "success",
          data: currentArea,
        });
      });
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while updating area by id in storage", 500));
  } 
});

//DELETE
exports.deleteArea = catchAsync(async (req, res, next) => {
  try {
    await areasFileContext.readFile(data => {
      /**
       * Check if current area with id is already existing
       * if not return error
       */
      
      const currentAreaId = req.params.id;
      let foundArea = data.find(el => el.id == currentAreaId);
      
      if (!foundArea) {
        return next(new AppError(`Couldn't find a area with id: ${currentAreaId}`, 404));
      }
      
      // delete the area
      data = data.filter(ele => {
        return ele.id != currentAreaId;
      })

      areasFileContext.writeFile(JSON.stringify(data, null, 2), () => {
        // return success and null after deleting area item
        res.status(204).json({
          status: "success",
          data: null,
        });
      });
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while deleting area by id from storage", 500));
  } 
});

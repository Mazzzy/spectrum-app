const fileOperations = require("../utils/fileOperations");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const areasFileContext = new fileOperations('./data/areas/areas.json');
const spectrumFileContext = new fileOperations('./data/spectrum/spectrum.json');

// GET
exports.getAllSpectrum = catchAsync(async (req, res, next) => {
  try {
    await spectrumFileContext.readFile(data => {
      if (!data && !data.length > 0) {
        return next(new AppError("Couldn't find spectrum data in storage", 404));
      }
      // return all spectrums
      res.status(200).json({
        status: "success",
        results: data.length,
        data: data,
      });
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while getting all spectrums from storage", 500));
  }  
});

exports.getSpectrumByArea = catchAsync(async (req, res, next) => {
  try {
    await areasFileContext.readFile(data => {
      // get area id from param
      const areaId = req.params.area;
      let foundArea = data.find(el => el.id == areaId);
      
      if (!foundArea) {
        return next(new AppError(`Couldn't find a area with id: ${areaId}`, 404));
      }

      const frequencies = foundArea.frequencies;
      if(frequencies && frequencies.length > 0) {
        const [min, max] = frequencies;
        try {
          spectrumFileContext.readFile(spectData => {
            const spectrums = spectData.spectrum;
            const filteredSpectrums = spectrums.filter((spect) => (spect.x >= min && spect.x <= max));
            if(filteredSpectrums && filteredSpectrums.length > 0){
              // return spectrums in frequencies range of given area
              res.status(200).json({
                status: "success",
                data: filteredSpectrums,
              });
            } else {
              return next(new AppError(`Couldn't find spectrums with given a area : ${areaId}`, 404));
            }
          }, true); 
        } catch (error) {
          return next(new AppError("There was an error while getting spectrums in freq range of given area", 500));
        }                
      }      
    }, true);
  } catch (error) {
    return next(new AppError("There was an error while getting area freqs from storage", 500));
  } 
});

const AppError = require('../utils/appError');

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;

    return new AppError(message, 400);
};

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data: ${errors.join('. ')}`;

    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Log errors into console without sending it to the client
        console.error('INTERNAL ERROR', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Internal Server Error',

        });
    }
};


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'dev') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'prod') {

        switch (err.name) {
            case 'CastError':
                err = handleCastError(err);
                break;
            case 'ValidationError':
                err = handleValidationError(err);
                break;
            default:
        }

        sendErrorProd(err, res);
    }

};
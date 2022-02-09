const express = require('express');
const dotenv = require('dotenv');
const loaders = require('./loaders');

process.on('uncaughtException', err => {
    console.log(`Uncaught Rejection! Shutting down`);
    console.log(err.name, err.message);
    process.exit(1);

});

// load env vars from .env file
dotenv.config();

// START SERVER
const startServer = async () => {
    const port = process.env.PORT || 5080;

    const application = express();
    const app = await loaders({ spectrumExpressApp: application });

    const server = app.listen(port, () => {
        console.log(`Spectrun app server listening at ${server.address().port}`);
    });

    // Handle connection errors
    process.on('unhandledRejection', err => {
        console.log(`Unhandled Rejection! Shutting down`);
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });

};

startServer();
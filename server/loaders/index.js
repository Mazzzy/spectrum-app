const expressLoader = require("./express");

module.exports = async ({ spectrumExpressApp }) => {
    const app = expressLoader({ app: spectrumExpressApp });
    console.log('Express Intialized for Spectrum app');
    return app;
};
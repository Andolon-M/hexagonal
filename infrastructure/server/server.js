// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const userRoutes = require('../../application/routes/userRoutes');
const productsRoutes = require('../../application/routes/productsRoutes');
const authRoutes = require('../../application/routes/authRoutes');

const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const { autenticateToken } = require('../middlewares/autenticateToken');



const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    

    app.use('/users',  userRoutes);
    app.use('/products', autenticateToken, productsRoutes);
    return app;
};



module.exports = createServer;
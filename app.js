const express = require('express');
const helmet = require('helmet');
require('dotenv/config');
const morgan = require('morgan');
const cors = require('cors');
const authJwtMiddleware = require('./server/middleware/jwt.js');
const jwtErrorHandler = require('./server/middleware/jwtErrorHandler.js');
const app = express();

/// CROSS-ORIGIN
app.use(cors());
app.options('*',cors());

// ENVIRONMENTS
const api = process.env.API_URL;
const port = process.env.PORT || 3000;


/// IMPORT ROUTES
const productRoutes = require('./server/routes/productsRoute');
const usersRoutes = require('./server/routes/usersRoute');
const ordersRoutes = require('./server/routes/ordersRoute');
const categoriesRoutes = require('./server/routes/categoriesRoutes');

/// MIDDLEWARE
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwtMiddleware());
app.use("/public/uploads", express.static(`${__dirname}/public/uploads`));
app.use(jwtErrorHandler);
app.use(helmet());


/// ROUTES
app.use(`${api}/products`,productRoutes);
app.use(`${api}/users`,usersRoutes);
app.use(`${api}/orders`,ordersRoutes);
app.use(`${api}/category`,categoriesRoutes);

/// DATABASE CONNECTION
const dbConnection = require('./server/databaseConfig/mongoose');
dbConnection().then();


/// RUN THE SERVER
app.listen(port,()=>{
    console.log(`app running on ${process.env.HOST}:${port}`);
});

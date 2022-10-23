const startupDebugger = require('debug')('app:startup');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// const config = require('config');
const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const dbPort = process.env.MONGO_PORT;
const database = process.env.MONGO_DATABASE;

const mongodbURI = `mongodb://${user}:${password}@${host}:${dbPort}/${database}?authSource=admin`;

mongoose.connect(mongodbURI)
    .then(() => console.log('Connected to monogod db'))
    .catch(err => console.log('Error occured while connecting to db', err));

const app = express();

// import routes
const homeRoute = require('./routes/home');
const genresRoute = require('./routes/genres');
const customersRoute = require('./routes/customer');

// middle ware logger
const logger = require('./middleware/logger');

// set view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production')
// if (app.get('env') == 'development' || app.get('env'))
{
    app.use(morgan('tiny'));
    startupDebugger('Morgan is enabled');
}

// middleware function
app.use(logger);

// use routes
app.use('/', homeRoute);
app.use('/api/genres', genresRoute);
app.use('/api/customers', customersRoute);

const port = process.env.PORT || config.get('PORT');

app.listen(port, () => console.log(`Server is running on port ${port}`));
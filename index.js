const startupDebugger = require('debug')('app:startup');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');



mongoose.connect(`mongodb://${config.get('MONGO_DB.USER')}:123456@localhost:27017/playground?authSource=admin`)

const app = express();

// import routes
const homeRoute = require('./routes/home');
const genresRoute = require('./routes/genres');

// middle ware logger
const logger = require('./middleware/logger');

// set view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') == 'development')
{
    app.use(morgan('tiny'));
    startupDebugger('Morgan is enabled');
}

// middleware function
app.use(logger);

// use routes
app.use('/', homeRoute);
app.use('/api/genres', genresRoute);

const port = process.env.PORT || config.get('PORT');

app.listen(port, () => console.log(`Server is running on port ${port}`));
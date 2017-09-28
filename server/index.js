// Importing Node modules and initializing Express
const express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
    models = require("./models"),
    config = require('./config/main');
const router = require('./router');

// Start the server
const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize(config.database.db, config.database.user, config.database.pass, config.database.config);

// models.sequelize.sync().then(function() {
//     console.log('Nice! Database looks fine')
// }).catch(function(err) {
//     console.log(err, "Something went wrong with the Database Update!")
// });
const AuthenticationController = require('./controllers/authentication');
app.post('/register', AuthenticationController.register);
app.post('/login', AuthenticationController.login);
// router(app);


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});
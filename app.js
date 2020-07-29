const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const book = require('./routes/book');
const db = require('./models');


// view engine setup
app.set('view engine', 'pug');

// make sure that the res object is converted from json and accessable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// make the public folder accessable on the /static route
app.use('/static', express.static( 'public'));


// the app can use the routes we require
app.use(routes,book);


// Start up the server


app.listen(3000, () => {

    console.log('The app is running on localhost:3000');
    
    

});


module.exports =app;
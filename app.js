const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const book = require('./routes/book');
const db = require('./models/index');


// view engine setup
app.set('view engine', 'pug');

// make sure that the res object is converted from json and accessable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// make the public folder accessable on the /static route
app.use('/static', express.static( 'public'));


// the app can use the routes we require
app.use(routes,book);


// Start up the server and Sync with the DB

let port = process.env.PORT || 3000;

db.sequelize
 .sync()
 .then(function() {
    app.listen(port);
    console.log('Server is listening on localhost ' + port);
});




/* Error Handling
    When a non existent route is requested, creates a new Error object with a user friendly message.
    Set the status to 404 (page not found)

    
*/

app.use((req, res, next) => { 


 const err = new Error('Not found!');
 err.status = 404;
 next(err);


});


  // Global error handler

  app.use((err, req, res, next) => {

  
    if (err.status === 404) {
      res.status = 404;
      res.render('page-not-found');
      
    } else {
      err.message = err.message || 'Something went wrong on the server';
      res.status = err.status || 500;
      res.render('error');
  
      
    }
  });





module.exports =app;
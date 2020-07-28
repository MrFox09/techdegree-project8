const express = require('express');
const routes = require('./routes');
const app = express();
const book = require('./routes/book');

// view engine setup
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static( 'public'));

app.use('/', routes);
app.use('/books', book);







app.listen(3000, () => {

    console.log('The app is running on localhost:3000');

});


module.exports =app;
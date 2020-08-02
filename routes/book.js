const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */

function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next);
      } catch(error){
        res.status(500).send(error);
      }
    };
  }





// Show a full list of the book entries

  router.get("/books", asyncHandler( async (req,res) => {
    const book = await Book.findAll({order:[["createdAt" , "desc"]]});
    //console.log( book.map(book => book.toJSON()) );

    res.render("index", {book});


  }));

  // Show the create a new Book form

  router.get("/books/new", asyncHandler( async (req,res) => {    

    res.render("new-book");

  }));

    // Posts a new book into the Database

    router.post("/books/new", asyncHandler( async (req,res) => {        
        let book;
        try {
          book = await Book.create(req.body);
          res.redirect("/books");
          
        } catch (error) {
          if(error.name === "SequelizeValidationError") { // checking the error
            book = await Book.build(req.body);
            res.render("new-book", { errors: error.errors});
          } else {
            throw error; // error caught in the asyncHandler's catch block
      
          }  
          
        }
    }));


    // Show book detail form

    router.get("/books/:id", asyncHandler(async (req, res,next) => {
      const book = await Book.findByPk(req.params.id);     

      if (book) {
        res.render("update-book", { book });         
        
      } else {

        const err = new Error ();
        next(err); 
        
       
      }
      
    }));    

    // Post updates to the database

    router.post("/books/:id", asyncHandler(async (req,res,next) => {
      let book;
      try {
        book = await Book.findByPk(req.params.id);
        if(book) {
          await book.update(req.body);
          res.redirect("/books"); 
        } else {
          const err = new Error ();
          next(err);
        }
      } catch (error) {
        if(error.name === "SequelizeValidationError") {
          book = await Book.build(req.body);
          book.id = req.params.id;
          res.render("update-book", { book, errors: error.errors });
        } else {
          throw error;
        }
      }
    }));

    // Deletes a book. 

    router.post("/books/:id/delete", asyncHandler(async (req, res,next) => {
      const book = await Book.findByPk(req.params.id);
    
      if (book) {
        book.destroy();
            
        res.redirect("/books");
    
        
      } else {
        const err = new Error ();
        next(err);
        
      }
    
      
    }));








  module.exports =router;
const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */

function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
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

      const newBook = await Book.create(req.body);

      res.redirect("/");
  
    }));








  module.exports =router;
module.exports = app => {
    const genres = require("../genres/genre.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Genre
    router.post("/", genre.create);
  
    // Retrieve all Genres
    router.get("/", genre.findAll);

    // Retrieve a single genre with id
    router.get("/:id", genre.findOne);
  
    // Update a Genre with id
    router.put("/:id", genre.update);
  
    // Delete a Genre with id
    router.delete("/:id", genre.delete);
  
    app.use('/api/genre', router);
  };
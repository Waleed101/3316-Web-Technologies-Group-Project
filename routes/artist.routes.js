module.exports = app => {
    const artist = require("../controller/artist.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Artist
    router.post("/", artist.create);
  
    // Retrieve all Artists
    router.get("/", artist.findAll);

    // Retrieve a single Artist with id
    router.get("/:id", artist.findOne);
  
    // Delete a Artist with id
    router.delete("/:id", artist.delete);

    // Delete all
    router.delete("/", artist.deleteAll);
  
    app.use('/api/artist', router);
};
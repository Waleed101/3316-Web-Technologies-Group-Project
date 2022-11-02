module.exports = app => {
    const album = require("../controller/album.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Album
    router.post("/", album.create);
  
    // Retrieve all Albums
    router.get("/", album.findAll);

    // Retrieve a single Album with id
    router.get("/:id", album.findOne);
  
    // Delete a Album with id
    router.delete("/:id", album.delete);

    // Delete all
    router.delete("/", album.deleteAll);
  
    app.use('/api/album', router);
};
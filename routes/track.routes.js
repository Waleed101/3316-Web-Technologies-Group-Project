module.exports = app => {
    const track = require("../controller/track.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Track
    router.post("/", track.create);
  
    // Retrieve all Tracks
    router.get("/", track.findAll);

    // Retrieve a single Track with id
    router.get("/:id", track.findOne);
  
    // Delete a Track with id
    router.delete("/:id", track.delete);

    // Delete all
    router.delete("/", track.deleteAll);
  
    app.use('/api/track', router);
};
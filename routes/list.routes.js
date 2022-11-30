module.exports = app => {
    const list = require("../controller/list.controller.js");
  
    var router = require("express").Router();
  
    // Create a new List
    router.post("/", list.create);
  
    // Retrieve all List
    router.get("/", list.findAll);

    // Retrieve all List
    router.get("/public/", list.findAllPublic);

    // Retrieve a single list with id
    router.get("/:id", list.findOne);
  
    // Update a List with id
    router.put("/:id", list.update);
  
    // Delete a List with name
    router.delete("/", list.delete);
  
    app.use('/api/list', router);
  };
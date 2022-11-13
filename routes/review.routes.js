module.exports = app => {
    const review = require("../controller/review.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Review
    router.post("/", review.create);
  
    // Retrieve all Reviews
    router.get("/", review.findAll);

    // Retrieve a single review with id
    router.get("/:id", list.findOne);
  
    // Update a Review with name
    router.put("/:name", list.update);
  
    // Delete a Review with name
    router.delete("/:id", list.review);
  
    app.use('/api/review', router);
  };
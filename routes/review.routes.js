module.exports = app => {
    const review = require("../controller/review.controller.js");
  
    var router = require("express").Router();
  
    
  
    // Retrieve all Reviews
    router.get("/", review.findAll);

    // Retrieve a single review with id
    router.get("/:id", review.findOne);
  
    
  
    // Delete a Review with name
    // router.delete("/:id", review.review);
  
    app.use('/api/review', router);
  };
module.exports = app => {
    const list = require("../controller/list.controller.js");
  
    var router = require("express").Router();
  
    
  
    

    // Retrieve a single list with id
    router.get("/:id", list.findOne);
  
    
  
    
  
    app.use('/api/list', router);
  };
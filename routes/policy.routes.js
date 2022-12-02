module.exports = app => {
    const policy = require("../controller/policy.controller.js");
  
    var router = require("express").Router();

    // Retrieve policy by type
    router.get("/:type", policy.getPolicy); 
  
    app.use('/api/policy', router);
  };
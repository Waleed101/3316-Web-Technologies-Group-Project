module.exports = app => {
    const auth = require("../controller/auth.controller.js");
  
    var router = require("express").Router();
  
    // Set as admin
    router.post("/setAdmin/:email", auth.setAdmin);

    // Set activation status
    router.post("/activation/:email", auth.setActivation)

    app.use('/api/admin', router);
};
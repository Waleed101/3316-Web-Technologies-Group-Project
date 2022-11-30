module.exports = app => {
    const auth = require("../controller/auth.controller.js");
  
    var router = require("express").Router();
  
    // Update password
    router.post("/updatepass/:email", auth.updatePassword);

    // Delete account
    router.delete("/delete/:email", auth.delete);

    app.use('/api/secure', router);
};
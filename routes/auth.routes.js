module.exports = app => {
    const auth = require("../controller/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/register/", auth.register);
  
    // Refresh the cookie
    router.get("/", auth.refresh);

    // Login
    router.post("/", auth.login);

    app.use('/api/auth', router);
};
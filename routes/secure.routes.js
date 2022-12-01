const jwt = require("jsonwebtoken")

module.exports = app => {
    const auth = require("../controller/auth.controller.js");
  
    var router = require("express").Router();
  
    // Update password
    router.post("/updatepass/:email", auth.updatePassword);

    // Delete account
    router.delete("/delete/:email", auth.delete);

    app.use('/api/secure', (req, res, next) => {
        console.log("t")
        try {
            jwt.verify(req.body.token, "secretkey")
          } catch (err) {
            return res.status(401).send("Invalid Token")
          }
          return router;
      });

    
};
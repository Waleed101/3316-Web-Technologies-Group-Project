
module.exports = app => {
    const jwt = require("jsonwebtoken")

    const auth = require("../controller/auth.controller.js");
    const list = require("../controller/list.controller.js")
    const review = require("../controller/review.controller.js")

  
    var router = require("express").Router();
  
    // Update password
    router.post("/updatepass/:email", auth.updatePassword);

    // Delete account
    router.delete("/delete/:email", auth.delete);

    // Create a new List
    router.post("/list", list.create);

    // Retrieve all List
    router.get("/list", list.findAll);

    // Update a List with id
    router.put("/list/:id", list.update);

    // Delete a List with name
    router.delete("/list", list.delete);

    // Create a new Review
    router.post("/review", review.create);

    // Update a Review with id
    router.put("/review/:id", review.update);

    app.use('/api/secure', (req, res, next) => {
        try {
            jwt.verify(req.headers.authorization, "secretkey")
          } catch (err) {
            return res.status(401).send("Invalid Token")
          }
          return next()
      });

    app.use('/api/secure', router)

    
};
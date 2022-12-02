module.exports = app => {
    const jwt = require("jsonwebtoken")

    const auth = require("../controller/auth.controller.js");
    const review = require("../controller/review.controller.js");
    const policy = require("../controller/policy.controller.js");
    const takedown = require("../controller/takedown.controller.js");
    var cors = require('cors')
  
    var router = require("express").Router();

    router.use(cors())
  
    // Set as admin
    router.post("/setAdmin/:email", auth.setAdmin);

    // Set activation status
    router.post("/activation/:email", auth.setActivation)

    // Access all reviews as admin
    router.get("/review", review.findAllAdmin)

    // Hide/unhide review
    router.post("/review/hide/:id", review.hide)

    // Create a new takedown request
    router.post("/takedown/", takedown.create)

    // Update status of a takedown
    router.put("/takedown/:id", takedown.update)

    // Update status of a takedown
    router.get("/takedown/:id", takedown.getByReviewId)

    // Update policy
    router.put("/policy", policy.update)

    // Verify JWT
    app.use('/api/admin', (req, res, next) => {
        try {
            jwt.verify(req.headers.authorization, "secretkey")
          } catch (err) {
            return res.status(401).send("Invalid Token")
          }
          return next()
      });


    app.use('/api/admin', router);
};
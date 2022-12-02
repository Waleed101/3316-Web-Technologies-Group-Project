module.exports = app => {
    const auth = require("../controller/auth.controller.js");
    const review = require("../controller/review.controller.js");
    const policy = require("../controller/policy.controller.js");
  
    var router = require("express").Router();
  
    // Set as admin
    router.post("/setAdmin/:email", auth.setAdmin);

    // Set activation status
    router.post("/activation/:email", auth.setActivation)

    // Access all reviews as admin
    router.get("/review", review.findAllAdmin)

    // Hide/unhide review
    router.post("/review/hide/:id", review.hide)

    // Update policy
    router.put("/policy", policy.update)

    app.use('/api/admin', router);
};
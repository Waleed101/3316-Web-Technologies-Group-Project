const Takedown = require("../models/takedown.model.js");

// Create and Save a new Takedown
exports.create = (req, res) => {

  const takedown = new Takedown({
    id: req.body.id,
    dateRequestRecieved: req.body.dateRequested ? req.body.dateRequested : "",
    dateNoticeSent: req.body.dateNotice ? req.body.dateNotice : "",
    dateDisputeRecieved: req.body.dateDispute ? req.body.dateDispute : "",
    requestedBy: req.body.requestedBy,
    reviewId: req.body.reviewId,
    additionalInfo: req.body.additionalInfo,
    status: req.body.status
  });

  console.log(takedown)

  Takedown.create(takedown, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Takedown."
      });
    else res.send(data);
  });
};

// Retrieve all Takedown from the database (with condition).
exports.getByReviewId = (req, res) => {
    Takedown.getByReviewId(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all the Takedown requests associated with a review."
        });
      else {
        res.send(data)
      }
    });
};

// Update status of a Takedown with the specified id in the request
exports.updateStatus = (req, res) => {  
  Takedown.updateStatus(req.params.id, req.body.status, (err, data) => {
      if (err) {
      if (err.kind === "not_found") {
          res.status(404).send({
          message: `Not found Takedown with id ${req.params.id}.`
          });
      } else {
          res.status(500).send({
          message: "Could not hide Takedown with id " + req.params.id
          });
      }
      } else res.send({ message: `Takedown's status was updated successfully!` });
  });
};


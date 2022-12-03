const Takedown = require("../models/takedown.model.js");
const Joi = require('@hapi/joi');
const SanitizeHtml = require('sanitize-html');

const customJoi = Joi.extend((joi) => {
  return {
      type: 'string',
      base: joi.string(),
      rules: {
          htmlStrip: {
              validate(value) {
                  return SanitizeHtml(value, {
                      allowedTags: [],
                      allowedAttributes: {},
                  });
              },
          },
      },
  };
});

// Create and Save a new Takedown
exports.create = (req, res) => {
  console.log(req.body)
  const schema = customJoi.object({
    dateRequested: customJoi.string().required(),
    dateNotice: customJoi.string().htmlStrip().allow(null, ''),
    dateDispute: customJoi.string().htmlStrip().allow(null, ''),
    requestedBy: customJoi.string().htmlStrip().required(),
    reviewId: customJoi.number().integer().required(),
    additionalInfo: customJoi.string().htmlStrip().allow(null, ''),
    status: customJoi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({message: "Status 400: " + error.details[0].message});

  req.body = schema.validate(req.body).value

  const takedown = new Takedown({
    dateRequestRecieved: req.body.dateRequested ? req.body.dateRequested : "", // string, required
    dateNoticeSent: req.body.dateNotice ? req.body.dateNotice : "", // string, opt
    dateDisputeRecieved: req.body.dateDispute ? req.body.dateDispute : "", // string, opt
    requestedBy: req.body.requestedBy, // string, required
    reviewId: req.body.reviewId, // int, required
    additionalInfo: req.body.additionalInfo, // string, opt
    status: req.body.status // int, required
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
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all the Takedown requests associated with a review."
        });
    } else {
        console.log(data)
        res.send(data)
      }
    });
};

// Update Takedown with the specified id in the request
exports.update = (req, res) => {  

    const takedown = new Takedown({
        dateNoticeSent: req.body.dateNotice ? req.body.dateNotice : "",
        dateDisputeRecieved: req.body.dateDispute ? req.body.dateDispute : "",
        additionalInfo: req.body.additionalInfo,
        status: req.body.status
    });

    Takedown.update(req.params.id, takedown, (err, data) => {
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
      } else res.send({ ans: `Takedown's status was updated successfully!` });
  });
};


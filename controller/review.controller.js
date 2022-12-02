const Review = require("../models/review.model.js");
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

// Create and Save a new Review
exports.create = (req, res) => {

  console.log("Creating...")

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


console.log(req.body)
let schema = null
  if (req.body.listId) {
    schema = customJoi.object({
      listId: customJoi.number().integer().required(),
      userEmail: customJoi.string().htmlStrip().required(),
  description: customJoi.string().max(255).htmlStrip().required(),
    rating: customJoi.number().integer().required()
    })
} else {
  schema = customJoi.object({
    trackId: customJoi.number().integer().required(),
    userEmail: customJoi.string().htmlStrip().required(),
    description: customJoi.string().max(255).htmlStrip().required(),
  rating: customJoi.number().integer().required()
  })
}
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({message: "Status 400: " + error.details[0].message});

  req.body = schema.validate(req.body).value

  console.log(req.body)

  const review = new Review({
    referenceId: req.body.listId ? req.body.listId : req.body.trackId,
    type: req.body.listId ? 1 : 0,
    user: req.body.userEmail,
    description: req.body.description,
    rating: req.body.rating
  });``

  
  Review.create(review, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Review."
      });
    else res.send(data);
  });
};

// Retrieve all Review from the database (with condition).
exports.findAll = (req, res) => {
    const query = {
        type: req.query.type,
        referenceId: req.query.referenceId || req.query.ref,
        user: req.query.user
    }

    console.log(req.query)
    console.log("Looking for above...")

    Review.getAll(query, req.query.avg , (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Review."
        });
      else {
        console.log(data)
        res.send(data)
      }
    });
};

// Find a single Review with a id
exports.findOne = (req, res) => {
    Review.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Review with id ${req.params.id} is not found.`
            })
          } else {
            res.status(500).send({
              message: "Error retrieving Review with id " + req.params.id
            })
          }
        } else res.send(data)
      });
};

// Update a Review identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Review.updateById(
        req.params.id,
        new Review(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Review with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Review with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {  
    Review.remove(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Review with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Could not delete Review with id " + req.params.id
            });
        }
        } else res.send({ message: `Review was deleted successfully!` });
    });
};
  
// Retrieve all Review from the database as admin
exports.findAllAdmin = (req, res) => {
  Review.getAllAdmin((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Review."
      });
    else {
      console.log(data)
      res.send(data)
    }
  });
};

// Delete a Review with the specified id in the request
exports.hide = (req, res) => {  
  Review.hide(req.params.id, req.body.toHide, (err, data) => {
      if (err) {
      if (err.kind === "not_found") {
          res.status(404).send({
          message: `Not found Review with id ${req.params.id}.`
          });
      } else {
          res.status(500).send({
          message: "Could not hide Review with id " + req.params.id
          });
      }
      } else res.send({ message: `Review was hidden successfully!` });
  });
};


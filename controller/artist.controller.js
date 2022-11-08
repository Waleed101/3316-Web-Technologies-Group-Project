const sanitize = require('../helper/sanitize.helper.js')

const Artist = require("../models/artist.model.js");

// Create and Save a new Artist
exports.create = (req, res) => {

  res.status(404).send({
    message: "Access not allowed."
  });

  return

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Test
  console.log(req.body)
  const artist = new Artist({
    id: req.body.id,
    name: req.body.name,
    yearStart: req.body.yearStart,
    yearEnd: req.body.yearEnd,
    contact: req.body.contact,
    dateCreated: req.body.dateCreated,
    handle: req.body.handle,
    location: req.body.location,
    members: req.body.members,
    tags: req.body.tags
  });

  Artist.create(artist, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Artist."
      });
    else res.send(data);
  });
};

// Retrieve all Artist from the database (with condition).
exports.findAll = (req, res) => {
    const query = {
        name: req.query.name,
        members: req.query.members
    }

    if (!sanitize.stringLength(req.query.name, 3, 255)) {
      res.status(403).send({ message: "Your input is not between the length of 3 and 255"})
      return
    }

    if (sanitize.hasNoScript(req.query.name)) {
      res.status(403).send({ message: "Your input cannot have any of: <, >"})
      return
    }  

    console.log(query)

    Artist.getAll(query, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving artist."
        });
      else res.send(data);
    });
};

// Find a single Artist with a id
exports.findOne = (req, res) => {

    if (!sanitize.isInteger(req.params.id)) {
      res.status(403).send({ message: "Your input has to be an integer."})      
      return
    }

    Artist.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Artist with id ${req.params.id} is not found.`
            })
          } else {
            res.status(500).send({
              message: "Error retrieving Artist with id " + req.params.id
            })
          }
        } else res.send(data)
      });
};

// Delete a Artist with the specified id in the request
exports.delete = (req, res) => {

  res.status(404).send({
    message: "Access not allowed."
  });

  return

    Artist.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Artist with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Artist with id " + req.params.id
          });
        }
      } else res.send({ message: `Artist was deleted successfully!` });
    });
  };
  
// Delete all Artists
exports.deleteAll = (req, res) => {

  res.status(404).send({
    message: "Access not allowed."
  });

  return

    Artist.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all artists."
          });
        else res.send({ message: `All Artists were deleted successfully!` });
    });
};
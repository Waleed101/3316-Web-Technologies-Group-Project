const Genre = require("../models/genre.model.js");

// Create and Save a new Genre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Test
  console.log(req.body)
  const genre = new Genre({
    id: req.body.id,
    title: req.body.title,
    parent: req.body.parent
  });

  Genre.create(genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre."
      });
    else res.send(data);
  });
};

// Retrieve all Genre from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Genre.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving genre."
        });
      else {
        // data = Object.values(JSON.parse(JSON.stringify(data)));
        console.log(data)
        res.send(data)
        // res.send("{'key':'value'}")
      }
    });
};

// Find a single Genre with a id
exports.findOne = (req, res) => {
    Genre.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Genre with id ${req.params.id} is not found.`
            })
          } else {
            res.status(500).send({
              message: "Error retrieving Genre with id " + req.params.id
            })
          }
        } else res.send(data)
      });
};

// Update a Genre identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Genre.updateById(
        req.params.id,
        new Genre(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Genre with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Genre with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
    Genre.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Genre with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Genre with id " + req.params.id
          });
        }
      } else res.send({ message: `Genre was deleted successfully!` });
    });
  };
  
// Delete all Genres
exports.deleteAll = (req, res) => {
    Genre.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all genres."
          });
        else res.send({ message: `All Genres were deleted successfully!` });
    });
};
const List = require("../models/list.model.js");

// Create and Save a new List
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Test
  console.log(req.body)
  const list = new List({
    name: req.body.name,
    tracks: req.body.tracks,
    totalPlayTime: req.body.totalPlayTime
  });

  List.create(list, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the List."
      });
    else res.send(data);
  });
};

// Retrieve all List from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    List.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving list."
        });
      else res.send(data);
    });
};

// Find a single List with a id
exports.findOne = (req, res) => {
    List.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `List with id ${req.params.id} is not found.`
            })
          } else {
            res.status(500).send({
              message: "Error retrieving List with id " + req.params.id
            })
          }
        } else res.send(data)
      });
};

// Update a List identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      List.updateByName(
        req.params.name,
        new List(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `List with name ${req.params.name} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating List with name " + req.params.name
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a List with the specified id in the request
exports.delete = (req, res) => {
  console.log("Deleting...")
    List.remove(req.body.name, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found List with name ${req.body.name}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete List with name " + req.body.name
          });
        }
      } else res.send({ message: `List was deleted successfully!` });
    });
  };
  
// Delete all Lists
exports.deleteAll = (req, res) => {
    List.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lists."
          });
        else res.send({ message: `All Lists were deleted successfully!` });
    });
};
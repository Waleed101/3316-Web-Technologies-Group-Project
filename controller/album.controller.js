const Album = require("../models/album.model.js");

// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Test
  console.log(req.body)
  const album = new Album({
    id: req.body.id,
    title: req.body.title,
    artistID: req.body.artistID,
    dateReleased: req.body.dateReleased,
    dateUploaded: req.body.dateUploaded,
    handle: req.body.handle,
    listens: req.body.listens,
    tracks: req.body.tracks,
    tags: req.body.tags,
    type: req.body.type,
    artistName: req.body.artistName
  });

  Album.create(album, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    else res.send(data);
  });
};

// Retrieve all Album from the database (with condition).
exports.findAll = (req, res) => {
    const query = {
        title: req.query.title,
        artistID: req.query.artist
    }

    Album.getAll(query, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving album."
        });
      else res.send(data);
    });
};

// Find a single Album with a id
exports.findOne = (req, res) => {
    Album.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Album with id ${req.params.id} is not found.`
            })
          } else {
            res.status(500).send({
              message: "Error retrieving Album with id " + req.params.id
            })
          }
        } else res.send(data)
      });
};

// Delete a Album with the specified id in the request
exports.delete = (req, res) => {
    Album.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Album with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Album with id " + req.params.id
          });
        }
      } else res.send({ message: `Album was deleted successfully!` });
    });
  };
  
// Delete all Albums
exports.deleteAll = (req, res) => {
    Album.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all albums."
          });
        else res.send({ message: `All Albums were deleted successfully!` });
    });
};
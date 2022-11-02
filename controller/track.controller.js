const Track = require("../models/track.model.js");

// Create and Save a new Track
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Test
  console.log(req.body)
  const track = new Track({
    id: req.body.id,
    title: req.body.title,
    albumID: req.body.albumID,
    artistID: req.body.artistID,
    dateRecorded: req.body.dateRecorded,
    datePublished: req.body.datePublished,
    duration: req.body.duration,
    interest: req.body.interest,
    listens: req.body.listens,
    genres: req.body.genres,
    tags: req.body.tags,
    trackNum: req.body.trackNum
  });

  Track.create(track, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Track."
      });
    else res.send(data);
  });
};

// Retrieve all Tracks from the database (with condition).
exports.findAll = (req, res) => {
    const query = {
        title: req.query.title,
        albumID: req.query.album,
        artistID: req.query.artist
    }

    Track.getAll(query, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving track."
        });
      else res.send(data);
    });
};

// Find a single Track with a id
exports.findOne = (req, res) => {
    Track.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Track with id ${req.params.id} is not found.`
            })
          } else {
            res.status(500).send({
              message: "Error retrieving Track with id " + req.params.id
            })
          }
        } else res.send(data)
      });
};

// Delete a Track with the specified id in the request
exports.delete = (req, res) => {
    Track.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Track with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Track with id " + req.params.id
          });
        }
      } else res.send({ message: `Track was deleted successfully!` });
    });
  };
  
// Delete all Tracks
exports.deleteAll = (req, res) => {
    Track.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tracks."
          });
        else res.send({ message: `All Tracks were deleted successfully!` });
    });
};
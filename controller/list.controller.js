const sanitize = require('../helper/sanitize.helper.js')
const Joi = require('@hapi/joi');

const List = require("../models/list.model.js");

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

// Create and Save a new List
exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return
  }

  if (!req.body.name || !req.body.tracks) {
    res.status(400).send({
      message: "You have to have a name and tracks."
    });
    return
  }

  const schema = customJoi.object({
    createdBy: customJoi.string().required(),
    name: customJoi.string().max(255).htmlStrip().required(),
    description: customJoi.string().max(255).htmlStrip().allow(null, ""),
    isPublic: customJoi.boolean(),
    totalPlaytime: customJoi.number().integer(),
    tracks: customJoi.array().items(customJoi.string())
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({message: "Status 400: " + error.details[0].message});

  req.body = schema.validate(req.body).value

  console.log(req.body)

  List.create(req.body, (err, data) => {
    console.log("Creating...")
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
    
    const info = {
      name: req.query.name,
      user: req.query.user
        }

    List.getAll(info, (err, data) => {
    
    

      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving list."
        });
      else res.send(data);
    });
};

// Retrieve all List from the database (with condition).
exports.findAllPublic = (req, res) => {
    
  const info = {
    user: req.query.user,
    isPublic: 1,
    // update: req.query.update,
    // created:req.query.created
    
  }
  //console.log("hola"+info)
  List.getAll(info, (err, data) => {
    // const reverseSortedPlaylists = data.sort((a,b)=> b.update-a.update)
    // const keys = Object.keys(data)
    // console.log(keys)
    // const reverseKeys = keys.reverse()
    // reverseKeys.forEach(key=>{
    //   console.log(key, data[key].update )
    // })
    // console.log(reverseKeys);
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

  if (!sanitize.isInteger(req.params.id)) {
    res.status(403).send({ message: "The ID you inputted has to be a number."})
  }  

  if (!sanitize.minimum(req.params.id, 1)) {
    res.status(403).send({ message: "The ID you inputted has to be atleast 1."})
  }  

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
    // if (!req.body) {
    //     res.status(400).send({
    //       message: "Content can not be empty!"
    //     });
    //   }
      
      if (!sanitize.stringLength(req.body.name, 3, 255)) {
        res.status(403).send({ message: "Your input is not between the length of 3 and 255"})
        return
      }

      if (sanitize.hasNoScript(req.body.tracks)) {
        res.status(403).send({ message: "Your input cannot have any of: <, >"})
        return
      }  

      console.log(req.body.tracks)
      // const vals = req.body.tracks.split(",")

      // for(let i = 0; i < vals.length; i += 1) {
      //   if (!sanitize.isInteger(vals[i])) {
      //     res.status(403).send({ message: "All the IDs you inputted should only be numbers."})
      //     return
      //   }
      // }
    
      List.update(
        req.params.id,
        req.body,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `List with name ${req.params.name} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating List with name " + req.params.name,
                additional: err
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a List with the specified id in the request
exports.delete = (req, res) => {
  if (sanitize.hasNoScript(req.body.name)) {
    res.status(403).send({ message: "Your input cannot have any of: <, >"})
  }  

    
  if (!sanitize.stringLength(req.body.name, 3, 255)) {
    res.status(403).send({ message: "Your input is not between the length of 3 and 255"})
    return
  }

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
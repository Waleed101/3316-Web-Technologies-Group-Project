const sanitize = require('../helper/sanitize.helper.js')

const Policy = require("../models/policy.model.js");

exports.getPolicy = (req, res) => {
  Policy.getPolicy(req.params.type, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the policy."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  Policy.update(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting th policy."
      });
    else res.send(data);
  });
}


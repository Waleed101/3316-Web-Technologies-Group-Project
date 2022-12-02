const sanitize = require('../helper/sanitize.helper.js')

const Policy = require("../models/policy.model.js");

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
  const schema = customJoi.object({
    type: customJoi.string().htmlStrip().required(),
    content: customJoi.string().htmlStrip().required()
  })

  const { error } = schema.validate(req.body);
if (error) return res.status(400).send({message: "Status 400: " + error.details[0].message});

req.body = schema.validate(req.body).value

  Policy.update(req.body, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting th policy."
      });
    else res.send(data);
  });
}


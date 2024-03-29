const sanitize = require('../helper/sanitize.helper.js')

const jwt = require("jsonwebtoken")

const Auth = require("../models/auth.model.js");

let addTime = 24*60*60*1000;

// Register
exports.register = (req, res) => {

  // Validate request
  console.log("here")

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body)
  // console.log(req)

  const auth = new Auth({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  })

  Auth.register(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering a User."
      });
    else {
      
      let timeToExpire = new Date(new Date().getTime() + addTime);
      res.send({ loggedIn: true, email: data.email, name: data.name, time: timeToExpire})
    }
  });
};

exports.refresh = (req, res) => {
    if (req.session.email) {
        res.send({ loggedIn: true, email: req.session.email, name: req.session.name, time: req.session.time})
    } else {
        res.send({ loggedIn: false })
    }
}

exports.login = (req, res) => {
    
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const auth = new Auth({
    email: req.body.email,
    password: req.body.password
  })

  Auth.login(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while logging in the User."
      });
    else {
      const token = jwt.sign(
        { userEmail: data.email },
        "secretkey",
        {
          expiresIn: "2h",
        }
      );
      let timeToExpire = new Date(new Date().getTime() + addTime);
      res.send({ loggedIn: true, email: data.email, name: data.name, time: timeToExpire, status: data.status, role: parseInt(data.role), token:token})
    } 
  });  
}

exports.updatePassword = (req, res) => {
  console.log("a")
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const auth = new Auth({
    email: req.params.email,
    password: req.body.newPassword
  })
  
  Auth.updatePassword(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the password."
      });
    else {
      console.log("r")
      res.send(data)
    } 
  });  
}

exports.delete = (req, res) => {
  
  // Validate request
  if (!req.params) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 const auth = new Auth({
   email: req.params.email
 })

 Auth.delete(auth, (err, data) => {
   if (err)
     res.status(500).send({
       message:
         err.message || "Some error occurred while deleting the account."
     });
   else {
     res.send(data)
   } 
 });  
}

exports.setActivation = (req, res) => {
  console.log(req)

  // Validate request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }
 const auth = new Auth({
   email: req.params.email,
   status: req.body.status
 })

 Auth.setActivation(auth, (err, data) => {
   if (err)
     res.status(500).send({
       message:
         err.message || "Some error occurred while updating the password."
     });
   else {
     res.send(data)
   } 
 });  
}

exports.setAdmin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const auth = new Auth({
    email: req.params.email
  })
 
  Auth.setAdmin(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the password."
      });
    else {
      res.send(data)
    } 
  });  
}

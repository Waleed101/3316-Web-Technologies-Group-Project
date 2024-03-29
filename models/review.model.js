const sql = require('../dbseed.js')

/* Type:
    0 -> Review on a Track
    1 -> Review on a List
*/

const Review = function(review) {
    this.referenceId = review.referenceId
    this.type = review.type
    this.user = review.user
    this.description = review.description
    this.rating = review.rating
    this.isHidden = review.isHidden
}

Review.create = (newReview, result) => {
    console.log("Creating...")
    sql.query(`INSERT INTO review SET referenceID=${newReview.referenceId}, type=${newReview.type}, userEmail="${newReview.user}", ` + 
              `description="${newReview.description}", rating=${newReview.rating}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Created Review: ", { id: res.insertId, ...newReview })
        result(null, { id: res.insertId, ...newReview })
    })
    
}

Review.findById = (id, result) => {
    sql.query(`SELECT * FROM review WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}

Review.getAll = (req, isAvg, result) => {
    let query = `SELECT * FROM review`

    if (req.type || req.referenceId) {
        query = `SELECT * FROM review WHERE type=${req.type} AND referenceId=${req.referenceId} AND isHidden=0`
    }
    else if (req.user) {
        query = `SELECT * FROM review WHERE userEmail="${req.user}" and isHidden=0`
    } 
    
    if (isAvg) {
        query = `SELECT AVG(rating) as avg FROM review WHERE type=${req.type} AND referenceId=${req.referenceId}`
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Reviews: ", res);
        result(null, res);
    })
}
  
Review.remove = (id, result) => {
    sql.query("DELETE FROM review WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            console.log("Not Found")
            result({kind: "not_found"}, null)
            return
        }

        console.log("Deleted Review with id: ", id)
        result(null, res)
    })
}

Review.updateById = (id, review, result) => {
    sql.query(
      "UPDATE review SET description = ?, rating = ? WHERE id = ?",
      [review.description, review.rating, id],
      (err, res) => {
        if (err) {
          console.log("Error: ", err)
          result(null, err)
          return
        }
  
        if (res.affectedRows == 0) {
          result({ans: "Not Found"}, null)
          return
        }
  
        console.log("Updated Review: ", { id: id, ...review })
        result(null, { id: id, ...review })
      }
    )
}

Review.getAllAdmin = (result) => {

    sql.query(`SELECT * FROM review`, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Reviews: ", res);
        result(null, res);
    })
}

Review.hide = (id, hide, result) => {
    sql.query(
      "UPDATE review SET isHidden = ? WHERE id = ?",
      [hide, id],
      (err, res) => {
        if (err) {
          console.log("Error: ", err)
          result(null, err)
          return
        }
  
        if (res.affectedRows == 0) {
          result({ans: "Not Found"}, null)
          return
        }
  
        result(null, { id: id})
      }
    )
}

module.exports = Review
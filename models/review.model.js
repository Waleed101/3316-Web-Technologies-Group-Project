const sql = require('../dbseed.js')

/* Type:
    0 -> Review on a Track
    1 -> Review on a List
*/

const Review = function(review) {
    this.listId = review.listId
    this.user = review.user
    this.description = review.description
    this.rating = review.rating
}

Review.create = (newReview, result) => {
    
    sql.query(`INSERT INTO review SET referenceID=${newReview.listId ? newReview.listId : newReview.trackId}, type=${newReview.listId ? 1 : 0}, userEmail="${newReview.user}", ` + 
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

Review.getAll = (req, result) => {
    let query = `SELECT * FROM review WHERE type=${req.listId ? 1 : 0}, referenceId=${req.listId ? req.listId : req.trackId}`

    if (req.user) {
        query = `SELECT * FROM review WHERE userEmail=${req.user}`
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

module.exports = Review
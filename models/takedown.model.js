/*
    0 -> Requested
    1 -> Sent
    2 -> Disputed
    3 -> Closed, accepted
    4 -> Closed, denied
*/


const Takedown = function(takedown) {
    this.id = takedown.id
    this.dateRequestRecieved = takedown.dateRequestRecieved
    this.dateNoticeSent = takedown.dateNoticeSent
    this.dateDisputeRecieved = takedown.dateDisputeRecieved
    this.requestedBy = takedown.requestedBy
    this.reviewId = takedown.reviewId
    this.additionalInfo = takedown.additionalInfo
    this.status = takedown.status
}

Takedown.create = (newTakedown, result) => {    
    sql.query(`INSERT INTO takedown SET dateRequestRecieved="${newTakedown.dateRequestRecieved}", dateNoticeSent="${newTakedown.dateNoticeSent}", reviewId=${newTakedown.reviewId}` + 
    `dateDisputeRecieved="${newTakedown.dateDisputeRecieved}", requestedBy="${newTrack.requestedBy}", additionalInfo="${newTrack.additionalInfo}", status=${newTakedown.status}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Created Takedown: ", { id: res.insertId, ...newTakedown })
        result(null, { id: res.insertId, ...newTakedown })

    })
}

Takedown.updateStatus = (id, newStatus, result) => {
    sql.query(
        "UPDATE takedown SET status = ? WHERE id = ?",
        [newStatus, id],
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

Takedown.getByReviewId = (reviewId, result) => {
    
    const query = `SELECT * FROM takedown WHERE reviewId=${reviewId}`

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        result(res[0], null)
    })
}

module.exports = Takedown
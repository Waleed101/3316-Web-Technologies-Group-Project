// const sql = require('./dbseed.js')

const express = require("express");
const cors = require("cors");


const app = express();

var corsOptions = {
  origin: "https://localhost:8000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("main"))
   
// app.get('/api/genre', function (req, res) {
//   console.log("Temp")
//   res.json("Temp")
//   // res.send("Temp")
//     // console.log("Router Working");
//     // res.end();
// })

require("./routes/genre.routes.js")(app);
require("./routes/track.routes.js")(app);
require("./routes/artist.routes.js")(app);
require("./routes/album.routes.js")(app);
require("./routes/list.routes.js")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
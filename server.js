const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")

const app = express();

// var corsOptions = {
//   origin: "https://localhost:8000"
// };

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// app.use(express.urlencoded({ extended: true }));

app.use(express.static("main"))

require("./routes/auth.routes.js")(app);

require("./routes/genre.routes.js")(app);
require("./routes/track.routes.js")(app);
require("./routes/artist.routes.js")(app);
require("./routes/album.routes.js")(app);
require("./routes/list.routes.js")(app);
require("./routes/secure.routes.js")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
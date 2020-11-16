const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const chat = require("./routes/api/chat");

// setting a port
const PORT = process.env.PORT || 5000;

// app initialization
const app = express();
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

//  body parser middleware
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// DB connection and config.
const db = require("./config/keys").mongoURI;

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// passport middleware and config.
app.use(passport.initialize());

//  passport config.
require("./config/passport.js")(passport);


  
// routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/chat", chat);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
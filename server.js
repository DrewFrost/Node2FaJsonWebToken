const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const passportConfig = require('./config/passport');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose
    .connect(
        db,
        {useNewUrlParser: true}
    )
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));


app.use('/api/users', users);
app.use(passport.initialize());

passportConfig(passport);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
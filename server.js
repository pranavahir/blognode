const express = require("express")
require("dotenv").config()
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const auth = require('./middleware/auth')
const AuthenticationRoute = require('./routes/Authentication')
const BlogRoute = require('./routes/Blog')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth)
app.use(AuthenticationRoute)
app.use(BlogRoute)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err,"errerr"))
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})

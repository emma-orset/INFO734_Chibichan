const express = require("express");
const bodyParser = require("body-parser")
const membreRoutes = require('./routes/membre.routes')
require('dotenv').config({path: './config/.env'});
require("./config/db")
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/api/membre', membreRoutes)

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
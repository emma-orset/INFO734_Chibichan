const express = require("express");
const bodyParser = require("body-parser")
const memberRoutes = require('./routes/member.routes')
const patternRoutes = require('./routes/pattern.routes')
const commentRoutes = require('./routes/comment.routes')
require('dotenv').config({path: './config/.env'});
require("./config/db")
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/api/member', memberRoutes)
app.use('/api/pattern', patternRoutes)
app.use('/api/comment', commentRoutes)

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
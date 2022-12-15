const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const memberRoutes = require('./routes/member.routes')
const patternRoutes = require('./routes/pattern.routes')
require('dotenv').config({path: './config/.env'});
require("./config/db")
const {checkMember, requireAuth} = require('./middleware/auth.middleware')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// jwt
app.get('*', checkMember)
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.member._id)
})

//routes
app.use('/api/member', memberRoutes)
app.use('/api/pattern', patternRoutes)

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const memberRoutes = require("./routes/memberRoutes");
const patternRoutes = require("./routes/patternRoutes");
const commentRoutes = require("./routes/commentRoutes");
const multer = require("multer");
const upload = multer();
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkMember, requireAuth } = require("./middleware/authMiddleware");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));

app.use(express.static("public"));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkMember);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.member._id);
});

//routes
app.use("/api/member", memberRoutes);
app.use("/api/pattern", patternRoutes);
app.use("/api/comment", commentRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

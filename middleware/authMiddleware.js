const jwt = require("jsonwebtoken");
const MemberModel = require("../models/memberModel");

module.exports.checkMember = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.member = null;
        // res.cookie("jwt", "", { maxAge: 1 });
      } else {
        let member = await MemberModel.findById(decodedToken.id);
        res.locals.member = member;
        // console.log(res.locals.member);
        next();
      }
    });
  } else {
    res.locals.member = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};

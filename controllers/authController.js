//Seulement pour l'inscription (signup), la connexion (login) et la déconnexion du member (logout)
const MemberModel = require("../models/memberModel");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errorsUtils");
const maxAge = 14400000;

// Cette fonction marche
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    //Expire dans 4h
    expiresIn: maxAge,

  });
};

// Cette fonction marche
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const member = await MemberModel.create({ pseudo, email, password });
    res.status(201).json({ member: member._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

// Cette fonction marche
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await MemberModel.login(email, password);
    const token = createToken(member._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(201).json({ member: member._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

// Cette fonction marche
module.exports.signOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

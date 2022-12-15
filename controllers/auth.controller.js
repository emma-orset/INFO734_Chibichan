//Seulement pour l'inscription (signup), la connexion (login) et la déconnexion du member (logout)
const MemberModel = require("../models/member.model");
const jwt = require("jsonwebtoken");
const {signUpErrors, signInErrors} = require('../utils/errors.utils')
const maxAge = 3 * 24 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        //3 jours
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    const {pseudo, email, pwd} = req.body

    try{
        const member = await MemberModel.create({pseudo, email, pwd});
        res.status(201).json({member: member._id})
    }

    catch(err){
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const {email, pwd} = req.body

    try{
        const member = await MemberModel.login(email, pwd);
        const token = createToken(member._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(201).json({member: member._id})
    }

    catch(err){
        const errors = signInErrors(err)
        res.status(200).json({errors})
    }
}

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", {maxAge:1});
    res.redirect("/");
}
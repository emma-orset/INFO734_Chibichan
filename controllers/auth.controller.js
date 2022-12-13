//Seulement pour l'inscription (signup), la connexion (login) et la déconnexion du membre (logout)
const MembreModel = require("../models/membre.model");

module.exports.signUp = async (req, res) => {
    const {pseudo, email, mdp} = req.body

    try{
        const membre = await MembreModel.create({pseudo, email, mdp});
        res.status(201).json({membre: membre._id})
    }

    catch(err){
        res.status(200).send({ err })
    }
}
//Pour toutes les actions sur member sauf inscription/connexion/deconnexion

const MemberModel = require('../models/member.model');
const PatternModel = require('../models/pattern.model');
const CommentModel = require('../models/comment.model');
const ObjectID = require('mongoose').Types.ObjectId;



module.exports.getAllMembers = async(req, res) => {
    const members = await MemberModel.find().select('-pwd -admin');
    res.status(200).json(members);
}

module.exports.memberInfo = (req, res) => {
    
    MemberModel.findById(req.params.id, (err, docs)=>{
        if (!err && docs !== null){
            res.send(docs);
        } 
        else{
            console.log('Erreur : ' + err);
            res.status(400).send('ID unknown : ' + req.params.id);
        } 
    }).select('-pwd')
}

module.exports.updateMember = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try{
        await MemberModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set:{
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
        )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err){
        return res.status(500).json({message: err});
    }
}

// Il faut aussi supprimer le membre dans les autres tables
module.exports.deleteMember = async(req, res) => {
    
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try{
        await MemberModel.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({ message: "Delete successful" });
        
    } catch (err){
        return res.status(500).json({message: err.message});
    }
}

module.exports.addFavorite = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('Member ID unknown : ' + req.params.id);
    }

    if (!ObjectID.isValid(req.body.idFavorite)){
        return res.status(400).send(req.body.idFavorite + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.body.idFavorite) === null){
        return res.status(400).send('Pattern ID unknown : ' + req.body.idFavorite);
    }

    try{
        await MemberModel.findByIdAndUpdate(
            req.params.id, 
            {
                $addToSet:{
                    favorites: req.body.idFavorite
                }
            },
            { new: true, upsert: true},
        )
        .then((docs) => res.status(201).json(docs))
        .catch((err) => res.status(400).send({ message: err }));

        await PatternModel.findByIdAndUpdate(
            req.body.idFavorite, 
            {
                $addToSet:{
                    favorites: req.params.id
                }
            },
            { new: true, upsert: true},
        )
        .catch((err) => res.status(400).send({ message: err }));

    } catch (err){
        return res.status(500).json({message: err});
    }
}

module.exports.deleteFavorite = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('Member ID unknown : ' + req.params.id);
    }

    if (!ObjectID.isValid(req.body.idFavorite)){
        return res.status(400).send(req.body.idFavorite + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.body.idFavorite) === null){
        return res.status(400).send('Pattern ID unknown : ' + req.body.idFavorite);
    }

    try{
        await MemberModel.findByIdAndUpdate(
            req.params.id, 
            {
                $pull:{
                    favorites: req.body.idFavorite
                }
            },
            { new: true, upsert: true},
        )
        .then((docs) => res.status(201).json(docs))
        .catch((err) => res.status(400).send({ message: err }));

        await PatternModel.findByIdAndUpdate(
            req.body.idFavorite, 
            {
                $pull:{
                    favorites: req.params.id
                }
            },
            { new: true, upsert: true},
        )
        .catch((err) => res.status(400).send({ message: err }));

    } catch (err){
        return res.status(500).json({message: err});
    }
}
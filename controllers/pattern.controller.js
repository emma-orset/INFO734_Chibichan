// Toutes les actions sur les patterns
const PatternModel = require("../models/pattern.model");
const {addPatternErrors} = require('../utils/errors.utils')

module.exports.addPattern = async (req, res) => {
    const {title, type, picture, pdf, word, description, tags} = req.body

    try{
        const pattern = await PatternModel.create({title, type, picture, pdf, word, description, tags});
        res.status(201).json({pattern: pattern._id})
    }

    catch(err){
        const errors = addPatternErrors(err)
        res.status(200).json({errors})
    }
}

module.exports.getAllPatterns = async(req, res) => {
    const patterns = await PatternModel.find().select();
    res.status(200).json(patterns);
}

module.exports.patternInfo = (req, res) => {
    PatternModel.findById(req.params.id, (err, docs)=>{
        if (!err && docs !== null){
            res.send(docs);
        } 
        else{
            console.log('ID unknown ' + err);
            res.status(400).send('ID unknown : ' + req.params.id);
        } 
    }).select()
}

module.exports.updatePattern = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try{
        await PatternModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set:{
                    picture: req.body.picture
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

module.exports.deletePattern = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try{
        await PatternModel.remove({_id: req.params.id}).exec()
        res.status(200).json({ message: "Delete successful" });
    } catch (err){
        return res.status(500).json({message: err});
    }
}
// Toutes les actions sur les comments
const CommentModel = require("../models/comment.model");

module.exports.addComment = async (req, res) => {
    const {text} = req.body

    try{
        const comment = await CommentModel.create({text});
        res.status(201).json({comment: comment._id})
    }

    catch(err){
        res.status(200).send({ err })
    }
}

module.exports.getAllComments = async(req, res) => {
    const comments = await CommentModel.find().select();
    res.status(200).json(comments);
}

module.exports.commentInfo = (req, res) => {
    CommentModel.findById(req.params.id, (err, docs)=>{
        if (!err && docs !== null){
            res.send(docs);
        } 
        else{
            console.log('ID unknown ' + err);
            res.status(400).send('ID unknown : ' + req.params.id);
        } 
    }).select()
}

module.exports.updateComment = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try{
        await CommentModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set:{
                    writer: req.body.writer
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

module.exports.deleteComment = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id + " is not a correct syntax ID");
    }

    else if (await MemberModel.findById(req.params.id) === null){
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try{
        await CommentModel.remove({_id: req.params.id}).exec()
        res.status(200).json({ message: "Suppression réussie" });
    } catch (err){
        return res.status(500).json({message: err});
    }
}
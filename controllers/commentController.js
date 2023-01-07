// Toutes les actions sur les comments
const CommentModel = require("../models/commentModel");
const PatternModel = require("../models/patternModel");
const MemberModel = require("../models/memberModel");
const ObjectID = require("mongoose").Types.ObjectId;
const { isEmpty } = require("../utils/functionUtils");

// const path = require("path");
// const { getDateSpe, verifPicture } = require("../utils/functionUtils");
// const fs = require("fs");

// module.exports.addComment = async (req, res) => {
//   // Dans le body, on passe un texte, l'ID du membre qui l'a écrit, et l'ID du patron de référence
//   const data = JSON.parse(JSON.stringify(req.body));

//   // On vérifie que l'ID du membre est correct
//   if (!ObjectID.isValid(data.writer)) {
//     return res
//       .status(400)
//       .send(data.writer + " is not a correct syntax member ID");
//   } else if ((await MemberModel.findById(data.writer)) === null) {
//     return res.status(400).send("Member ID unknown : " + data.writer);
//   }

//   // On vérifie que l'ID du patron est correct
//   if (!ObjectID.isValid(data.idPattern)) {
//     return res
//       .status(400)
//       .send(data.idPattern + " is not a correct syntax pattern ID");
//   } else if ((await PatternModel.findById(data.idPattern)) === null) {
//     return res.status(400).send("Pattern ID unknown : " + data.idPattern);
//   }

//   try {
//     // On initialise la liste des images
//     let listPictures = [];
//     console.log(req.files["pictures"][0])

//     // On parcourt chaque image passé en paramètre
//     req.files.forEach((file) => {
//       console.log(file.value)
//       file = file.value
//       // On vérifie que c'est bien une image
//       verifPicture(file, res);

//       // On lui donne un nom
//       let fileName =
//         data.writer +
//         data.idPattern +
//         "-" +
//         getDateSpe(data.date) +
//         file.originalname;

//       // On l'ajoute au tableau des images
//       listPictures.push(fileName);
//     });

//     const comment = await CommentModel.create({
//       text: data.text,
//       writer: data.writer,
//       idPattern: data.idPattern,
//       pictures: listPictures,
//       date: data.date,
//     });

//     // On cherche le patron lié au commentaire
//     await PatternModel.findByIdAndUpdate(
//       data.idPattern,
//       {
//         // On ajoute le commentaire à la liste des commentaires du patrons
//         $addToSet: {
//           comments: comment._id,
//         },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     ).catch((err) => res.status(500).send({ message: err }));

//     res.status(201).json({ comment: comment._id });
//   } catch (err) {
//     res.status(200).send({ err });
//   }
// };


module.exports.addComment = async (req, res) => {
  // Dans le body, on passe un texte, l'ID du membre qui l'a écrit, et l'ID du patron de référence
  const data = JSON.parse(JSON.stringify(req.body));

  // On vérifie que l'ID du membre est correct
  if (!ObjectID.isValid(data.writer)) {
    return res
      .status(400)
      .send(data.writer + " is not a correct syntax member ID");
  } else if ((await MemberModel.findById(data.writer)) === null) {
    return res.status(400).send("Member ID unknown : " + data.writer);
  }

  // On vérifie que l'ID du patron est correct
  if (!ObjectID.isValid(data.idPattern)) {
    return res
      .status(400)
      .send(data.idPattern + " is not a correct syntax pattern ID");
  } else if ((await PatternModel.findById(data.idPattern)) === null) {
    return res.status(400).send("Pattern ID unknown : " + data.idPattern);
  }

  try {

    const comment = await CommentModel.create({
      text: data.text,
      writer: data.writer,
      idPattern: data.idPattern,
    });

    // On cherche le patron lié au commentaire
    await PatternModel.findByIdAndUpdate(
      data.idPattern,
      {
        // On ajoute le commentaire à la liste des commentaires du patrons
        $addToSet: {
          comments: comment._id,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).catch((err) => res.status(500).send({ message: err }));

    res.status(201).json({ comment: comment._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.getAllComments = async (req, res) => {
  const comments = await CommentModel.find().select();
  res.status(200).json(comments);
};

module.exports.commentInfo = (req, res) => {
  CommentModel.findById(req.params.id, (err, docs) => {
    if (!err && docs !== null) {
      res.send(docs);
    } else {
      console.log("ID unknown " + err);
      res.status(400).send("ID unknown : " + req.params.id);
    }
  }).select();
};

// module.exports.updateComment = async (req, res) => {
//   // On vérifie que l'ID du commentaire est valid
//   if (!ObjectID.isValid(req.params.id)) {
//     return res.status(400).send(req.params.id + " is not a correct syntax ID");
//   }

//   // On recherche le commentaire à mettre à jour
//   const comment = await CommentModel.findById(req.params.id, (err, docs) => {
//     // On retourne une erreur s'il n'existe pas
//     if (err) res.status(400).send("ID unknown : " + req.params.id);
//   }).clone();

//   // On récupère les informations du formulaire (mettre un "deletePictures")
//   const data = JSON.parse(JSON.stringify(req.body));

//   try {
//     // Pour le moment, les valeurs du membre sont ses anciennes valeurs
//     let text = comment.text;
//     let pictures = comment.pictures;

//     // Pour chaque valeur, si elle est définie on l'a met à jour, sinon elle reste la même

//     if (data.text !== "" && data.text !== undefined) text = data.text;

//     // Si le membre a cliqué sur le bouton "supprimer les photos"
//     if (data.deletePictures === "yes") {
//       pictures = [];
//     }

//     // Si on reçoit des images
//     if (req.files.length !== 0) {
//       // On parcourt chaque image passé en paramètre
//       req.files.forEach((file) => {
//         // On vérifie que c'est bien une image
//         verifPicture(file, res);

//         // On lui donne un nom
//         let fileName =
//           comment.writer +
//           comment.idPattern +
//           "-" +
//           getDateSpe(data.date) +
//           file.originalname;

//         // On l'ajoute au tableau des images
//         pictures.push(fileName);
//       });
//     }

//     // S'il y a trop d'images, on remet le tableau d'images d'avant
//     if (pictures.length > 20) {
//       pictures = comment.pictures;
//       throw Error("too much files");
//     }

//     await CommentModel.findOneAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           text: text,
//           pictures: pictures,
//           // On est obligé de changer la date, mais ce n'est pas le membre qui l'enverra
//           // Il faudra prendre la date du jour dans le formulaire
//           date: data.date,
//         },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     )
//       .then((docs) => res.send(docs))
//       .catch((err) => res.status(500).send({ message: err }));
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };

module.exports.updateComment = async (req, res) => {
  // On vérifie que l'ID du commentaire est valid
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  }

  // On recherche le commentaire à mettre à jour
  const comment = await CommentModel.findById(req.params.id, (err, docs) => {
    // On retourne une erreur s'il n'existe pas
    if (err) res.status(400).send("ID unknown : " + req.params.id);
  }).clone();

  // On récupère les informations du formulaire (mettre un "deletePictures")
  const data = JSON.parse(JSON.stringify(req.body));


  try {
    // Pour le moment, les valeurs du membre sont ses anciennes valeurs
    let text = comment.text;

    // Pour chaque valeur, si elle est définie on l'a met à jour, sinon elle reste la même

    if (!isEmpty(data.text) && data.text !== comment.text) text = data.text;


    // Si le membre a cliqué sur le bouton "supprimer les photos"


    await CommentModel.findByIdAndUpdate(
     { _id : req.params.id},
      {
        $set: {
          text: text,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteComment = async (req, res) => {
  // On récupère les informations du commentaire
  const comment = await CommentModel.findById(req.params.id);
  msg = ""

  // On vérifie que l'ID du commentaire est correct
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  } else if (comment === null) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    // On supprime le commentaire de la liste des commentaires du patron
    await PatternModel.findByIdAndUpdate(
      comment.idPattern,
      {
        $pull: {
          comments: req.params.id,
        },
      },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).send({ message: err }));

    // On itère tous les ID des membres qui aiment ce commentaire
    comment.likers.forEach(async (memberId) => {
      // On supprime le commentaire du tableau de commentaires aimés par ce membre
      await MemberModel.findByIdAndUpdate(
        memberId,
        {
          $pull: {
            commentLikes: req.params.id,
          },
        },
        { new: true, upsert: true }
      ).catch((err) => res.status(400).send({ message: err }));
      msg +=
        "Comment " +
        req.params.id +
        " delete in 'commentLikes' of member : " +
        memberId +
        ";         ";
    });

    // On supprime le commentaire
    await CommentModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({
      message: msg + "Comment " + req.params.id + " delete successful",
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Cette fonction marche
module.exports.addLiker = async (req, res) => {
  msg = "";

  // On vérifie que l'ID du commentaire est correct
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send(req.params.id + " is not a correct syntax comment ID");
  } else if ((await CommentModel.findById(req.params.id)) === null) {
    return res.status(400).send("Comment ID unknown : " + req.params.id);
  }

  // On vérifie que l'ID du membre est correct
  if (!ObjectID.isValid(req.body.idMember)) {
    return res
      .status(400)
      .send(req.body.idMember + " is not a correct syntax member ID");
  } else if ((await MemberModel.findById(req.body.idMember)) === null) {
    return res.status(400).send("Member ID unknown : " + req.body.idMember);
  }

  try {
    // On ajoute le membre au tableau des likers du commentaire
    await CommentModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.idMember },
      },
      { new: true }
    )
      .then((docs) => (msg += docs + ","))
      .catch((err) => res.status(400).send({ message: err }));

    // On ajoute le commentaire au tableau des commentaires aimés par ce membre
    await MemberModel.findByIdAndUpdate(
      req.body.idMember,
      {
        $addToSet: { commentLikes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => (msg += docs))
      .catch((err) => res.status(400).send({ message: err }));

    res.send(msg);
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

// Cette fonction marche
module.exports.deleteLiker = async (req, res) => {
  msg = "";

  // On vérifie que l'ID du commentaire est correct
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send(req.params.id + " is not a correct syntax comment ID");
  } else if ((await CommentModel.findById(req.params.id)) === null) {
    return res.status(400).send("Comment ID unknown : " + req.params.id);
  }

  // On vérifie que l'ID du membre est correct
  if (!ObjectID.isValid(req.body.idMember)) {
    return res
      .status(400)
      .send(req.body.idMember + " is not a correct syntax member ID");
  } else if ((await MemberModel.findById(req.body.idMember)) === null) {
    return res.status(400).send("Member ID unknown : " + req.body.idMember);
  }

  try {
    // On supprime le membre du tableau des likers du commentaire
    await CommentModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.idMember },
      },
      { new: true }
    )
      .then((docs) => (msg += docs + ","))
      .catch((err) => res.status(400).send({ message: err }));

    // On supprime le commentaire du tableau des commentaires aimés par ce membre
    await MemberModel.findByIdAndUpdate(
      req.body.idMember,
      {
        $pull: { commentLikes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => (msg += docs))
      .catch((err) => res.status(400).send({ message: err }));

    res.send(msg);
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

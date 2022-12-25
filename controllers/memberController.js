//Pour toutes les actions sur member sauf inscription/connexion/deconnexion

const MemberModel = require("../models/memberModel");
const PatternModel = require("../models/patternModel");
const CommentModel = require("../models/commentModel");
const ObjectID = require("mongoose").Types.ObjectId;
const { verifPicture } = require("../utils/functionUtils");
const path = require("path");
const { signUpErrors } = require("../utils/errorsUtils");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const fs = require("fs");

// Cette fonction marche
module.exports.getAllMembers = async (req, res) => {
  const members = await MemberModel.find().select("-password -admin");
  res.status(200).json(members);
};

// Cette fonction marche
module.exports.memberInfo = (req, res) => {
  MemberModel.findById(req.params.id, (err, docs) => {
    if (!err && docs !== null) {
      res.send(docs);
    } else {
      console.log("Erreur : " + err);
      res.status(400).send("ID unknown : " + req.params.id);
    }
  }).select("-password");
};




module.exports.updatePicture = async (req, res) => {
  // On vérifie que l'ID du membre est valid
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  }

  // On recherche le membre à mettre à jour
  const member = await MemberModel.findById(req.params.id, (err, docs) => {
    // On retourne une erreur s'il n'existe pas
    if (err) res.status(400).send("ID unknown : " + req.params.id);
  }).clone();

  // On récupère les informations du formulaire
  const data = JSON.parse(JSON.stringify(req.body));
  try {
    // Pour le moment, les valeurs du membre sont ses anciennes valeurs
    let pseudo = member.pseudo;
    let picture = member.picture;

    // Pour chaque valeur, si elle est définie on l'a met à jour, sinon elle reste la même

    // Si le membre souhaite supprimer sa photo
    if (data.deletePicture === "yes") {
      picture = "random_member.png";
    }

    if (req.file !== undefined) {
      // Si une image est donnée, on fait les vérifications nécéssaires
      verifPicture(req.file, res);
      // Puis on renomme l'image
      picture = pseudo + path.extname(req.file.originalname);
    }

    await MemberModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          picture: picture,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((docs) => res.send(docs));
  } catch (err) {
    // Ce sont les mêmes erreurs que le signUp qui peuvent apparaitre
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};




module.exports.updateMember = async (req, res) => {
  // On vérifie que l'ID du membre est valid
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  }

  // On recherche le membre à mettre à jour
  const member = await MemberModel.findById(req.params.id, (err, docs) => {
    // On retourne une erreur s'il n'existe pas
    if (err) res.status(400).send("ID unknown : " + req.params.id);
  }).clone();

  // On récupère les informations du formulaire
  const data = JSON.parse(JSON.stringify(req.body));
  try {
    // Pour le moment, les valeurs du membre sont ses anciennes valeurs
    let pseudo = member.pseudo;
    let email = member.email;
    let password = member.password;
    let picture = member.picture;
    let bio = member.bio;
    let auth = true;

    // Pour éviter de traiter à la fois undefined et vide, on met à vide
    if(data.pseudo === undefined) data.pseudo = ""
    if(data.email === undefined) data.email = ""
    if(data.password === undefined) data.password = ""
    if(data.bio === undefined) data.bio = ""

    // Pour chaque valeur, si elle est définie on l'a met à jour, sinon elle reste la même

    if (data.password !== "") {
      // On regarde si le password passé en paramètre est le même
      auth = await bcrypt.compare(data.password, password);
    }

    // Cas particulier si on change le pseudo, il faut renommer l'image
    if (data.pseudo !== "" &&
      data.pseudo !== pseudo &&
      picture !== "random_member.png"
    ) {
      fs.renameSync(
        "./client/public/uploads/memberPicture/" + picture,
        "./client/public/uploads/memberPicture/" +
          data.pseudo +
          path.extname(picture)
      );
      picture = data.pseudo + path.extname(picture);
    }

    if (data.pseudo !== "") pseudo = data.pseudo;

    // Si on a mis un email et que l'email est valide
    if (data.email !== "" && isEmail(data.email)) email = data.email;
    // Sinon si on a mis un email mais qu'il n'est pas conforme
    else if (data.email !== "" && !isEmail(data.email))
      throw Error("not good email");

    //Si on a mis un mdp, que ce mot de passe n'est pas le même qu'avant, et qu'il fait plus de 6 charactère
    if (data.password !== "" && auth === false && data.password.length >= 6) {
      password = data.password;
      // Comme on a mis un nouveau mdp, il faut l'encrypter
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
    }
    // Sinon si on a mis un mdp mais qu'il fait moins de 6 charactères
    else if (data.password !== "" && data.password.length < 6)
      throw Error("password inf 6");

    if (data.bio !== "") bio = data.bio;

    // Si le membre souhaite supprimer sa photo
    if (data.deletePicture === "yes") {
      picture = "random_member.png";
    }

    await MemberModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: pseudo,
          email: email,
          password: password,
          picture: picture,
          bio: bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((docs) => res.send(docs));
  } catch (err) {
    // Ce sont les mêmes erreurs que le signUp qui peuvent apparaitre
    console.log(err);
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};








// module.exports.updateMember = async (req, res) => {
//   // On vérifie que l'ID du membre est valid
//   if (!ObjectID.isValid(req.params.id)) {
//     return res.status(400).send(req.params.id + " is not a correct syntax ID");
//   }

//   // On recherche le membre à mettre à jour
//   const member = await MemberModel.findById(req.params.id, (err, docs) => {
//     // On retourne une erreur s'il n'existe pas
//     if (err) res.status(400).send("ID unknown : " + req.params.id);
//   }).clone();

//   // On récupère les informations du formulaire
//   const data = JSON.parse(JSON.stringify(req.body));
//   try {
//     // Pour le moment, les valeurs du membre sont ses anciennes valeurs
//     let pseudo = member.pseudo;
//     let email = member.email;
//     let password = member.password;
//     let picture = member.picture;
//     let bio = member.bio;
//     let auth = true;

//     // Pour éviter de traiter à la fois undefined et vide, on met à vide
//     if(data.pseudo === undefined) data.pseudo = ""
//     if(data.email === undefined) data.email = ""
//     if(data.password === undefined) data.password = ""
//     if(data.bio === undefined) data.bio = ""

//     // Pour chaque valeur, si elle est définie on l'a met à jour, sinon elle reste la même

//     if (data.password !== "") {
//       // On regarde si le password passé en paramètre est le même
//       auth = await bcrypt.compare(data.password, password);
//     }

//     // Cas particulier si on change le pseudo mais pas l'image, il faut renommer l'image
//     if (
//       req.file === undefined &&
//       data.pseudo !== pseudo &&
//       picture !== "random_member.png"
//     ) {
//       fs.renameSync(
//         "./client/public/uploads/memberPicture/" + picture,
//         "./client/public/uploads/memberPicture/" +
//           data.pseudo +
//           path.extname(picture)
//       );
//       picture = data.pseudo + path.extname(picture);
//     }

//     if (data.pseudo !== "") pseudo = data.pseudo;

//     // Si on a mis un email et que l'email est valide
//     if (data.email !== "" && isEmail(data.email)) email = data.email;
//     // Sinon si on a mis un email mais qu'il n'est pas conforme
//     else if (data.email !== "" && !isEmail(data.email))
//       throw Error("not good email");

//     //Si on a mis un mdp, que ce mot de passe n'est pas le même qu'avant, et qu'il fait plus de 6 charactère
//     if (data.password !== "" && auth === false && data.password.length >= 6) {
//       password = data.password;
//       // Comme on a mis un nouveau mdp, il faut l'encrypter
//       const salt = await bcrypt.genSalt();
//       password = await bcrypt.hash(password, salt);
//     }
//     // Sinon si on a mis un mdp mais qu'il fait moins de 6 charactères
//     else if (data.password !== "" && data.password.length < 6)
//       throw Error("password inf 6");

//     if (data.bio !== "") bio = data.bio;

//     // Si le membre souhaite supprimer sa photo
//     if (data.deletePicture === "yes") {
//       picture = "random_member.png";
//     }

//     if (req.file !== undefined) {
//       // Si une image est donnée, on fait les vérifications nécéssaires
//       verifPicture(req.file, res);
//       // Puis on renomme l'image
//       picture = pseudo + path.extname(req.file.originalname);
//     }

//     await MemberModel.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           pseudo: pseudo,
//           email: email,
//           password: password,
//           picture: picture,
//           bio: bio,
//         },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     ).then((docs) => res.send(docs));
//   } catch (err) {
//     // Ce sont les mêmes erreurs que le signUp qui peuvent apparaitre
//     console.log(err);
//     const errors = signUpErrors(err);
//     res.status(200).send({ errors });
//   }
// };









// Cette fonction marche
module.exports.deleteMember = async (req, res) => {
  // Récupère les informations du membre dont l'ID est passé en paramètre
  const member = await MemberModel.findById(req.params.id);

  msg = "";

  // On vérifie que l'identifiant est valide et connu
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  } else if (member === null) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    /***** Suppression du membre dans le tableau "likers" des Patrons */

    // On récupère l'ID de chaque patron
    member.patternLikes.forEach(async (patternId) => {
      // Comme on a l'identifiant du patron, on peut aller le chercher dans le modèle du patron
      await PatternModel.findByIdAndUpdate(
        patternId,
        {
          // Dans le tableau 'likers' du patron, on supprime le membre
          $pull: {
            likers: req.params.id,
          },
        },
        { new: true, upsert: true }
      ).catch((err) => res.status(400).send({ message: err }));
      msg +=
        "Member " +
        req.params.id +
        " delete in 'likers' of pattern : " +
        patternId +
        ";         ";
    });

    /***** Suppression du membre dans le tableau "likers" des Commentaires */

    // On récupère l'ID de chaque commentaire
    member.commentLikes.forEach(async (commentId) => {
      // Comme on a l'identifiant du commentaire, on peut aller le chercher dans le modèle du commentaire
      await CommentModel.findByIdAndUpdate(
        commentId,
        {
          // Dans le tableau 'likers' du commentaire, on supprime le membre
          $pull: {
            likers: req.params.id,
          },
        },
        { new: true, upsert: true }
      ).catch((err) => res.status(400).send({ message: err }));
      msg +=
        "Member " +
        req.params.id +
        " delete in 'likers' of comment : " +
        commentId +
        ";         ";
    });

    /***** Suppression des commentaires écrits par le membre :
    - dans le tableau "comments" des Patrons 
    - dans le tableau "commentLikes" des autres Membres*/

    // On recherche les informations de tous les patrons
    const patterns = await PatternModel.find();

    // On recherche les informations de tous les membres
    const members = await MemberModel.find();

    // Dans le modèle Commentaire, on va chercher les commentaires écrits par le membre
    const comments = await CommentModel.find({ writer: req.params.id });

    // Pour chacun de ces commentaires
    comments.forEach(async (oneComment) => {
      // Pour chaque patron
      patterns.forEach(async (onePattern) => {
        // Si l'ID du commentaire est présent dans la liste des commentaires du patron
        if (onePattern.comments.includes(oneComment._id)) {
          // On supprime le commentaire
          await PatternModel.findByIdAndUpdate(
            onePattern._id,
            {
              $pull: {
                comments: oneComment._id,
              },
            },
            { new: true, upsert: true }
          ).catch((err) => res.status(400).send({ message: err }));
          msg +=
            "Comment " +
            oneComment._id +
            " delete in 'comments' of pattern : " +
            onePattern._id +
            ";         ";
        }
      });

      // On refait la même chose pour les autres membres qui ont aimé des commentaires liés au membre à supprimer

      // Pour chaque membre
      members.forEach(async (oneMember) => {
        // Si le commentaire est présent dans la liste des commentaires aimés par un membre
        if (oneMember.commentLikes.includes(oneComment._id)) {
          // On supprime le commentaire
          await MemberModel.findByIdAndUpdate(
            oneMember._id,
            {
              $pull: {
                commentLikes: oneComment._id,
              },
            },
            { new: true, upsert: true }
          ).catch((err) => res.status(400).send({ message: err }));
          msg +=
            "Comment " +
            oneComment._id +
            " delete in 'commentLikes' of member : " +
            oneMember._id +
            ";         ";
        }
      });
    });

    // On supprime tous les commentaires écrits par le membre
    await CommentModel.deleteMany({ writer: req.params.id }).exec();

    // On supprime le membre
    await MemberModel.deleteOne({ _id: req.params.id }).exec();

    res.status(200).json({
      message: msg + "Member " + req.params.id + " delete successful",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Toutes les actions sur les patterns
const PatternModel = require("../models/patternModel");
const MemberModel = require("../models/memberModel");
const CommentModel = require("../models/commentModel");
const { addPatternErrors, uploadErrors } = require("../utils/errorsUtils");
const ObjectID = require("mongoose").Types.ObjectId;
const path = require("path");
const { getDate, isEmpty } = require("../utils/functionUtils");
const fs = require("fs");

// Cette fonction marche
module.exports.addPattern = async (req, res) => {
  // On récupère les informations passées dans le formulaire
  const data = JSON.parse(JSON.stringify(req.body));

  let word = "";

  // On va cherche la date du jour
  const date = getDate();

  // Si on a mis un word
  if (req.files["word"] !== undefined) word = req.files["word"];

  try {
    // Si les éléments "required" ne sont pas set, on retourne une erreur
    if (
      data.idCustom === "" ||
      data.tags === "" ||
      data.title === "" ||
      data.type === "" ||
      req.files["pdf"] === undefined ||
      req.files["picture"] === undefined
    ) {
      throw Error("miss arg");
    }

    // On regarde si le type est conforme
    if (
      data.type !== "Crochet" &&
      data.type !== "Point De Croix" &&
      data.type !== "Broderie" &&
      data.type !== "Tricot" &&
      data.type !== "Bracelet Brésilien" &&
      data.type !== "Couture"
    )
      throw Error("not good type");

    // On set les variables de nom de fichiers
    let pdfName = "";
    let wordName = "";
    let pictureName = "";

    try {
      // On vérifie que les fichiers font la bonne taille
      if (
        req.files["picture"][0].size > 1000000000 ||
        req.files["pdf"][0].size > 1000000000 ||
        (word !== "" && word[0].size > 1000000000)
      )
        throw Error("max size");

      // On vérifie que les fichiers sont dans le bon format
      if (
        (req.files["picture"][0].mimetype !== "image/jpg" &&
          req.files["picture"][0].mimetype !== "image/png" &&
          req.files["picture"][0].mimetype !== "image/jpeg") ||
        req.files["pdf"][0].mimetype !== "application/pdf" ||
        (word !== "" &&
          word[0].mimetype !==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
          word[0].mimetype !== "application/msword")
      ) {
        throw Error("invalid file");
      }

      // On modifie le nom des fichiers
      if (req.files["pdf"][0].fieldname === "pdf")
        pdfName =
          data.idCustom + date + path.extname(req.files["pdf"][0].originalname);

      if (req.files["picture"][0].fieldname === "picture")
        pictureName =
          data.idCustom +
          date +
          path.extname(req.files["picture"][0].originalname);

      if (word !== "" && word[0].fieldname === "word") {
        wordName = data.idCustom + date + path.extname(word[0].originalname);
      }
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(500).json({ errors });
    }

    // Si les fichiers requis ne sont pas présents, on n'ajoute pas le pattern
    if (
      req.files["picture"] === undefined ||
      data.idCustom === "" ||
      req.files["pdf"] === undefined ||
      data.tags === "" ||
      data.title === "" ||
      data.type === ""
    ) {
      throw Error("miss arg");
    } else {
      const pattern = await PatternModel.create({
        idCustom: data.idCustom,
        title: data.title,
        type: data.type,
        picture: pictureName,
        pdf: pdfName,
        word: wordName,
        description: data.description,
        tags: data.tags.split(","),
      });
      res.status(201).json({ pattern: pattern });
    }
  } catch (err) {
    const errors = addPatternErrors(err);
    return res.status(500).json({ errors });
  }
};

// Cette fonction marche
module.exports.getAllPatterns = (req, res) => {
  PatternModel.find((err, docs) => {
    if (!err) res.send(docs);
    else res.status(400).send("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

// Cette fonction marche
module.exports.patternInfo = (req, res) => {
  PatternModel.findById(req.params.id, (err, docs) => {
    if (!err && docs !== null) {
      res.send(docs);
    } else {
      res.status(400).send("ID unknown : " + req.params.id);
    }
  }).select();
};

module.exports.updatePattern = async (req, res) => {
  // On vérifie que l'ID du patron est valid
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  }

  // On recherche le patron à mettre à jour
  const pattern = await PatternModel.findById(req.params.id, (err, docs) => {
    // On retourne une erreur s'il n'existe pas
    if (err) res.status(400).send("ID unknown : " + req.params.id);
  }).clone();

  // On récupère les informations du formulaire (mettre un "deleteWord" et "deleteTags")
  const data = JSON.parse(JSON.stringify(req.body));

  // On va cherche la date du jour
  const date = getDate();

  try {
    // Pour le moment, les valeurs du membre sont ses anciennes valeurs
    let idCustom = pattern.idCustom;
    let title = pattern.title;
    let type = pattern.type;
    let picture = pattern.picture;
    let pdf = pattern.pdf;
    let word = pattern.word;
    let description = pattern.description;
    let tags = pattern.tags;

    console.log(req.files)

    
    // Cas particulier si on change l'ID custom mais pas l'image, il faut renommer l'image
    if (
      isEmpty(req.files["picture"]) &&
      data.idCustom !== idCustom &&
      picture !== "null" &&
      !isEmpty(data.idCustom)
    ) {
      fs.renameSync(
        "./client/public/uploads/patternPicture/" + picture,
        "./client/public/uploads/patternPicture/" +
          data.idCustom +
          date +
          path.extname(picture)
      );

      picture = data.idCustom + date + path.extname(picture);
    }

    // Cas particulier si on change l'ID custom mais pas le pdf, il faut renommer l'image
    if (
      req.files["pdf"] === undefined &&
      data.idCustom !== idCustom &&
      pdf !== "null" &&
      !isEmpty(data.idCustom)
    ) {
      fs.renameSync(
        "./client/public/uploads/patternPDF/" + pdf,
        "./client/public/uploads/patternPDF/" +
          data.idCustom +
          date +
          path.extname(pdf)
      );

      pdf = data.idCustom + date + path.extname(pdf);
    }

    // Cas particulier si on change l'ID custom mais pas le word, il faut renommer le word
    if (
      req.files["word"] === undefined &&
      data.idCustom !== idCustom &&
      word !== "null" &&
      !isEmpty(word) &&
      !isEmpty(data.idCustom)
    ) {
      fs.renameSync(
        "./client/public/uploads/patternWord/" + word,
        "./client/public/uploads/patternWord/" +
          data.idCustom +
          date +
          path.extname(word)
      );

      word = data.idCustom + date + path.extname(word);
    }

    // Pour chaque valeur, si elle est définie on l'a met à jour, sinon elle reste la même
    if (!isEmpty(data.idCustom))
      idCustom = data.idCustom;
    if (!isEmpty(data.title)) title = data.title;
    if (!isEmpty(data.type)) type = data.type;
    if (!isEmpty(data.description))
      description = data.description;
    if (data.deleteWord === "yes") word = "";
    if (!isEmpty(data.tags))
      tags = data.tags.split(",")
    // if (tags.length === 0) throw Error("tags required");

    // On vérifie que le type est bon
    if (
      type !== "Crochet" &&
      type !== "Point De Croix" &&
      type !== "Broderie" &&
      type !== "Tricot" &&
      type !== "Bracelet Brésilien" &&
      type !== "Couture"
    )
      throw Error("not good type");

    // On vérifie que les fichiers font la bonne taille
    if (
      (!isEmpty(req.files["picture"]) &&
        req.files["picture"][0].size > 1000000000) ||
      (!isEmpty(req.files["pdf"]) &&
        req.files["pdf"][0].size > 1000000000) ||
      (!isEmpty(req.files["word"]) &&
        req.files["word"][0].size > 1000000000)
    )
      throw Error("max size");

    // On vérifie que les fichiers sont dans le bon format
    if (
      (!isEmpty(req.files["picture"]) &&
        req.files["picture"][0].mimetype !== "image/jpg" &&
        req.files["picture"][0].mimetype !== "image/png" &&
        req.files["picture"][0].mimetype !== "image/jpeg") ||
      (!isEmpty(req.files["pdf"]) &&
        req.files["pdf"][0].mimetype !== "application/pdf") ||
      (!isEmpty(req.files["word"]) &&
        req.files["word"][0].mimetype !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        req.files["word"][0].mimetype !== "application/msword")
    ) {
      throw Error("invalid file");
    }

    // On modifie le nom des fichiers
    if (
      !isEmpty(req.files["pdf"]) &&
      req.files["pdf"][0].fieldname === "pdf"
    )
      pdf = idCustom + date + path.extname(req.files["pdf"][0].originalname);

    if (
      !isEmpty(req.files["picture"]) &&
      req.files["picture"][0].fieldname === "picture"
    )
      picture =
        idCustom + date + path.extname(req.files["picture"][0].originalname);

    if (
      !isEmpty(req.files["word"]) &&
      req.files["word"][0].fieldname === "word"
    ) {
      word = idCustom + date + path.extname(req.files["word"][0].originalname);
    }

    await PatternModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          idCustom: idCustom,
          title: title,
          type: type,
          description: description,
          tags: tags,
          picture: picture,
          pdf: pdf,
          word: word,
          
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((docs) => res.send(docs));
  } catch (err) {
    console.log(err)
    const errors = addPatternErrors(err);
    return res.status(500).json({ errors });
  }
};

//voir pour supprimer les images liés dans les fichiers
// Cette fonction marche
module.exports.deletePattern = async (req, res) => {
  // On récupère les informations du patrons à supprimer
  const pattern = await PatternModel.findById(req.params.id);

  msg = "";

  // On vérifie si l'ID du patron est correct
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  } else if ((await PatternModel.findById(req.params.id)) === null) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    /***** Suppression du patron dans le tableau "patternLikes" des membres */

    // On récupère l'ID de chaque membre qui aimait ce patron
    pattern.likers.forEach(async (memberId) => {
      // On va supprimer le patron dans le tableau 'patternLikes'
      await MemberModel.findByIdAndUpdate(
        memberId,
        {
          $pull: {
            patternLikes: req.params.id,
          },
        },
        { new: true, upsert: true }
      ).catch((err) => res.status(400).send({ message: err }));

      msg +=
        "Pattern " +
        req.params.id +
        " delete in 'patternLikes' of membre : " +
        memberId +
        ";         ";
    });

    /***** Suppression des commentaires aimés par un membre et qui étaient
       rattachés au patron à supprimer */

    // On cherche tous les commentaires liés à ce patron
    const comments = await CommentModel.find({ idPattern: req.params.id });
    // On récupère toutes les informations sur les membres
    const members = await MemberModel.find();

    // Pour chaque commentaire lié au patron
    comments.forEach(async (oneComment) => {
      // Pour chaque membre
      members.forEach(async (oneMember) => {
        // On regarde si le commentaire est inclu dans le tableau 'commentLikes' du membre
        if (oneMember.commentLikes.includes(oneComment._id)) {
          // Puis on le supprime
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

    // On supprime les commentaires liés au Patron
    await CommentModel.deleteMany({ idPattern: req.params.id }).exec();

    // On supprime le patron
    await PatternModel.deleteOne({ _id: req.params.id }).exec();

    res.status(200).json({
      message: msg + "Pattern " + req.params.id + " delete successful",
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Cette fonction marche
module.exports.addLiker = async (req, res) => {
  // On vérifie que l'identifiant du pattern passé en paramètre est correct
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  } else if ((await PatternModel.findById(req.params.id)) === null) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  // On vérifie que l'identifiant du membre passé en body est correct
  if (!ObjectID.isValid(req.body.idMember)) {
    return res
      .status(400)
      .send(req.body.idMember + " is not a correct syntax ID");
  } else if ((await MemberModel.findById(req.body.idMember)) === null) {
    return res.status(400).send("Member ID unknown : " + req.body.idMember);
  }

  let pattern
  let member

  try {
    // On recherche le patron grâce à son ID
    pattern = await PatternModel.findByIdAndUpdate(
      req.params.id,
      {
        // On ajoute le membre à la liste des likers du patron
        $addToSet: { likers: req.body.idMember },
      },
      { new: true }
    )
      
    // On recherche le membre grâce à son ID
    member = await MemberModel.findByIdAndUpdate(
      req.body.idMember,
      {
        // On ajoute le patron à la liste des pattern likés par le membre
        $addToSet: { patternLikes: req.params.id },
      },
      { new: true }
    )
     
  } catch (err) {
    
    return res.status(400).send({ message: err });
    
  }

  res.send({ pattern, member });
};

// Cette fonction marche
module.exports.deleteLiker = async (req, res) => {


  // On vérifie que l'identifiant du pattern passé en paramètre est correct
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id + " is not a correct syntax ID");
  } else if ((await PatternModel.findById(req.params.id)) === null) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  // On vérifie que l'identifiant du membre passé en body est correct
  if (!ObjectID.isValid(req.body.idMember)) {
    return res
      .status(400)
      .send(req.body.idMember + " is not a correct syntax ID");
  } else if ((await MemberModel.findById(req.body.idMember)) === null) {
    return res.status(400).send("Member ID unknown : " + req.body.idMember);
  }

  let pattern
  let member

  try {
    // On recherche le patron grâce à son ID
    pattern = await PatternModel.findByIdAndUpdate(
      req.params.id,
      {
        // On supprime le membre de la liste des likers du patron
        $pull: { likers: req.body.idMember },
      },
      { new: true }
    )

    // On recherche le membre grâce à son ID
    member = await MemberModel.findByIdAndUpdate(
      req.body.idMember,
      {
        // On supprime le patron de la liste des pattern likés par le membre
        $pull: { patternLikes: req.params.id },
      },
      { new: true }
    )

  } catch (err) {
    return res.status(400).send({ message: err });
  }
  res.send({ pattern, member });
};

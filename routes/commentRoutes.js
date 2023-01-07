const router = require("express").Router();
const commentController = require("../controllers/commentController");
// const multer = require("multer");
// const CommentModel = require("../models/commentModel");
// const { getDateSpe } = require("../utils/functionUtils");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${__dirname}/../client/public/uploads/commentPicture/`);
//   },
//   filename: async function (req, file, cb) {
//     // On récupère les data passées dans le formulaire
//     const data = JSON.parse(JSON.stringify(req.body));

//     // On initialise les valeurs qui vont servir au nommage
//     let writer = "";
//     let idPattern = "";
    
//     console.log("mes fichiers")
//     console.log(file)

//     // si on est dans le cas d'une modification
//     if (req.params.id !== undefined) {
//       const comment = await CommentModel.findById(
//         req.params.id,
//         (err, docs) => {
//           if (err) return "ID unknown : " + req.params.id;
//         }
//       ).clone();

//       // On laisse les valeurs
//       writer = comment.writer;
//       idPattern = comment.idPattern;
//     } else {
//       // Si on est dans une création de commentaire, on peut mettre les valeurs
//       writer = data.writer;
//       idPattern = data.idPattern;
//     }

//     const fileName =
//       writer + idPattern + "-" + getDateSpe(data.date) + file.originalname;

//     cb(null, fileName);
//   },
// });

// const uploads = multer({ storage: storage });


// router.post(
//   "/addComment",
//   uploads.array("pictures", 20),
//   commentController.addComment
// );

router.post(
  "/addComment",
  commentController.addComment
);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.commentInfo);
// router.put(
//   "/:id",
//   uploads.array("pictures", 20),
//   commentController.updateComment
// );

router.put(
  "/:id",
  commentController.updateComment
);
router.delete("/:id", commentController.deleteComment);
router.patch("/addLiker/:id", commentController.addLiker);
router.patch("/deleteLiker/:id", commentController.deleteLiker);

module.exports = router;

const router = require("express").Router();
const patternController = require("../controllers/patternController");
const multer = require("multer");
const PatternModel = require("../models/patternModel");
const path = require("path");
const { getDate, isEmpty } = require("../utils/functionUtils");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const data = JSON.parse(JSON.stringify(req.body));
    const pattern = await PatternModel.find({ idCustom: data.idCustom });
    let dir;
    if (pattern._id === undefined) {
      if (file.fieldname === "pdf")
        dir = `${__dirname}/../client/public/uploads/patternPDF/`;

      if (file.fieldname === "word")
        dir = `${__dirname}/../client/public/uploads/patternWord/`;

      if (file.fieldname === "picture")
        dir = `${__dirname}/../client/public/uploads/patternPicture/`;
    }

    cb(null, dir);
  },
  filename: async (req, file, cb) => {
    // On récupère les data passées dans le formulaire
    const data = JSON.parse(JSON.stringify(req.body));

    let fileName = "null";

    // si on est dans le cas d'une modification de patron
    if (!isEmpty(req.params.id)) {
      // Si on n'a pas set un nouvel ID custom
      if (isEmpty(req.body.idCustom)) {
        // On recherche les infos du pattern à modifier
        const pattern = await PatternModel.findById(
          req.params.id,
          (err, docs) => {
            if (err) return "ID unknown : " + req.params.id;
          }
        ).clone();

        fileName =
          pattern.idCustom + getDate() + path.extname(file.originalname);
      }
      // Si on a set un nouvel ID custom
      else
        fileName =
          req.body.idCustom + getDate() + path.extname(file.originalname);
    }
    // Si on est dans une création de patron
    else {
      if (
        (file.fieldname === "pdf" ||
          file.fieldname === "word" ||
          file.fieldname === "picture") &&
        !isEmpty(data.idCustom) &&
        !isEmpty(data.tags) &&
        !isEmpty(data.title) &&
        !isEmpty(data.type) &&
        (data.type === "Crochet" ||
          data.type === "Point De Croix" ||
          data.type === "Broderie" ||
          data.type === "Tricot" ||
          data.type === "Bracelet Brésilien" ||
          data.type === "Couture") &&
        ((file.fieldname === "pdf" && file.mimetype === "application/pdf") ||
          (file.fieldname === "word" &&
            (file.mimetype === "application/msword" ||
              file.mimetype ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) ||
          (file.fieldname === "picture" &&
            (file.mimetype === "image/jpg" ||
              file.mimetype === "image/png" ||
              file.mimetype === "image/jpeg")))
      ) {
        fileName = data.idCustom + getDate() + path.extname(file.originalname);
      }
    }

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const manyUploads = upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "word", maxCount: 1 },
  { name: "picture", maxCount: 1 },
]);

//pattern
router.post("/addPattern", manyUploads, patternController.addPattern);
router.get("/", patternController.getAllPatterns);
router.get("/:id", patternController.patternInfo);
router.put("/:id", manyUploads, patternController.updatePattern);
router.delete("/:id", patternController.deletePattern);
router.patch("/addLiker/:id", patternController.addLiker);
router.patch("/deleteLiker/:id", patternController.deleteLiker);

module.exports = router;

// Toutes les routes qui appartiennent aux members (Controlleurs auth et member)
const MemberModel = require("../models/memberModel");
const router = require("express").Router();
const authController = require("../controllers/authController");
const memberController = require("../controllers/memberController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../client/public/uploads/memberPicture/`);
  },
  filename: async (req, file, cb) => {

    // On recherche les informations du membre à mettre à jour
    const member = await MemberModel.findById(req.params.id, (err, docs) => {
      if (err) return "ID unknown : " + req.params.id;
    }).clone();

    // Pour l'instant le pseudo est l'ancien
    let pseudo = member.pseudo;

    const fileName = pseudo + path.extname(file.originalname);

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// auth
router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);
router.get("/signOut", authController.signOut);

// member
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.memberInfo);
router.put("/updatePicture/:id", upload.single("picture"), memberController.updatePicture);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

//upload
// router.post(
//   "/upload/:id",

//   uploadController.uploadMemberPicture
// );

module.exports = router;

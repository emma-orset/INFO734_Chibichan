// Toutes les routes qui appartiennent aux members (Controlleurs auth et member)

const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const memberController = require("../controllers/member.controller");

// auth
router.post("/signUp", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// member
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.memberInfo);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);
router.patch("/addFavorite/:id", memberController.addFavorite);
router.patch("/deleteFavorite/:id", memberController.deleteFavorite);

module.exports = router;

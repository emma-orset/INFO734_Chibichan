// Toutes les routes qui appartiennent aux membres (Controlleurs auth et membre)

const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const membreController = require("../controllers/membre.controller");

router.post("/signUp", authController.signUp);

module.exports = router;

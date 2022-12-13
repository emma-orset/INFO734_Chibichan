const router = require("express").Router();
const patternController = require("../controllers/pattern.controller");

router.post("/addPattern", patternController.addPattern);
router.get("/", patternController.getAllPatterns);
router.get("/:id", patternController.patternInfo);
router.put("/:id", patternController.updatePattern);
router.delete("/:id", patternController.deletePattern);

module.exports = router;
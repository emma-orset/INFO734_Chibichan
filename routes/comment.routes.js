const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

router.post("/addComment", commentController.addComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.commentInfo);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
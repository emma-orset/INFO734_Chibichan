const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    writer: {
      // Identifiant du membre qui a écrit le commentaire
      type: String,
      required: true,
    },

    idPattern: {
      // Identifiant du pattern auquel il est relié
      type: String,
      required: true,
    },

    // pictures: {
    //   // Chemin des images
    //   type: [String],
    // },

    likers: {
      // Identifiants des membres qui aiment le commentaire
      type: [String],
    },

    // date: {
    //   type: Date,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;

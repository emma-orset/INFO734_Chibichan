const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },

        pictures: {
            // Chemin des images
            type: [String]
        },

        writer: {
            // Identifiant du membre qui a écrit le commentaire
            type: String,
            required: true,
        },

        likes: {
            // Identifiants des membres qui aiment le commentaire
            type: [String]
        },

        comments: {
            // Identifiants des commentaires de ce commentaire
            type: [String]
        }


    },
    {
        timestamps: true,
    }
)

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;
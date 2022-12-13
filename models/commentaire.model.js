const mongoose = require("mongoose")
const commentaireSchema = new mongoose.Schema(
    {
        texte: {
            type: String,
            required: true,
        },

        images: {
            // Chemin des images
            type: [String]
        },

        redacteur: {
            // Identifiant du membre qui a écrit le commentaire
            type: String,
            required: true,
        },

        likes: {
            // Identifiants des membres qui aiment le commentaire
            type: [String]
        },

        commentaires: {
            // Identifiants des commentaires de ce commentaire
            type: [String]
        }


    },
    {
        timestamps: true,
    }
)

const CommentaireModel = mongoose.model("commentaire", commentaireSchema);

module.exports = CommentaireModel;
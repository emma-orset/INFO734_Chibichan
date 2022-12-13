const mongoose = require("mongoose")
const patronSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },

        type: {
            //Soit "Crochet", soit "Point de Croix", soit "Broderie", soit "Tricot", soit "Bracelet Brésilien"
            type: String,
            required: true,
        },

        image: {
            // Chemin de l'image
            type: String,
            required: true,
        },

        pdf: {
            // Chemin du pdf
            type: String,
            required: true,
        },

        word: {
            // Chemin du word
            type: String,
        },

        description: {
            type: String,
        },

        tags: {
            // Libellé des tags
            type: [String],
            required: true,
            lowercase: true,

        },

        commentaires: {
            // identifiants des commentaires
            type:[String],
        }


    },
    {
        timestamps: true,
    }
)

const PatronModel = mongoose.model("patron", patronSchema);

module.exports = PatronModel;
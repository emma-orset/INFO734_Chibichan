const mongoose = require("mongoose")
const patternSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        type: {
            //Soit "Crochet", soit "Point de Croix", soit "Broderie", soit "Tricot", soit "Bracelet Brésilien"
            type: String,
            required: true,
        },

        picture: {
            // Chemin de l'image
            type: String,
            required: true,
        },

        pdf: {
            // Chemin du pdf
            type: String,
            required: true,
            unique: true,
        },

        word: {
            // Chemin du word
            type: String,
            unique: true,
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

        favorites:{
            // identifiants des membres qui ont mis le patron en favori
            type:[String],
        },

        comments: {
            type: [{
                commenterId:String,
                commenterPseudo: String,
                text: String,
                images:[String],
                likers:[String],
                timestamps: Number,
            }]
        },
    },
    {
        timestamps: true,
    }
)

const PatternModel = mongoose.model("pattern", patternSchema);

module.exports = PatternModel;
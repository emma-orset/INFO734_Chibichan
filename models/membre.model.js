const { notStrictEqual } = require("assert")
const mongoose = require("mongoose")
const { isEmail } = require("validator")
const { boolean } = require("webidl-conversions")
const membreSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique : true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },

        mdp: {
            type: String,
            required: true,
            minLength: 6,
            max:1024,
        },

        image: {
            // Chemin image de profil
            type: String,
            // Image par défaut :
            default: "./uploads/profil/random_user.png"
        },

        bio: {
            type: String,
        },

        admin: {
            type: boolean,
            required: true,
            default:false,
        },

        favoris: {
            // id des patrons mis en favori
            type: [String]
        },

        likes: {
            // id des commentaires aimé par ce membre
            type: [String]
        },

        commentaires: {
            // Identifiants des commentaires écrits par ce membre
            type: [String]
        }

    },
    {
        timestamps: true,
    }
)

const MembreModel = mongoose.model("membre", membreSchema);

module.exports = MembreModel;
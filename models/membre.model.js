const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")


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
            type: Boolean,
            required: true,
            default: false,
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

// fonction qui va s'executer avant de save en base de données
membreSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.mdp = await bcrypt.hash(this.mdp, salt)
    next()
})

const MembreModel = mongoose.model("membre", membreSchema);

module.exports = MembreModel;
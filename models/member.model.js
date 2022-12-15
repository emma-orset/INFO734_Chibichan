const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")


const memberSchema = new mongoose.Schema(
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

        pwd: {
            type: String,
            required: true,
            minlength: 6,
        },

        picture: {
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

        favorites: {
            // id des patrons mis en favori
            type: [String]
        },

        likers: {
            // id des commentaires aimé par ce member
            type: [String]
        },

        comments: {
            // Identifiants des commentaires écrits par ce member
            type: [String]
        }

    },
    {
        timestamps: true,
    }
)

// fonction qui va s'executer avant de save en base de données
memberSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.pwd = await bcrypt.hash(this.pwd, salt)
    next()
})

memberSchema.statics.login = async function(email, pwd){
    const member = await this.findOne({email});
    if(member){
        const auth = await bcrypt.compare(pwd, member.pwd);
        if(auth){
            return member;
        }
        throw Error('Incorrect password')
    }
    throw Error("Incorrect email")
}

const MemberModel = mongoose.model("member", memberSchema);

module.exports = MemberModel;
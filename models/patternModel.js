const mongoose = require("mongoose");
const patternSchema = new mongoose.Schema(
  {
    idCustom: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

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
    },

    word: {
      // Chemin du word
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    tags: {
      // Libellé des tags
      type: [String],
      required: true,
      lowercase: true,
    },

    likers: {
      // identifiants des membres qui ont mis le patron en favori
      type: [String],
    },

    comments: {
      // identifiants des commentaires liés au pattern
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const PatternModel = mongoose.model("pattern", patternSchema);

module.exports = PatternModel;

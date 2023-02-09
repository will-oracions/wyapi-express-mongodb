const mongoose = require("mongoose");

const AbonnementSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
    },

    forfait: {
      type: String,
      default: "Yamo",
    },

    NbHeure: {
      type: Number,
      default: 03,
    },

    prix: {
      type: Number,
      default : 5,
    },

   
    duree: {
      type: Number,
      default : 5,
    }
  }
);

module.exports = mongoose.model("Abonnement", abonnementModel);
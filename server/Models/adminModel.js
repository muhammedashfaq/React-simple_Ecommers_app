const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        require: true,
      },
  
    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Admin", adminSchema);
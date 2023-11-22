const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
    },
    ProductName: {
      type: String,
      required: this.true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    image: {
      type: Array,
    },

    totalAmount: {
      type: Number,
    },

    Date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);

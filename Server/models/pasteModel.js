const {Schema,model} = require("mongoose");

const PasteSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },

  Content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PasteModel = model("Paste", PasteSchema)

module.exports = PasteModel
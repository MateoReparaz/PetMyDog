const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const breedSchema = new Schema({
    breed: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Breed = mongoose.model("Breed", breedSchema);
module.exports = Breed;

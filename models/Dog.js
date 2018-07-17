const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    age: Number,
    photo: String,
    owner: { type: String, required: true },
    breed: { type: String, required: true },
    size: { type: { enum: ["Toy", "Small", "Medium", "Large"] } },
    description: String,
    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

dogSchema.index({
  location: "2dsphere"
});

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;

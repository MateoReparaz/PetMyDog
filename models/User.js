const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  hasDog: {type: Boolean, default: false},
  isAdmin: { type: Boolean, default: false },
  isOwner: { type: Boolean, default: false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

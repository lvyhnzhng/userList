const mongoose = require("mongoose");
const female = "f";
const male = "m";
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  sex: { type: String, enum: ["female", "male"] },
  age: Number,
  password: String,
});
const newUser = mongoose.model("list_user", userSchema);
// why cannot: export default newUser?
module.exports = newUser;

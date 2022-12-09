const express = require("express");
const { default: mongoose } = require("mongoose");
const { findById } = require("./schema");
const User = require("./schema");

const router = express.Router();
router.get("/", async (req, res, next) => {
  const allUsers = await User.find();
  //   console.log(allUsers);
  res.send(allUsers);
});

router.post("/", async (req, res, next) => {
  // console.log(req.body.newUserInfo);
  const { firstname, lastname, sex, age, password } = req.body.newUserInfo;
  try {
    const newUser = await User.create({
      firstname: firstname,
      lastname: lastname,
      sex: sex,
      age: age,
      password: password,
    });
    res.send(req.body);
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/:id", async (req, res) => {
  // const id =  '63871220eb9d184811190a52'
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  //mongoose.Types.ObjectId(req.params.id.trim());
  const userToEdit = await User.findById(id);
  res.send(userToEdit); //return to UI
});
router.put("/:id", async (req, res) => {
  const { firstname, lastname, sex, age, password } = req.body.userInfo;
  // console.log(req.body.userInfo);
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const userToEdit = await User.findByIdAndUpdate(id, {
      firstname: firstname,
      lastname: lastname,
      sex: sex,
      age: age,
      password: password,
    });
    res.send(userToEdit);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  User.findByIdAndDelete(id)
    .then(() => {
      console.log(`id = ${id} has been deleted in database`);
      res.send(`id = ${id} has been deleted in database`);
    })
    .catch((e) => {
      console.log(e.message);
    });
});

module.exports = router;

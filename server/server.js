const mongoose = require("mongoose");
const express = require("express");
const User = require("./schema");
const dbname = "projects_data";
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbsrv =
  "mongodb+srv://lvyhnzhng:gU2Wv9Ecy02Xaf1X@cluster0.ay6vh7g.mongodb.net/projects_data?retryWrites=true&w=majority";
// const dburl = "mongodb://127.0.0.1:27017/projects_data";
const app = express();
const PORT = 8088;
mongoose.connect(dbsrv);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const test = async () => {
  const user1 = new User({
    firstname: "John",
    lastname: "Geo",
    sex: "male",
    age: 24,
    password: "123asdASD",
  });
  await user1.save();
  console.log(user1);
};
// test();
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

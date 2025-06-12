const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

//we use express.json middle to convert JSON request to plan js object since server dont understand ths JSON so we have to convert that
app.use(express.json());

//sign up api
app.post("/signup", async (req, res) => {
  const userObj = req.body;
  console.log(userObj);
  const user = new User(userObj);
  console.log(user);
  if (user && userObj) {
    try {
      await user.save();
      res.send("User added Successfully!!!");
    } catch (err) {
      res.status(400).send("Falied to save the data: " + err.message);
    }
  } else {
    res.status(400).send("Falied to save the data");
  }
});

//GET api to get the single user
app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.findOne({
      emailId: userEmailId,
    });

    if (user.length == 0) {
      // user not found
      res.status(404).send("User not found!!!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});


//GET user by id
app.get("/userbyid", async (req, res) => {
  const userId = req.body._id;

  try {
    const user = await User.findById(userId);

    if (user.length == 0) {
      // user not found
      res.status(404).send("User not found!!!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});


//GET - feed api to get all the users
app.get("/feed", async (req, res) => {

  try {
    const user = await User.find({
    });

    if (user.length == 0) {
      // user not found
      res.status(404).send("Users not found!!!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});



connectDB()
  .then(() => {
    console.log("DB Connected Successfully....");
    app.listen(7777, () => {
      console.log("Server is running successfully on port 7777");
    });
  })
  .catch((err) => {
    console.log("DB connection Failed!!!");
  });

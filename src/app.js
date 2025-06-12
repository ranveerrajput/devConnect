const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

//we use express.json middle to convert JSON request to plan js object since server dont understand ths JSON so we have to convert that
app.use(express.json());

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

app.use("/user", (req, res) => {
  console.log("from / route");
  res.send("Hello ");
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

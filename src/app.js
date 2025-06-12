const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.post("/signup", async(req, res) => {
  const userObj = {
    firstName: "Sachin",
    lastName: "Magar",
    emailId: "sachin@gmail.com",
    password: "12334",
  };
  const user = new User(userObj);

  try {
    await user.save();
     res.send("User added Successfully!!!");
  } catch (err) {
    res.status(400).send("Falied to save the data: " + err.message);
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

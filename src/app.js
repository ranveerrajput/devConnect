const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validate.js");
const bcrypt = require('bcrypt');

const app = express();
const User = require("./models/user");

//we use express.json middle to convert JSON request to plan js object since server dont understand ths JSON so we have to convert that
app.use(express.json());

//sign up api

app.post("/signup", async (req, res) => {
  try {
    //validate the data
    validateSignUpData(req);
    const {firstName, lastName, password, emailId} = req.body;

    //encrypt the password

    const passwordHash = await bcrypt.hash(password,10); //adding 10 round of salt to password
   

    console.log(passwordHash);

    //save the encrypted password
    
    const user = new User({
      firstName,
      lastName,
      password : passwordHash,
      emailId
    });

    await user.save();
    res.send("User added Successfully!!!");
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

//login api
app.post('/login', async(req,res)=>{

  try{
    const {emailId, password} = req.body;

    //check if emeial exist
    console.log("Email id-->", emailId);

    const user = await User.findOne({emailId : emailId});

    if(!user)
    {
       throw new Error('Invalid Credentials');
    }
    console.log("usere--->", user);

    const isValidUser = await bcrypt.compare(password,user.password);

    if(isValidUser)
    {
      res.send("Login Successfull!!!");
    }else{
      throw new Error('Invalid Credentials');
    }


  }catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
  

  //check if email exist
})

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
    const user = await User.find({});

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

//DELETE - user api to delete a user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  if (userId) {
    try {
      await User.findByIdAndDelete(userId);
      res.send("User deleted successfully!!!");
    } catch (err) {
      res.status(404).send("Something went wrong!!!");
    }
  } else {
    res.status(400).send("User not found!!!");
  }
});

//PATCH - user api to update the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req?.params?.userId;
  const data = req.body;
  if (userId) {
    try {
      const ALLOWED_UPDATES = ["phototUrl", "about", "gender", "age", "skills"];
      const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k)
      );

      if (!isUpdateAllowed) {
        throw new Error("Updates not allowed");
      }

      if (req.body?.skills?.length > 10) {
        throw new Error("Only 10 skills are allowed");
      }

      const user = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "before",
        runValidators: true,
      });
      res.send("User Updated successfully!!!");
    } catch (err) {
      res.status(404).send(err.message);
    }
  } else {
    res.status(400).send("User not found!!!");
  }
});

//patch - user api with email id
app.patch("/userbyemail", async (req, res) => {
  const userEmailId = req.body.emailId;
  const data = req.body;
  if (userEmailId) {
    try {
      const user = await User.find({ emailId: userEmailId });
      if (user.length > 0) {
        const id = user[0]._id;
        console.log("id--->", id);

        const updateduser = await User.findByIdAndUpdate(id, data, {
          new: false,
        });
        console.log(updateduser);
        res.send("User Updated successfully!!!");
      } else {
        res.status(400).send("User not found!!!");
      }
    } catch (err) {
      res.status(404).send("Something went wrong!!!");
    }
  } else {
    res.status(400).send("User not found!!!");
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

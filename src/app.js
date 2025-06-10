const express = require("express");
const connectDB = require("./config/database")

const app = express();


app.use("/user",(req,res)=>{
    console.log("from / route");
    res.send("Hello ");
});



connectDB()
  .then(() => {
    console.log("DB Connected Successfully....");
    app.listen(7777,()=>{
    console.log("Server is running successfully on port 7777");
});
  })
  .catch((err) => {
    console.log("DB connection Failed!!!");
  });



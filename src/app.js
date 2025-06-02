const express = require("express");

const app = express();


app.use("/test",(req,res)=>{
    res.send("From test route");
});
app.use("/local", (req,res)=>{
    res.send("Local hai bhai!!!")
});
app.use("/",(req,res)=>{
    res.send("Welome to dahboarad");
});

app.listen(3000,()=>{
    console.log("Server is running successfully on port 3000");
});
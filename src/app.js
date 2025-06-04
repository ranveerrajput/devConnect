const express = require("express");

const app = express();



app.get("/user", (req,res)=>{
    res.send({name: "Ranveer",surname : "Rajput"});
});


app.post("/user", (req,res)=>{
    res.send({name: "Ranveer",surname : "Rajput"});
});

app.delete("/user", (req,res)=>{
    res.send("User deleted successfully");
})

app.get("/test",(req,res)=>{
    res.send("From test route");
});
app.post("/local", (req,res)=>{
    res.send("Local hai bhai!!!")
});
app.get("/",(req,res)=>{
    res.send("Welome to dahboarad");
});

app.listen(3000,()=>{
    console.log("Server is running successfully on port 3000");
});
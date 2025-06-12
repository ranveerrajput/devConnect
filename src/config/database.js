//mongodb+srv://ranveerrajput351:ranveerrajput351@namastedev.amk7wum.mongodb.net/
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ranveer:ranveerrajput351@namastedev.amk7wum.mongodb.net/devCircle"
  );
};


module.exports = connectDB;


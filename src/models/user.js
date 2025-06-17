const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value)
      {
        if(!validator.isStrongPassword(value))
        {
            throw new Error("Please enter a strong password");
        }
      }
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is wrong!!!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517432_640.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Please enter a valid URL");
        }
      },
    },
    about: {
      type: String,
      default: "This is an default about of the user!!!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Пожалуйста, укажите название"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Пожалуйста, укажите email"],
      trim: true,
      validate: [validator.isEmail, "Пожалуйста, укажите действительный email"],
    },
    date: {
      type: Date,
    },
    gender: {
      type: String,
    },
    type: {
      type: String,
    },
    weight: {
      type: Number,
    },
    experience: {
      type: String,
    },
    medicine: {
      type: String,
    },
    complication: {
      type: String,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },

    password: {
      type: String,
      required: [true, "Пожалуйста, укажите пароль"],
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);

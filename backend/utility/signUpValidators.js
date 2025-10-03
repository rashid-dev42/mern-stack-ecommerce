const mongoose = require("mongoose");
const User = require("../models/userModel");

const validateName = (name, value) => {
  let nameError = "";

  if (!name) {
    nameError = `${value} name is required.`;
  } else if (!/^[a-zA-Z\s-]+$/.test(name)) {
    nameError = "Name can contain only letters, spaces and hyphens.";
  } else if (name.length < 2 || name.length > 50) {
    nameError = "Name can contain minimum 2 and maximum 50 characters";
  }

  return nameError;
};

const validateEmail = async (email) => {
  let emailError = "";

  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URI);
    const user = await User.findOne({ email });

    if (!email) {
      emailError = "Email is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      emailError = "Email is invalid.";
    } else if (user) {
      emailError = "User already exists.";
    }
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
    return emailError;
  }
};

const validatePassword = (password) => {
  let passwordError = "";

  if (!password) {
    passwordError = "Password is required.";
  } else if (!/[a-z]/.test(password)) {
    passwordError = "Password must contain at least 1 lowercase letter.";
  } else if (!/[A-Z]/.test(password)) {
    passwordError = "Password must contain at least 1 uppercase letter.";
  } else if (!/[0-9]/.test(password)) {
    passwordError = "Password must contain at least 1 number."
  } else if (!/[~!@#$%^&*()-=_+[\]{};':",.\/<>?|]/.test(password)) {
    passwordError = "Password must contain at least 1 special character.";
  } else if (password.length < 6) {
    passwordError = "Password must be at least 6 characters long.";
  }

  return passwordError;
};

const validateConfirmPassword = (password, confirmPassword) => {
  let confirmPasswordError = "";

  if (password !== confirmPassword) {
    confirmPasswordError = "Passwords do not match.";
  }

  return confirmPasswordError;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword
};
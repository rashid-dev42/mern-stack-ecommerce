const mongoose = require("mongoose");
const User = require("../models/userModel");
const {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} = require("../utility/signUpValidators");
const { hashPassword } = require("../utility/private");

const signUp = async (req, res, next) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    const errorResult = {};
    let errorStatus = null;

    // validate first name
    errorResult.firstNameError = validateName(firstName, "First");
    if (errorResult.firstNameError) {
      errorStatus = 400;
    } else {
      firstName = firstName.trim();
    }

    // validate last name
    errorResult.lastNameError = validateName(lastName, "Last");
    if (errorResult.lastNameError) {
      errorStatus = 400;
    } else {
      lastName = lastName.trim();
    }

    // validate email
    errorResult.emailError = await validateEmail(email);
    if (errorResult.emailError) {
      errorStatus = 400;
    } else {
      email = email.trim();
    }

    // validate password
    errorResult.passwordError = validatePassword(password);
    if (errorResult.passwordError) {
      errorStatus = 400;
    }

    // validate confirm password
    errorResult.confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    if (errorResult.confirmPasswordError) {
      errorStatus = 400;
    }

    await mongoose.connect(process.env.MONGODB_ATLAS_URI);
    
    if (!errorStatus) {
      const passwordData = hashPassword(password);
      const newUser = new User({ imgPath: "", firstName, lastName, email, password: passwordData });
      await newUser.save();
      res.status(201).send("Sign Up Successful");
    } else {
      res.status(errorStatus).send(errorResult);
    }
  } catch(error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
};

const getUsers = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const role = req.query.role;
    const filter = {};
    if (role) {
      filter.role = role;
    }
    await mongoose.connect(process.env.MONGODB_ATLAS_URI);
    const users = await User.find(filter, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const countUsers = await User.find(filter).countDocuments();
    res.status(200).send({
      users,
      pages: Math.ceil(countUsers / limit)
    });
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = { signUp, getUsers };
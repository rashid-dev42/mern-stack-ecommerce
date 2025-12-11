const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} = require("../utility/signUpValidators");
const { hashPassword, verifyPassword } = require("../utility/private");

const signUp = async (req, res, next) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    const errorResult = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: ""
    };
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
    
    if (!errorStatus) {
      const passwordData = hashPassword(password);
      const newUser = new User({ imgPath: "", firstName, lastName, email, password: passwordData });
      await newUser.save();
      res.status(201).send({ success: true, message: "Sign Up Successful" });
    } else {
      res.status(errorStatus).send({ success: false, errorResult });
    }
  } catch(error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let passwordVerification = false;

    const userInfo = await User.findOne({ email: email }) || "";
    if (userInfo !== "") {
      passwordVerification = verifyPassword(password, userInfo.password);
    }
    
    if (passwordVerification) {
      const authToken = jwt.sign({
        data: userInfo._id
      }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
      res.status(200).send({
        success: true,
        message: "Sign In Successful",
        signInData: {
          authToken,
          id: userInfo._id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          role: userInfo.role
        }
      });
    } else {
      res.status(401).send({ success: false, message: "Incorrect email or password" });
    }
  } catch (error) {
    next(error);
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

    const users = await User.find(filter, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const countUsers = await User.find(filter).countDocuments();
    res.status(200).send({
      users,
      pages: Math.ceil(countUsers / limit)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, getUsers };
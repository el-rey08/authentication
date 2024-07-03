require("dotenv").config();
// import user model
const userModel = require("../model/userModel");
const { validateSignUp, validateSignIn } = require("../middleware/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create user
const registerUser = async (req, res) => {
  try {
    // extract the error object from the validator
    const { error } = validateSignUp(req.body);
    if (error) {
      console.log(error);
      res.status(400).json({
        message: error.details[0].message,
      });
    } else {
      const { fullname, email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          message: `User with email: ${email} already exist`,
        });
      } else {
        // perform an encryption using salt
        const saltedPassword = await bcrypt.genSalt(10);

        // perform an encryption of the salted password
        const hashedPassword = await bcrypt.hash(password, saltedPassword);

        // create object of the body
        const data = {
          fullname,
          email,
          password: hashedPassword,
        };

        const user = await userModel.create(data);
        res.status(201).json({
          message: "successful",
          data: user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// create user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validateSignIn(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
    } else {
      // check for existing email
      const checkEmail = await userModel.findOne({ email });
      if (!checkEmail) {
        res.status(404).json({
          message: "User not registered.",
        });
      } else {
        // compare password
        const checkPassword = await bcrypt.compare(
          password,
          checkEmail.password
        );
        if (!checkPassword) {
          res.status(400).json({
            message: "Wrong password",
          });
        } else {
          const token = await jwt.sign(
            {
              fullname: checkEmail.fullname,
              email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "logged successfully",
            token,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// create user
const logoutUser = async (req,res) => {
  try {
    
  } catch (error) {
    res.status(500).json({
        message:error.meassage
    })
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};

// import hapi/joi
const hapiJoi = require("@hapi/joi");

// validate signUp/registration
const validateSignUp = (data) => {
  const signUp = hapiJoi.object({
    fullname: hapiJoi.string().max(50).required(),
    email: hapiJoi.string().email().required(),
    password: hapiJoi.string().required(),
  });

  // validate the signUp variable
  return signUp.validate(data);
};
module.exports.validateSignUp = validateSignUp;

// validate signUp/registration
const validateSignIn = (data) => {
  const signIn = hapiJoi.object({
    email: hapiJoi.string().email().required(),
    password: hapiJoi.string().required(),
  });

  // validate the signUp variable
  return signIn.validate(data);
};

module.exports.validateSignIn = validateSignIn;

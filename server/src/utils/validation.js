const CustomError = require("./customError");

const validateSignUp = ({ userName, fullName, email, password }) => {
  if (!userName || !fullName || !email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  //userName validation
  const usernameRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{6,}$/;
  if (!usernameRegex.test(userName)) {
    throw new CustomError(
      "Username must be at least 6 characters long, contain at least one capital letter, one special character (!@#$%^&*()), and one number.",
      400
    );
  }

  //Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new CustomError("Invalid email format", 400);
  }

  // password number validation
  if (password.length < 6) {
    throw new CustomError("Password must be at least 6 characters long", 400);
  }
};

module.exports = { validateSignUp };

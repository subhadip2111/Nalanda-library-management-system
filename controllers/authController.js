const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const { emailRegex, passwordLengthRegex } = require("../utils/regex"); // Import regex patterns

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password length
  if (!passwordLengthRegex.test(password)) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    // Check if user already exists with the provided email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // By default, regular users registering themselves will have 'member' role

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    if (role && !["ADMIN", "MEMBER"].includes(role)) {
      return res
        .status(400)
        .json({
          error: 'Invalid role. Only "ADMIN" or "MEMBER" roles are accepted.',
        });
    }
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role,
    });

    // Respond with user details and token
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ error: error.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Validate email presence
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Validate password presence
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and compare passwords
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password);
   
      if (passwordsMatch) {
        // Passwords match, generate JWT token and send response
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        // Passwords do not match
        return res.status(401).json({ error: "Invalid email or password" });
      }
    }
  } catch (error) {
    console.log(error);
    // Error while finding user or comparing passwords
    res.status(400).json({ error: error.message });
  }
};

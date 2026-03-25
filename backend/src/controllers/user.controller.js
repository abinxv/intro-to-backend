import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists already
    const existing = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // checking if the user alr exists
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // if user doesnt exist
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare passwords
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "User login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    // if we cant find user
    if (!user)
      return res.status(404).json({
        message: "user not found",
      });

    res.status(200).json({
      message: "logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export { registerUser, loginUser, logoutUser };

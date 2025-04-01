import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//  exporting these to authorization .js

//  SIGN UP
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body; // what we input the data is in req.body

  try {
    if (!fullname || !password || !email) {
      return res.status(400).json({ message: " All fields Are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email }); // Check if user exists
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });

    //  generate () jwt tokens here : created from utils generate token () for authorization
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user Data " });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({ message: "Internal Server Issue " });
  }
};

//  Login :

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    //  Comparing The Password with the user password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Login failed: Incorrect password for", email);
      return res.status(400).json({ message: "Invalid Credentials " });
    }
    //  Token
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login", error.message);
    res.status(500).json({ message: " Internal Server Issue " });
  }
};

//  Logout :
export const logout = (req, res) => {
  try {
    //  Deleting the cookies
    res.cookie("jwt", "", { maxAge: 0 }); //  maxAge: 0, which tells the browser to immediately delete the cookie
    res.status(200).json({ message: "Logged Out Sucessfully " });
  } catch (error) {
    console.log("Error in Loggout Out controller", error.message);
    res.status(500).json({ message: "Internal server Issue " });
  }
};

//  Update Profile Photo : Using Cloudinary

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; // when we input
    const userId = req.user._id; // post user id

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      // You can add options here, such as image transformations or folder specification
    });

    // Update the user's profile with the Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ message: "Internal server issue" });
  }
};

//Profile Page :Check user Authorization

export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAUth controller ", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

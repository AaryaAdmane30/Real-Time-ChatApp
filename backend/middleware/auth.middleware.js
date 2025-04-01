import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== "production") {
      console.log(" Incoming request to protected route");
      console.log("Cookies received:", req.cookies);
    }

    // Get token from cookies or Authorization header
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("No token found");
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (process.env.NODE_ENV !== "production")
        console.log("Decoded token:", decoded);

      // Fetch user from DB
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        console.log("User not found in database");
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Token expired");
        return res
          .status(401)
          .json({
            success: false,
            message: "Token expired. Please log in again.",
          });
      }
      console.log("Invalid token");
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//http://localhost:5000/api/auth/signup
router.post("/signup", signup);

//http://localhost:5000/api/auth/login
router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
//  protectRoute will come in middleware between the client and server for the authetification and request validation

//Profile Page :Check user Authorization
router.get("/check", protectRoute, checkAuth);
export default router;

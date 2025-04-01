import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import dotenv from "dotenv"; // for the Env fi;en
dotenv.config();

// const app = express(); // already declared in socket.js

const PORT = process.env.PORT || 5001; // reading the env file
const __dirname = path.resolve(); // for deployment

// Middleware (CORS is at the top)
app.use(express.json({ limit: "50mb" })); // Increase payload size so that we can upload our profile photo largery
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both frontend ports
    credentials: true, // Allow cookies
  })
);

//  Routes :
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//  Build in middlware for deployemnt to run on port localhost//5000:
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// app.listen(PORT, () => { // we will be usig socket server for real time communication between client and server
server.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT} successfully`);
  connectDB(); // from db.js to connect to mongo atlas
});

//  To our msg:

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.modal.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch users except the logged-in user and exclude their passwords
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }, // ne is not equal
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  get messages  in Chats:

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    console.log("Fetching messages between:", myId, "and", userToChatId);
    const message = await Message.find({
      //  Mongo operator - $ or- logical operator that takes an array of conditions
      // and returns documents that match at least one of the conditions.
      //  This finds messages sent by senderId and received by userToChatId.
      // { senderId: userToChatId, receiverId: senderId }
      // This finds messages sent by userToChatId and received by senderId
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controlleer", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  Send the message in Chats

export const sendMessage = async (req, res) => {
  try {
    //  the text we send can ne Text or image also
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //  For Priv Chat -  realTime functionallity goes here => socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    // Check if the receiver is online:
    if (receiverSocketId) {
      // The recipient's client-side Socket.IO listener will receive this "newMessage in real time "

      io.to(receiverSocketId).emit("newMessage", newMessage); // // newMessage contains the actual message data (e.g., text, sender info, timestamp).
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controlleer", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
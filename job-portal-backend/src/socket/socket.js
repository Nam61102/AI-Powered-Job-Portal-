const { Server } = require("socket.io");
const chatService = require("../services/chat.service");

let io;

// Map to store connected users: userId -> socket.id
const userSocketMap = new Map();

/**
 * Initializes the Socket.IO server and sets up connection handlers
 * @param {object} server - The HTTP server instance
 */
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust this in production to specific domains
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  console.log("Socket.IO initialized successfully");

  io.on("connection", (socket) => {
    console.log("Socket Connected");
    console.log("Socket ID:", socket.id);

    // When frontend emits register event to link userId with socket
    socket.on("register", (payload) => {
      if (payload && payload.userId) {
        const userId = payload.userId;
        userSocketMap.set(userId, socket.id);
        console.log("User Registered:", userId, "->", socket.id);
      }
    });

    // Handle socket disconnect
    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
      console.log("Socket ID:", socket.id);

      // Find and remove the user from the map to prevent stale connections
      for (const [userId, storedSocketId] of userSocketMap.entries()) {
        if (storedSocketId === socket.id) {
          userSocketMap.delete(userId);
          console.log("User Removed:", userId);
          break; // Since one socket ID only maps to one user in this instance
        }
      }
    });

    // Handle incoming messages
    socket.on("send-message", async (payload) => {
      try {
        // We need to know who the sender is. 
        // We can find their userId from the userSocketMap by their socket.id
        let senderId = null;
        for (const [userId, storedSocketId] of userSocketMap.entries()) {
          if (storedSocketId === socket.id) {
            senderId = userId;
            break;
          }
        }

        if (!senderId) {
          return socket.emit("chat-error", { message: "Unauthorized. Please register your socket." });
        }

        const { receiverId, message } = payload;

        // The service layer handles validation for empty message, same users, and missing receiver
        const savedMessage = await chatService.sendMessage(senderId, receiverId, message);

        // 1. Emit confirmation back to sender
        socket.emit("message-sent", savedMessage);

        // 2. Emit to receiver if online
        const receiverSocketId = getUserSocket(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-message", savedMessage);
        }

      } catch (error) {
        socket.emit("chat-error", { message: error.message || "Failed to send message" });
      }
    });
  });
};

/**
 * Retrieves the socket ID of a specific user
 * @param {string|number} userId - The ID of the user
 * @returns {string|undefined} The socket ID if found
 */
const getUserSocket = (userId) => {
  return userSocketMap.get(String(userId)) || userSocketMap.get(Number(userId));
};

/**
 * Removes a user from the socket map manually
 * @param {string|number} userId - The ID of the user to remove
 */
const removeUser = (userId) => {
  userSocketMap.delete(String(userId));
  userSocketMap.delete(Number(userId));
};

/**
 * Retrieves a list of all currently online users
 * @returns {Array} Array of user IDs
 */
const getOnlineUsers = () => {
  return Array.from(userSocketMap.keys());
};

module.exports = {
  initSocket,
  getUserSocket,
  removeUser,
  getOnlineUsers,
};

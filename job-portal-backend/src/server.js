require("dotenv").config();
console.log(process.env.GEMINI_API_KEY);
const express = require("express");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./socket/socket");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// IMPORT ROUTES
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const activityRoutes = require("./routes/activityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chat.routes");

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/recruiter", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Job Portal Backend Running");
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
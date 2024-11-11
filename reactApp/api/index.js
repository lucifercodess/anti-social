import express from "express";
import { configDotenv } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import redis from "redis";
import { createClient } from "redis";

// app imports locally
import { connectDB } from "./utils/database.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import commentRoute from "./routes/comment.route.js";

const app = express();
configDotenv();

// middlewares
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(
  cookieParser({
    credentials: true,
  })
);
// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const client = createClient({
  password: "HYqL2PkMROutpGpeqi2rUur8mvpW6e2v",
  socket: {
    host: "redis-13158.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 13158,
  },
});

client.connect();
client.on("connect", function () {
  console.log("Connected to Redis");
});

client.on("error", function (err) {
  console.log("Error connecting to Redis:", err);
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoute);
app.use("/api/comments", commentRoute);

const port = process.env.PORT;

app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});

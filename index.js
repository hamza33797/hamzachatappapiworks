const express=require('express');

const app=express();
const bodyParser=require('body-parser');
const authRoutes = require("./Api/routers/auth");
const messageRoutes = require("./Api/routers/messages");
const mongoose = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();
const cors=require('cors')
const user_verification=require('./Api/routers/user_verification');
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb+srv://hamzajilani45:aUNwwxw5LLuVgsoA@cluster0.ruptfiw.mongodb.net/?retryWrites=true&w=majority'
)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use('/userverification',user_verification);
const port= process.env.port||4330;
const server =require('./server');
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
  


module.exports=app;


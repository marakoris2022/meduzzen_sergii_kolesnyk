import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const getRandomMessage = () => {
  const messages = [
    "Hello, user!",
    "Random fact: Cats have five toes on their front paws.",
    "Did you know? The Eiffel Tower can be 15 cm taller in summer.",
    "Keep going, you're doing great!",
    "Here's a random number: " + Math.floor(Math.random() * 100),
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

io.on("connection", (socket) => {
  socket.on("customMessage", (msg) => {
    io.emit("customMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const sendRandomMessageToAll = () => {
  const message = getRandomMessage();
  io.emit("randomMessage", message);

  const nextInterval = Math.random() * (60000 - 15000) + 15000;
  setTimeout(sendRandomMessageToAll, nextInterval);
};

sendRandomMessageToAll();

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});

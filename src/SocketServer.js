export default function (socket) {
  // user joind or open the application
  socket.on("join", (user) => {
    socket.join(user);
  });
  // join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
    console.log("user joined conversation", conversation);
  });
}

function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle task assignment event
    socket.on("taskAssigned", (taskId) => {
      io.emit("taskAssigned", { taskId });
    });
    // Handle task update event
    socket.on("taskUpdated", (taskId) => {
      io.emit("taskUpdated", { taskId });
    });
  });
}

module.exports = { initializeSocket };

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

const io = new Server({
  cors: {
    origin: [
      "https://localhost:5173",
      "https://socket-sveltekit.deno.dev/"
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
  socket.on("chatMsg", (data) => {
    console.log(`Recieved data : ${data}`);

    socket.broadcast.emit("chatMsg", `${data} [${socket.id}]`);
  });
});
console.log("Server listening on port 3000!");

await serve(io.handler(), {
  port: 3000,
});

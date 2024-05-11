import { Server } from "socket.io";
import http from 'http'

const httpServer = http.createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Replace with your frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // socket.on("join_room", (roomId) => {
    //     socket.join(roomId);
    //     console.log(`user with id-${socket.id} joined room - ${roomId}`);
    // });

    socket.on("send_msg", (data) => {
        io.emit(`receive_msg:${data.result.chat_id}`, data);

    });

    socket.on("add_friend", (data) => {
        io.emit(`receive_req:${data.receiver_id}`, data)
    })

    socket.on("update_friend_riquest_number", (data) => {
        io.emit(`receive_update_friend_riquest_number:${data.receiver_id}`, data)
    })

    socket.on("update_friend_list", (data) => {
        io.emit(`receive_updated_friend_list:${data.id}`, data)
    })

    // socket.on("disconnect", () => {
    //     console.log("A user disconnected:", socket.id);
    // });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`);
});
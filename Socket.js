let io;

module.exports = {
    init: (host) => {
        io = require("socket.io")(host, {
            cors: {
                origin: "https://ichattt.herokuapp.com",
                methods: ["GET", "POST"],
            },
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket not initialized");
        }
        return io;
    },
};

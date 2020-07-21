const express = require("express");
const app = express();
const path = require("path");
const process = require("process");
const http = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
const frontRoute = require("./routes/frontRoutes.js");
const apiRoute = require("./routes/apiRoutes.js");
const io = require("socket.io")(http);

http.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));

app.use(express.static('public'));
app.use(frontRoute);
app.use("/api", apiRoute);

io.on("connection", (socket)=> {
    socket.on("newMessage", (data)=> {
        console.log(data);
        socket.broadcast.emit("updateFeed", (data));
    })
})

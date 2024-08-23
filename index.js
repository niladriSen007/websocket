import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"
import { join } from "node:path"
import path from "path"

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(join(path.resolve(), "index.html"))
})

app.use("/", (req, res) => {
  res.send("Hello World")
})

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("chat message", (msg) => {
    console.log("message: " + msg)
    io.emit("chat message", msg)
  })

 /*  socket.on("disconnect", () => {
    console.log("user disconnected")
  }) */
})

server.listen(3000, () => {
  console.log("Server is running on port 3000")
})

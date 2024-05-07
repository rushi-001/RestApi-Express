const express = require("express");
const app = express();
const port = 8000;
const userRoutes = require("./routes/user_routes.js");
const { connectTestDatabase } = require("./connection.js")

// Connect mongoDB TestDatabase
connectTestDatabase("mongodb://127.0.0.1:27017/TestDatabase").then(() => console.log("mongoDB connected!"));

// Routes
app.use("/users", userRoutes)

// Listening server
app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});
const express = require("express");
const port = 8000;
const app = express();
const fs = require("fs");
const { default: mongoose } = require("mongoose");

// Connect mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/TestDatabase")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log("Error: ", err));

app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("hello from middleware 1");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("hello from middleware 2");
//   next();
// });

// mongoDB Schema Structure
const usersSchemaStructure = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// mongoDB Schema Model
const usersInfoModel = mongoose.model("users", usersSchemaStructure);

app.get("/users",async (req, res) => {
  // res.setHeader("X-`myName", "Rushi Panchal"); // Custom header
  const allDBusers = await usersInfoModel.find({});
  const html = `
    <ul>
      ${allDBusers.map((user) => `<li>${user.firstName} - email: ${user.email}</li>`).join("")}
    </ul>
  `
  return res.send(html);
});

app
  .route("/users/:id")
  .get(async (req, res) => {
    const user = await usersInfoModel.findById(req.params.id);
    return res.json(user);
  })
  .patch((req, res) => {
    // todo: edit user with id
    return res.json({ status: "Panding" });
  })
  .delete((req, res) => {
    // todo: delete user with id
    return res.json({ status: "Panding" });
  });

app.post("/users/", async (req, res) => {
  const usersData = await usersInfoModel.create({
    firstName: req.body.first_Name,
    lastName: req.body.last_Name,
    email: req.body.email,
  });
  return res.status(201).json({ msg: "User Added Successfully" });
});

app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});

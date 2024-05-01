const express = require("express");
const port = 8000;
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("hello from middleware 2");
  next();
});

app.get("/users", (req, res) => {
  res.setHeader("X-myName", "Rushi Panchal"); // Custom header
  return res.json(users);
});

app
  .route("/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
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

app.post("/users/", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (req, data) => {
    return res.json({ status: "sucssess", id: users.length });
  });
});

app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});

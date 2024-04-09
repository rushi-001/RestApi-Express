const express = require("express")
const port = 8000;
const users = require("./MOCK_DATA.json")
const app = express();

app.get("/users", (req, res) => {
    return res.json(users);
})

app.route("/users/:id").get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    return res.json(user);
}).patch((req, res) => {
    // todo: edit user with id
    return res.json({ status: "Panding" })
}).delete((req, res) => {
    // todo: delete user with id
    return res.json({ status: "Panding" })
})

app.listen(port, () => {
    console.log(`server started at port: ${port}`);
})
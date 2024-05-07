const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, updateUserInfoById, deleteUserById, createNewUser } = require("../controllers/user_controllers.js")

// //* Get all users
// router.get("/", getAllUsers);
// //* Creates new users
// router.post("/", createNewUser);
router.route("/").get(getAllUsers).post(createNewUser)

// CRUD on user id routes
router
    .route("/:id")
    .get(getUserById)
    .patch(updateUserInfoById)
    .delete(deleteUserById);

module.exports = router;
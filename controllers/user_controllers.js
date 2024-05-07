const usersInfoModel = require("../models/users_info_model.js")
const express = require("express");

const getAllUsers = async (req, res) => {
    // res.setHeader("X-`myName", "Rushi Panchal"); // Custom header
    const allDBusers = await usersInfoModel.find({});
    const html = `
    <ul>
        ${allDBusers
            .map((user) => `<li>${user.firstName} - id: ${user._id} - email: ${user.email}</li>`)
            .join("")
        }
    </ul>
    `;

    return res.send(html);
};

const getUserById = async (req, res) => {
    const user = await usersInfoModel.findById(req.params.id);
    return res.json(user);
}

const updateUserInfoById = async (req, res) => {
    await usersInfoModel.findByIdAndUpdate(req.params.id, { lastName: "change" }) // hardcoded...
    return res.json({ status: "Change is Success" });
}

const deleteUserById = async (req, res) => {
    await usersInfoModel.findByIdAndDelete(req.params.id)
    return res.json({ status: "Deletion in Success" });
}

const createNewUser = async (req, res) => {
    const usersData = await usersInfoModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });
    return res.status(201).json({ msg: "User Added Successfully", id: `${usersData._id}` });
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserInfoById,
    deleteUserById,
    createNewUser,
}
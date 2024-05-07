const { default: mongoose } = require("mongoose");

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

module.exports = usersInfoModel;
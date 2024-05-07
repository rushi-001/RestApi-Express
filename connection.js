const { default: mongoose } = require("mongoose");

const connectTestDatabase = async (url) => {
    return mongoose.connect(url)
}

module.exports = {
    connectTestDatabase
}
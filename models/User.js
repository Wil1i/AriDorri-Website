const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const User = db.define("users", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },

    username : {
        type : DataTypes.TEXT
    },

    discordUsername : {
        type : DataTypes.TEXT
    },

    userRank : {
        type : DataTypes.TEXT
    },

    warn : {
        type : DataTypes.TEXT
    }
}, {
    timestamps : false
})

module.exports = {
    User
}
const {DataTypes} = require("sequelize")
const db = require("../configs/db")

const Suggest = db.define("suggestions", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        aautoIncrement : true
    },

    text : {
        type : DataTypes.TEXT
    },

    name : {
        type : DataTypes.TEXT
    },

    disId : {
        type : DataTypes.TEXT
    },

    isAccepted:{
        type : DataTypes.TEXT
    }
}, {
    timestamps : false
})

module.exports = Suggest
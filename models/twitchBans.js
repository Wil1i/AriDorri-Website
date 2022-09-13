const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const twitchBan = db.define(
  "twitchBans",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      aautoIncrement: true,
    },

    username: {
      type: DataTypes.TEXT,
    },

    reason: {
      type: DataTypes.TEXT,
    },

    executor: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = twitchBan;
